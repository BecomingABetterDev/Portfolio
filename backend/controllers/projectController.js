const Project = require("../models/Project");

const getAllProjects = async(req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch projects." });
    }
};

const getProjectById = async(req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch project." });
    }
};

const createProject = async(req, res) => {
    try {
        const {
            name,
            systemTag,
            status,
            shortDescription,
            fullDescription,
            techStackTags,
            architectureHighlights,
            isFeatured,
            order,
            imageUrl,
            githubLink,
        } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Project name is required." });
        }

        const project = await Project.create({
            name,
            systemTag,
            status,
            shortDescription,
            fullDescription,
            techStackTags: Array.isArray(techStackTags) ? techStackTags : [],
            architectureHighlights: Array.isArray(architectureHighlights) ?
                architectureHighlights :
                [],
            isFeatured: isFeatured || false,
            order: order || 0,
            imageUrl: imageUrl || "", // ── DEPLOYMENT TO DATABASE INSTANCE ──
            githubLink: githubLink || "",
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: "Failed to create project." });
    }
};

const updateProject = async(req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: "Failed to update project." });
    }
};

const deleteProject = async(req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        await project.remove();
        res.status(200).json({ message: "Project deleted." });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete project." });
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
};
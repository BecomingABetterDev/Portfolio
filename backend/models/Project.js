const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    systemTag: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ["Active", "Completed", "In Progress"],
        default: "In Progress",
    },
    shortDescription: {
        type: String,
    },
    fullDescription: {
        type: String,
    },
    techStackTags: {
        type: [String],
        default: [],
    },
    architectureHighlights: {
        type: [String],
        default: [],
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    order: {
        type: Number,
        default: 0,
    },
    imageUrl: {
        type: String,
        trim: true,
        default: "",
    },
    githubLink: {
        type: String,
        trim: true,
        default: "",
    },
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
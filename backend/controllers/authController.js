const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const loginAdmin = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required." });
        }

        const admin = await Admin.findOne({ email: email.toLowerCase() });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        const token = jwt.sign({ id: admin._id, email: admin.email },
            process.env.JWT_SECRET, { expiresIn: "7d" }
        );

        res.status(200).json({
            token,
            admin: { email: admin.email },
        });
    } catch (error) {
        console.error("🔥 CRITICAL LOGIN ERROR:", error);
        res.status(500).json({ message: "Server error during login." });
    }
};

module.exports = { loginAdmin };
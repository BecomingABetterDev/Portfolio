require("dotenv").config(); // Essential: reads the same MONGO_URI your server uses
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin"); // Adjust path if your models folder moved

const TARGET_EMAIL = process.env.TARGET_EMAIL;
const TARGET_PASSWORD = process.env.TARGET_PASSWORD;

async function seedAdmin() {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            console.error("❌ Error: MONGO_URI is missing from your .env file.");
            process.exit(1);
        }

        // Connect using your database's specific configuration options
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("📦 Connected to MongoDB successfully...");

        // Clean up any admin
        await Admin.deleteMany({});

        // Hash the password cleanly using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(TARGET_PASSWORD, salt);

        // Prepare the new document
        const adminUser = new Admin({
            email: TARGET_EMAIL.toLowerCase(),
            password: hashedPassword,
        });

        // Save to the database
        await adminUser.save();
        console.log("\n🚀 Success! Admin account provisioned.");
        console.log(`Email:    ${TARGET_EMAIL}`);
        console.log(`Password: ${TARGET_PASSWORD}\n`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed with error:", error.message);
        process.exit(1);
    }
}

seedAdmin();
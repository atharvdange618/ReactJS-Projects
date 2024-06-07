// db.js
const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/smart_hierarchy');
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
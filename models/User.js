const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true], 
        trim: true
    },
    email: {
        type: String,
        required: [true], 
        unique: true, 
        lowercase: true
    },
    age: {
        type: Number,
        required: true,
        min: [18], 
        max: 120
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('User', userSchema);
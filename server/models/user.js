const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    logs: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Log'}
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;

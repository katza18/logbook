const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
    number: String,
    name: String,
    weight: String,
    sets: String,
    reps: String,
    intensity: String,
    muscle: String,
    notes: String,
    workout: {
        type:mongoose.Schema.Types.ObjectId, ref: "Workout"
    },
    log: {
        type: mongoose.Schema.Types.ObjectId, ref: "Log"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;

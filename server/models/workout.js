const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: Date,
    log: {
        type:mongoose.Schema.Types.ObjectId, ref: "Log"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;

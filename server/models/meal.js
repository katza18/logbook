const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: Date,
    calories: String,
    protein: String,
    carbs: String,
    fat: String,
    log: {
        type:mongoose.Schema.Types.ObjectId, ref: "Log"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;

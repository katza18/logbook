const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    serving: String,
    name: String,
    protein: String,
    carbs: String,
    fat: String,
    calories: String,
    notes: String,
    meal: {
        type:mongoose.Schema.Types.ObjectId, ref: "Meal"
    },
    log: {
        type: mongoose.Schema.Types.ObjectId, ref: "Log"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;

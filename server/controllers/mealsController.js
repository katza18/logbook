const Meal = require('../models/meal.js');
const Food = require('../models/food');

const fetchMeals = async (req, res) => {
    try {
        //Find all meals for this user & logbook, since logbooks are unique to a user, just the logbook_id should be fine
        const meals = await Meal.find({ user: req.user._id});
        res.json({meals});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const fetchMeal = async (req, res) => {
    try {
        //find the meal with the user and meal id of the req
        const mealId = req.params.id;
        const meal = await Meal.findOne({ _id: mealId, user: req.user._id });
        res.json(meal);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const createMeal = async (req, res) => {
    try {
        //gather meal title/body from req and create
        const {title, body, date, log} = req.body;
        const meal = await Meal.create({
            title: title,
            body: body,
            date: date,
            calories: "",
            protein: "",
            carbs: "",
            fat: "",
            user: req.user._id,
            log: log
        });

        res.json({meal});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const updateMeal = async (req, res) => {
    try {
        const mealId = req.params.id;
        const {title, body, date, protein, carbs, fat, calories} = req.body;

        await Meal.findOneAndUpdate({ _id: mealId, user: req.user._id } , {
            title: title,
            body: body,
            date: date,
            protein,
            carbs,
            fat,
            calories
        });

        const meal = await Meal.findById(mealId);

        res.json({meal});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const deleteMeal = async (req, res) => {
    try {
        const mealId = req.params.id;

        //delete the meal and all of its exercises
        await Meal.deleteOne({ _id: mealId, user: req.user._id });
        await Food.deleteMany({ meal: mealId });

        res.json({ success: "Meal deleted" });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

module.exports = {
    fetchMeals,
    fetchMeal,
    createMeal,
    updateMeal,
    deleteMeal
}

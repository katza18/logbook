const Food = require('../models/food.js');
const Meal = require('../models/meal');

const fetchFoods = async (req, res) => {
    try {
        const foods = await Food.find({ user: req.user._id });
        res.json({foods});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const createFood = async (req, res) => {
    try {
        const {
            serving,
            name,
            protein,
            carbs,
            fat,
            calories,
            notes,
            meal,
            log } = req.body;
        const myFood = await Food.create({
            serving,
            name,
            protein,
            carbs,
            fat,
            calories,
            notes,
            user: req.user._id,
            meal,
            log
        });

        res.json({myFood});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const updateFood = async (req, res) => {
    try {
        const foodId = req.params.id;
        const {
            serving,
            name,
            protein,
            carbs,
            fat,
            calories,
            notes,
            meal,
            log
        } = req.body;

        await Food.findOneAndUpdate({ _id: foodId, user: req.user._id } , {
            serving,
            name,
            protein,
            carbs,
            fat,
            calories,
            notes,
            meal,
            log
        });

        const thisMeal = await Meal.findOne({ _id: meal, user: req.user._id});

        await Meal.findOneAndUpdate({ _id: meal, user: req.user._id}, {
            protein: parseInt(thisMeal.protein) + parseInt(protein),
            carbs: parseInt(thisMeal.carbs) + parseInt(carbs),
            fat: parseInt(thisMeal.fat) + parseInt(fat),
            calories: parseInt(thisMeal.calories) + parseInt(calories)
        });

        const myFood = await Food.findById(foodId);

        res.json({myFood});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const deleteFood = async (req, res) => {
    try {
        const foodId = req.params.id;

        const food = await Food.findOne({ _id: foodId, user: req.user._id });

        const protein = food.protein, carbs = food.carbs, fat = food.fat, calories = food.calories;

        const thisMeal = await Meal.findOne({ _id: food.meal, user: req.user._id});

        await Meal.findOneAndUpdate({ _id: food.meal, user: req.user._id}, {
            protein: parseInt(thisMeal.protein) - parseInt(protein),
            carbs: parseInt(thisMeal.carbs) - parseInt(carbs),
            fat: parseInt(thisMeal.fat) - parseInt(fat),
            calories: parseInt(thisMeal.calories) - parseInt(calories)
        });

        await Food.deleteOne({ _id: foodId, user: req.user._id });

        res.json({ success: "Food deleted" });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

module.exports = {
    fetchFoods,
    createFood,
    updateFood,
    deleteFood
}

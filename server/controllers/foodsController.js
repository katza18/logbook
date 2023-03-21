const Food = require('../models/food.js');

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

        console.log(myFood);
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

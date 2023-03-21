const Exercise = require('../models/exercise.js');

const fetchExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find({ user: req.user._id });
        res.json({exercises});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const createExercise = async (req, res) => {
    try {
        const {number,
            name,
            weight,
            sets,
            reps,
            intensity,
            muscle,
            notes,
            workout,
            log } = req.body;
        const myExercise = await Exercise.create({
            number,
            name,
            weight,
            sets,
            reps,
            intensity,
            muscle,
            notes,
            user: req.user._id,
            workout,
            log
        });
        res.json({myExercise});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const updateExercise = async (req, res) => {
    try {
        const exerciseId = req.params.id;
        const {
            number,
            name,
            weight,
            sets,
            reps,
            intensity,
            muscle,
            notes,
            workout,
            log
        } = req.body;

        await Exercise.findOneAndUpdate({ _id: exerciseId, user: req.user._id } , {
            number,
            name,
            weight,
            sets,
            reps,
            intensity,
            muscle,
            notes,
            workout,
            log
        });

        const myExercise = await Exercise.findById(exerciseId);

        res.json({myExercise});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const deleteExercise = async (req, res) => {
    try {
        const exerciseId = req.params.id;

        await Exercise.deleteOne({ _id: exerciseId, user: req.user._id });

        res.json({ success: "Exercise deleted" });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

module.exports = {
    fetchExercises,
    createExercise,
    updateExercise,
    deleteExercise
}

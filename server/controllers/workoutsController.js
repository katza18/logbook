const Workout = require('../models/workout.js');
const Exercise = require('../models/exercise');

const fetchWorkouts = async (req, res) => {
    try {
        //Find all workouts for this user & logbook, since logbooks are unique to a user, just the logbook_id should be fine
        const workouts = await Workout.find({ user: req.user._id});
        res.json({workouts});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const fetchWorkout = async (req, res) => {
    try {
        //find the workout with the user and workout id of the req
        const workoutId = req.params.id;
        const workout = await Workout.findOne({ _id: workoutId, user: req.user._id });
        res.json(workout);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const createWorkout = async (req, res) => {
    try {
        //gather workout title/body from req and create
        const {title, body, date, log} = req.body;
        const workout = await Workout.create({
            title: title,
            body: body,
            date: date,
            user: req.user._id,
            log: log
        });

        res.json({workout});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const updateWorkout = async (req, res) => {
    try {
        const workoutId = req.params.id;
        const {title, body, date} = req.body;

        await Workout.findOneAndUpdate({ _id: workoutId, user: req.user._id } , {
            title: title,
            body: body,
            date: date,
        });

        const workout = await Workout.findById(workoutId);

        res.json({workout});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const deleteWorkout = async (req, res) => {
    try {
        const workoutId = req.params.id;

        //delete the workout and all of its exercises
        await Workout.deleteOne({ _id: workoutId, user: req.user._id });
        await Exercise.deleteMany({ workout: workoutId });

        res.json({ success: "Workout deleted" });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

module.exports = {
    fetchWorkouts,
    fetchWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}

const { request } = require('express');
const Log = require('../models/log.js');
const Workout = require('../models/workout');
const Exercise = require('../models/exercise');

const fetchLogs = async (req, res) => {
    try {
        const logs = await Log.find({ user: req.user._id });
        res.json({logs});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }

}

const fetchLog = async (req, res) => {
    try {
    const logId = req.params.id;

    const log = await Log.findOne({ _id: logId, user: req.user._id });

    res.json({log});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const createLog = async (req, res) => {
    try {
        const {title, body, type} = req.body;

        const log = await Log.create({
            title: title,
            body: body,
            type: type,
            user: req.user._id
        });

        res.json({log});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const updateLog = async (req, res) => {
    try {
        const logId = req.params.id;
        const {title, body} = req.body;

        await Log.findOneAndUpdate({ _id: logId, user: req.user._id } , {
            title: title,
            body: body
        });

        const log = await Log.findById(logId);

        res.json({log});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const deleteLog = async (req, res) => {
    try {
        const logId = req.params.id;

        //Delete the log and all of its workouts/exercises
        await Log.deleteOne({ _id: logId, user: req.user._id });
        await Workout.deleteMany({ log: logId, user: req.user._id });
        await Exercise.deleteMany({ log: logId , user: req.user._id });

        res.json({ success: "Log deleted" });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

module.exports = {
    fetchLogs,
    fetchLog,
    createLog,
    updateLog,
    deleteLog
}

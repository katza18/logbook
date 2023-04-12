const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function signup(req, res) {
    try {
        const { email, password } = req.body;

        //Gen salt and hash (bcrypt)
        const hash = bcrypt.hashSync(password, 8);

        await User.create({email, password: hash});

        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

async function login(req, res) {
    try {
        //store login details
        const { email, password } = req.body;

        //find user in DB, error if no user
        const user = await User.findOne({email});
        if (!user) return res.sendStatus(401);

        //compare passwords using bcrypt, error if bad password
        const match = bcrypt.compareSync(password, user.password);
        if (!match) return res.sendStatus(401);

        //Create jsonwebtoken token
        const exp = Date.now() + 1000 * 60 * 60 * 24;
        const token = jwt.sign({ sub: user._id, exp }, process.env.KEY);

        //Set cookie
        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === "production"
        });

        //Success
        res.sendStatus(200);

    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

async function updateAccount(req, res) {
    try {
        //get BW, height, sex, and goal from request
        const { bodyweight, height, sex, goal, activity, age } = req.body;

        //Calculate Recommended Calories
        //Calculate TDEE (total daily energy expenditure)
        if (sex.localeCompare("male") === 0) {
            //male equation
            const tdee = ((10 * bodyweight) + (6.25 * height) - (5 * age) + 5) * activity;
        } else {
            //female equation
            const tdee = ((10 * bodyweight) + (6.25 * height) - (5 * age) - 161) * activity;
        }

        //Calculate recommended calories
        if(goal.localeCompare("Weight Gain")) {
            //gain - 15-20% surplus
            const calories = tdee * 1.175;
        } else if (goal.localeCompare("Weight Loss")) {
            //lose - 15-20% deficit
            const calories = tdee * 0.825;
        } else {
            //maintain - stays the same
            const calories = tdee;
        }

        //Update parameters
        await User.findOneAndUpdate({ _id: req.user._id }, { bodyweight, height, sex, goal, activity, age, calories });

        //Success
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

function logout(req, res) {
    try {
        res.clearCookie("Authorization");
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

function authorize(req, res) {
    try {
        res.sendStatus(200);
    } catch(err) {
        res.sendStatus(400);
    }
}

module.exports = {
    signup,
    login,
    logout,
    authorize,
    updateAccount
}

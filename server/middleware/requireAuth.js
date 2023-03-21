const jwt = require('jsonwebtoken');
const User = require('../models/user')

async function requireAuth(req, res, next) {
    try {
        //decode token
        const token = req.cookies.Authorization;
        const decoded = jwt.verify(token, process.env.KEY);

        //Check exp
        if (Date.now() > decoded.exp) return res.sendStatus(401);

        //Find user, error if none
        const user = await User.findById(decoded.sub);
        if (!user) return res.sendStatus(401);

        //Send verified user to next function
        req.user = user;
        next();
    } catch(err) {
        return res.sendStatus(401);
    }
}

module.exports = {
    requireAuth
};

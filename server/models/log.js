const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    title: String,
    body: String,
    type: String,
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;

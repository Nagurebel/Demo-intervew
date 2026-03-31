let mongoose = require("mongoose");


let interviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
        default: "Low"
    },
    status: {
        type: String,
        required: true,
        default: "Scheduled"
    }
})

let interviewModel = mongoose.model("interview", interviewSchema)

module.exports = interviewModel;
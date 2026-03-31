let interViewModel = require("../models/interviewModel")


let getAllInterviews = async (req, res, next) => {
    try {
        let response = await interViewModel.find();
        res.status(200).json({
            error: false,
            message: "Interviews fetched successfully",
            data: response
        })
    } catch (error) {
        next(error)
    }
}
let getByInterviewId = async (req, res, next) => {
    try {
        let response = await interViewModel.findById(req.params.id);
        res.status(200).json({
            error: false,
            message: "Interview fetched successfully",
            data: response
        })
    } catch (error) {
        next(error)
    }
}

let createInterview = async (req, res, next) => {
    try {
        let response = await interViewModel.create(req.body);
        res.status(201).json({
            error: false,
            message: "Interview created successfully",
            data: response
        })
    } catch (error) {
        next(error)
    }
}
let updateInterview = async (req, res, next) => {
    try {

        let interviewer = await interViewModel.findById(req.params.id);
        if (!interviewer) {
            return res.status(404).json({
                error: true,
                message: "Interview not found"
            })
        }

        let response = await interViewModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            error: false,
            message: "Interview updated successfully",
            data: response
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAllInterviews,
    createInterview,
    updateInterview
}
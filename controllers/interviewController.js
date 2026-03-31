let interViewModel = require("../models/interviewModel")
const redisClient = require("../config/redis");

let getAllInterviews = async (req, res, next) => {
    try {
        let { status, priority } = req.query;

        let chachData = await redisClient.get("interviews");
        if (chachData) {
            console.log("Cache fetching from database...");
            return res.status(200).json({
                error: false,
                message: "Interviews fetched successfully from cache",
                data: JSON.parse(chachData)
            })
        }
        console.log("Cache miss, fetching from database...");
        let response;
        if (status && priority) {
            response = await interViewModel.find({ status, priority }).lean();
        } else {
            response = await interViewModel.find().lean();
        }
        await redisClient.set("interviews", JSON.stringify(response), { EX: 60 }); // Cache for 60 seconds
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
        let chachData = await redisClient.get(`interview:${req.params.id}`);
        if (chachData) {
            console.log("Cache fetching from database...");
            return res.status(200).json({
                error: false,
                message: "Interview fetched successfully from cache",
                data: JSON.parse(chachData)
            })
        }
        console.log("Cache miss, fetching from database...");
        let response = await interViewModel.findById(req.params.id);
        if (!response) {
            return res.status(404).json({
                error: true,
                message: "Interview not found"
            })
        }
        await redisClient.set(`interview:${req.params.id}`, JSON.stringify(response), { EX: 60 }); // Cache for 60 seconds
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
        await redisClient.del("interviews"); // Invalidate cache for the interview list
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
        redisClient.del(`interview:${req.params.id}`); // Invalidate cache for the updated interview
        redisClient.del("interviews"); // Invalidate cache for the interview list
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

const deleteInterview = async (req, res, next) => {
    try {
        let interviewer = await interViewModel.findById(req.params.id);
        redisClient.del(`interview:${req.params.id}`); // Invalidate cache for the updated interview
        redisClient.del("interviews"); // Invalidate cache for the interview list
        if (!interviewer) {
            return res.status(404).json({
                error: true,
                message: "Interview not found"
            })
        }
        await interViewModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            error: false,
            message: "Interview deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getByInterviewId,
    getAllInterviews,
    createInterview,
    updateInterview,
    deleteInterview
}
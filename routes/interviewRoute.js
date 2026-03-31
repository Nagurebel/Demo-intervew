let interviewController = require("./../controllers/interviewController");
const rateLimit = require("express-rate-limit");

let router = require("express").Router();

// limiter
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 5,
    message: {
        error: true,
        message: "Too many requests, please try again later."
    }
});

router.get("/", limiter, interviewController.getAllInterviews);
router.get("/:id", interviewController.getByInterviewId);
router.post("/", interviewController.createInterview);
router.patch("/:id", interviewController.updateInterview);
router.delete("/:id", interviewController.deleteInterview);


module.exports = router;
let interviewController = require("./../controllers/interviewController");

let router = require("express").Router();

router.get("/", interviewController.getAllInterviews);
router.get("/:id", interviewController.getByInterviewId);
router.post("/", interviewController.createInterview);
router.put("/:id", interviewController.updateInterview);


module.exports = router;
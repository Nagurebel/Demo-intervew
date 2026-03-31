let interviewController = require("./../controllers/interviewController");

let router = require("express").Router();

router.get("/", interviewController.getAllInterviews);
router.get("/:id", interviewController.getByInterviewId);
router.post("/", interviewController.createInterview);
router.patch("/:id", interviewController.updateInterview);
router.delete("/:id", interviewController.deleteInterview);


module.exports = router;
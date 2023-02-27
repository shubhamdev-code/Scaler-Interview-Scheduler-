const express = require("express");
const { getAllInterviews, CreateInterview, GetInterview, UpdateInterview, DeleteInterview } = require("../controllers/interviewController");
const router = express.Router();

router.route("/interviews").get(getAllInterviews).post(CreateInterview)
router.route("/interviews/:id").get(GetInterview).put(UpdateInterview).delete(DeleteInterview);

module.exports = router;
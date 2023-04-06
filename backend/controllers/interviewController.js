const Interview = require("../models/interviewModel");
const checkOverlap = require("../utils/checkOverlap");

exports.getAllInterviews = async (req, res, next) => {
  const interview = await Interview.find().sort({ endTime: -1 });
  return res.json(interview);
};

exports.CreateInterview = async (req, res, next) => {
  let { startTime, endTime, participants } = req.body;
  if (!startTime || !endTime || !participants) {
    console.error(
      "Please enter startTime, endTime and participants email list correctly."
    );
    return res.status(400).send({ error: "Invalid input parameters" });
  }

  startTime = new Date(startTime);
  endTime = new Date(endTime);

  if (startTime < Date.now()) {
    console.error("Start time can not be before current Time.");
    return res.status(400).send({ error: "Invalid input parameters" });
  }
  if (endTime < startTime) {
    console.error("Meeting duration can not be negative.");
    return res.status(400).send({ error: "Invalid input parameters" });
  }

  if (participants.length < 2) {
    console.error("Please provide minimum of 2 participants");
    return res.status(400).send({ error: "Invalid input parameters" });
  }

  var flag = false;
  var counter = 0;

  for (let parti = 0; parti < participants.length; parti++) {
    let email = participants[parti].label;
    try {
      const result = await Interview.find({ "participants.email": `${email}` });
      counter++;
      var check = false;
      for (let resInt = 0; resInt < result.length; resInt++) {
        check = checkOverlap(result[resInt], startTime, endTime);
        if (check === true) {
          flag = true;
          break;
        }
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send({ error: "Internal server error" });
    }
  }

  if (flag == false && counter == participants.length) {
    try {
      const interview = await Interview.create(req.body);
      return res.status(201).send(interview);
    } catch (err) {
      return res.status(500).send({ error: "Internal server error" });
    }
  } else {
    return res.status(400).send({ error: "One or more participants are busy" });
  }
};

exports.GetInterview = async (req, res, next) => {
  const interview = await Interview.findById(req.params.id);
  if (!interview) {
    console.log("Interview not found");
  }
  return res.send(interview);
};

exports.UpdateInterview = async (req, res, next) => {
  const interviewId = req.params.id;
  let { startTime, endTime, participants } = req.body;
  if (!startTime || !endTime || !participants) {
    console.error(
      "Please enter interviewId, startTime, endTime and participants email list correctly."
    );
    return res.status(400).send({ error: "Invalid input parameters" });
  }

  startTime = new Date(startTime);
  endTime = new Date(endTime);

  if (startTime < Date.now()) {
    console.error("Start time can not be before current Time.");
    return res.status(400).send({ error: "Invalid input parameters" });
  }
  if (endTime < startTime) {
    console.error("Meeting duration can not be negative.");
    return res.status(400).send({ error: "Invalid input parameters" });
  }

  if (participants.length < 2) {
    console.error("Please provide minimum of 2 participants");
    return res.status(400).send({ error: "Invalid input parameters" });
  }

  try {
    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).send({ error: "Interview not found" });
    }

    var flag = false;
    var counter = 0;

    for (let parti = 0; parti < participants.length; parti++) {
      let email = participants[parti].label;
      const result = await Interview.find({
        "participants.email": `${email}`,
        _id: { $ne: interviewId },
      });
      counter++;
      var check = false;
      for (let resInt = 0; resInt < result.length; resInt++) {
        check = checkOverlap(result[resInt], startTime, endTime);
        if (check === true) {
          console.log(`${result[resInt]} the participant is busy`);

          flag = true;
          break;
        }
      }
    }

    if (flag == false && counter == participants.length) {
      const updatedInterview = await Interview.findByIdAndUpdate(
        interviewId,
        { startTime, endTime, participants },
        { new: true }
      );
      return res.status(200).send(updatedInterview);
    } else {
      return res
        .status(400)
        .send({ error: "One or more participants are busy" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

exports.DeleteInterview = async (req, res, next) => {
  const interview = await Interview.findByIdAndDelete(req.params.id);
  if (!interview) {
    return res.send("Interview not found");
  }
  return res.send({ message: "success" });
};

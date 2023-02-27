const mongoose = require("mongoose");

const InterviewSchema = mongoose.Schema({
  participants: {
    type: [
      {
        label: {
          type: String,
        },
        role: String,
      },
    ],
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
});

module.exports = mongoose.model("Interviews", InterviewSchema);
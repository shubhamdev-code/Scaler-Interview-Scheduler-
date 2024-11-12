import React from "react";
import "../styles/InterviewCard.css";
import { useNavigate } from "react-router-dom";

const InterviewCard = (props) => {
  const data = props.data;
  const startDate = data.startTime;
  const endDate = data.endTime;
  const navigate = useNavigate();

  let options = {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  };

  let startShow = new Date(startDate).toLocaleTimeString("en-GB", options);

  let endShow = new Date(endDate).toLocaleTimeString("en-GB", options);

  return (
    <div
      className="card-body"
      onClick={() => navigate(`/interview-edit/${data._id}`)}
      style={{ cursor: "pointer" }}
    >
      <p>
        From: {startShow} - To: {endShow}
      </p>
      {data.participants.map((participant) => (
        <div>
          <span style={{ fontWeight: 600 }}>{participant.role} </span> :{" "}
          {participant.label}
        </div>
      ))}
    </div>
  );
};

export default InterviewCard;

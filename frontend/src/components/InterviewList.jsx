import React, { useEffect, useState } from "react";
import "../styles/InterviewList.css";
import InterviewCard from "./InterviewCard";

const InterviewList = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetch("https://interview-scheduler-5mj2.onrender.com/api/v1/interviews/api/v1/interviews")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoad(false);
      });
  }, []);

  return (
    <div className="interview-body">
      {load ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1 style={{textAlign: "left", paddingLeft: "10px"}}>Interview List</h1>
          <div className="header1">
            <div className="upcoming-interviews">
              {data.length === 0 ? (
                <p>No Interviews Found</p>
              ) : (
                data.map((oneData) => <InterviewCard data={oneData} />)
              )}
            </div>
          </div>

          <div className="header2">
            <h1>Interview List by Participant</h1>
            <div className="search-box">
              <label>Participant</label>
              <input type="text" placeholder="Search Participants" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InterviewList;

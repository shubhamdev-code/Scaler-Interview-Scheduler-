import React, { useEffect, useState } from "react";
import "../styles/InterviewList.css";
import InterviewCard from "./InterviewCard";

const InterviewList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetch("https://interview-scheduler-5mj2.onrender.com/api/v1/interviews")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setLoad(false);
      });
  }, []);

  function handleSearch(query) {
    setFilteredData(
      data.filter((meeting) =>
        meeting.participants.some((participant) =>
          participant.label.includes(query)
        )
      )
    );
  }

  return (
    <div className="interview-body">
      <h1 style={{ textAlign: "left", paddingLeft: "10px" }}>Interview List</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Participants by Email"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {load ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="header1">
            <div className="upcoming-interviews">
              {filteredData.length === 0 ? (
                <p>No Interviews Found</p>
              ) : (
                filteredData.map((oneData) => <InterviewCard data={oneData} />)
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InterviewList;

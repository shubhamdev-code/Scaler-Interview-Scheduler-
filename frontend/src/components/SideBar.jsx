import React, { useState } from "react";
import "../styles/SideBar.css";
import { IoCloseSharp } from "react-icons/io5";
import Creatable from "react-select/creatable";
import moment from "moment";

const SideBar = (props) => {

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [candidates, setCandidates] = useState([]);
  const [interviewers, setInterviewers] = useState([]);

  const Interviewer = [
    {
      label: "shubhamkrs@gmail.com",
      // label: "Shubham",
      role: "Interviewer",
      interviews: [],
    },
    {
      label: "sp9787@srmist.edu.in",
      // label: "Shubham SRM",
      role: "Interviewer",
      interviews: [],
    },
    {
      label: "shubhamkoyi@juspay.com",
      role: "Interviewer",
      interviews: [],
    },
  ];

  const Candidate = [
    {
      label: "yuvrajsingh@gmail.com",
      // label: "Yuvraj",
      role: "Candidate",
      interviews: [],
    },
    {
      label: "shashank@gmail.com",
      // label: "Shashank",
      role: "Candidate",
      interviews: [],
    },
    {
      label: "himanshu@gmail.com",
      // label: "Himanshu",
      role: "Candidate",
      interviews: [],
    },
  ];

  const [load, setLoad] = useState(false);

  // const handleEmail = () => {
  //   let updatedParticipants = [...interviewers, ...candidates];
  //   console.log(updatedParticipants);
  //   setParticipants(updatedParticipants);
  //   console.log(`this is hook: ${participants}`);
  // };

  const handleSubmit = (e) => {
    setLoad(true);
    const updatedParticipants = [...interviewers, ...candidates];
    if(updatedParticipants.length < 2) {
      setLoad(false);
      return window.alert("Participants cannot be less than two, please try again!");
    }

    const data = {
      participants: updatedParticipants,
      date,
      startTime: moment(`${date} ${startTime}`, "YYYY-MM-DD HH:mm:ss").format(),
      endTime: moment(`${date} ${endTime}`, "YYYY-MM-DD HH:mm:ss").format(),
    };

    if (props.task === "update") {
      fetch(props.url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          setLoad(false);
          window.location.reload();
          // navigate(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch(props.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          console.log(data);
          setLoad(false);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClick = (e) => {
    document.getElementById("side-body").style.marginLeft = "-310px";
  };

  return (
    <div className="side-body" id="side-body">
      <IoCloseSharp size={24} className="close-button" onClick={handleClick} />
      {load ? (
        <h1>Loading...</h1>
      ) : (
        <form className="form-body" onSubmit={handleSubmit}>
          <h1>{props.heading} Interview</h1>
          <div className="form-div">
            <label className="input-label">Interviewer</label>
            <Creatable
              isMulti
              options={Interviewer}
              onChange={(selectedOption) => {
                setInterviewers(selectedOption);
                console.log("interviewers selected", selectedOption);
              }}
              required
            />
          </div>
          <div className="form-div">
            <label className="input-label">Candidate</label>
            <Creatable
              isMulti
              options={Candidate}
              onChange={(selectedOption) => {
                setCandidates(selectedOption);
                console.log("candidates selected", selectedOption);
              }}
              required={true}
            />
          </div>
          <div className="form-div">
            <label className="input-label">Date</label>
            <input
              type="date"
              className="input-box"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required={true}
            />
          </div>

          <div className="form-div">
            <label className="input-label">Start Time</label>
            <input
              type="time"
              className="input-box"
              name="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-div">
            <label className="input-label">End Time</label>
            <input
              type="time"
              className="input-box"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required={true}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      )}
    </div>
  );
};

export default SideBar;

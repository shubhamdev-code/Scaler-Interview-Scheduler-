import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "./SideBar";
import "../styles/InterviewEdit.css";
import { IoIosArrowForward } from "react-icons/io";

const InterviewEdit = () => {
  const params = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState();
  const [load, setLoad] = useState(true);
  console.log(params.id);
  const apiURL = `http://localhost:5000/api/v1/interviews/${params.id}`;

  const handleOpen = (e) => {
    document.getElementById("side-body").style.marginLeft = "0px";
  };

  useEffect(() => {
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
        setLoad(false);
      });
      // eslint-disable-next-line
  }, []);

  const handleDelete = (e) => {
    fetch(`http://localhost:5000/api/v1/interviews/${params.id}`, {
      method: "DELETE",
    })
      .then((data) => {
        navigate(-1);
        window.alert("Interview deleted!");
      })
      .catch((error) => {
        console.error("There was a problem with the delete request:", error);
      });
  };

  return (
    <div className="ie-body">
      <SideBar url={apiURL} task="update" heading={"Change"} />
      <IoIosArrowForward
        className="open-button"
        size={24}
        onClick={handleOpen}
        style={{ position: "absolute", top: "15px", left: "15px" }}
      />
      {load ? (
        <h1>Loading...</h1>
      ) : (
        <div
          style={{
            display: "flex",
            width: "100vw",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button onClick={() => navigate(-1)} className="ie-home">
            Home screen
          </button>
          <div className="ie-main">
            <h2>Your current interview details: </h2>
            <h3>{`From: ${new Date(
              data.startTime
            ).toLocaleString()} - To: ${new Date(
              data.endTime
            ).toLocaleString()}`}</h3>

            {data.participants.map((participant) => (
              <p>
                <span style={{ fontWeight: 600 }}>{participant.role}</span>:{" "}
                {participant.label}
              </p>
            ))}
          </div>

          <button onClick={handleDelete} className="ie-button">
            Delete Interview
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewEdit;

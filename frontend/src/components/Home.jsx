import React from "react";
import "../App.css";
import InterviewList from "./InterviewList";
import SideBar from "./SideBar";
import { IoIosArrowForward } from "react-icons/io";

const Home = () => {
  const handleOpen = (e) => {
    document.getElementById("side-body").style.marginLeft = "0px";
  };

  
  return (
    <div className="App">
      <div className="top-bar"></div>
      <IoIosArrowForward className="open-button" size={24} onClick={handleOpen} />;
      <SideBar url={`https://interview-scheduler-5mj2.onrender.com/api/v1/interviews`} heading={"Create"} />
      <InterviewList />
    </div>
  );
};

export default Home;

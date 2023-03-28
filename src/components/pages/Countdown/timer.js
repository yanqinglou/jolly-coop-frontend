import "./style.css";
import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";
import API from "../../../utils/API";

const Timer = (props) => {
    // API.findEventinaGroup(props.groupId, localStorage.getItem('token')).then((data) => {
    //   console.log(data)
    //   const newDate = new Date(data[0].enddate);

    //   const endDateSec = newDate.getTime();

    //   const timerNumber = endDateSec - Date.now();
    //   setnumber(timerNumber);
    // });

  const Completionist = () => <span>You are good to go!</span>;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div id="timer">
          <div id="hours" html={hours}>
            {hours}
            <span>Hours</span>
          </div>
          <div id="minutes" html={minutes}>
            {minutes}
            <span>Minutes</span>
          </div>
          <div id="seconds" html={seconds}>
            {seconds}
            <span>Seconds</span>
          </div>
          <div>
            <h5>till the next scheduled event of :</h5>
            <br></br>
            <h1>
              <strong>{props.groupName}</strong>
            </h1>
          </div>
        </div>
      );
    }
  };


  return <Countdown date={Date.now() + props.number} renderer={renderer}/>;
};

export default Timer;

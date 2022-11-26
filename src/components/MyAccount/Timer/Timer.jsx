import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import "./Timer.css";
import axios from "axios";
import { Cookies } from "react-cookie";

const element = <FontAwesomeIcon icon={faClock} />;

const Timer = () => {
  const [timer, setTimer] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const TimeStart = async () => {
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);

    try {
      //const token = cookie.get("accessToken");
      const res = await axios({
        method: "get",
        url: "/apis/timer/start",
        headers: {
          "Content-Type": "applicaion/json",
          Authorization: `Bearer ${"accessToken"}`,
        },
      });
      if (res.status === "200") {
        console.log("success");
      }
    } catch (error) {
      const err = error.response.data;
      console.log(err);
    }
  };

  const TimePause = async () => {
    clearInterval(countRef.current);
    setIsPaused(false);

    try {
      const res = await axios({
        method: "get",
        url: "/apis/timer/start",
      });
      if (res.status === "200") {
        console.log("success");
      }
    } catch (error) {
      const err = error.response.data;
      console.log(err);
    }
  };

  const TimeResume = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const TimeReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <div className="app">
      <h2>Your Coding Timer</h2>
      <h3>!You are a coding king!</h3>
      <div className="stopwatch-card">
        <p>{formatTime()}</p>
        <div className="buttons">
          {!isActive && !isPaused ? (
            <button className="timerButton" onClick={TimeStart}>
              Start
            </button>
          ) : isPaused ? (
            <button className="timerButton" onClick={TimePause}>
              Pause
            </button>
          ) : (
            <button className="timerButton" onClick={TimeResume}>
              Resume
            </button>
          )}
          <button
            className="timerButton"
            onClick={TimeReset}
            disabled={!isActive}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
export default Timer;

import React, { useState, useEffect } from "react";
import styles from "../../css/Inputs/Timer.module.css";

import Typography from "@mui/material/Typography";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import fetchWrapper from "../../utils/fetchWrapper";
import { updateMemberTaskOptimistically } from "../../StateManagement/Actions/actions";
import { useDispatch } from "react-redux";

const Timer = ({ task, customStyles = {}, onlyIcon = false }) => {
  const dispatch = useDispatch();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (task) {
      setTime(task.duration);
    }
  }, [task])

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRunning((prevState) => !prevState);
    if (!isRunning) {
      console.log(time);
      console.log(`Time: ${time / 1000} seconds`);
    } else if (isRunning) {
      const updatedTask = { ...task, duration: time }; // Create a new object with updated duration
      console.log(updatedTask);
      const payload = {
        task_id: task.task_id,
        task: updatedTask
      };
  
      dispatch(updateMemberTaskOptimistically(payload.task_id, payload.task));
  
      fetchWrapper("/tasks", localStorage.getItem("token"), "PUT", { ...payload }).then((res) => {
        dispatch(updateMemberTaskOptimistically(res.task_id, res.task))
      });
    }
  };

  const formatTime = () => {
    const hours = Math.floor(time / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    return `${hours.toString().padStart(2, "0")}h ${minutes
      .toString()
      .padStart(2, "0")}m`;
  };

  return (
    <div
      className={styles.container}
      style={isRunning ? { backgroundColor: "rgba(46, 196, 182, 0.3)", ...customStyles } : {...customStyles}}
    >
      <div className={styles.timerDisplay}>{formatTime()}</div>
      <button
        style={isRunning ? { backgroundColor: "white" } : {}}
        className={styles.button}
        onClick={(e) => handleClick(e)}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
      {/* <Typography className={styles.TimeEdit} variant="caption">Edit</Typography> */}
    </div>
  );
};

export default Timer;

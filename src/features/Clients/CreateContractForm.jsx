import { useState, useEffect, useCallback } from "react";
import styles from "../../css/Client/CreateContractForm.module.css";
import { useDispatch, useSelector } from "react-redux";

import HoverDropdown from "../../components/HoverDropdown";

import Typography from "@mui/material/Typography";
import "react-loading-skeleton/dist/skeleton.css";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";

import _ from "lodash";
import Contract from "./Contract";
import fetchWrapper from "../../utils/fetchWrapper";
import { addContract } from "../../StateManagement/Actions/actions";

export default function ContractCreate({
  toggleModal,
  taskStatus,
  isOpen,
  selectedTask,
  type,
}) {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [selectedTimeline, setSelectedTimeline] = useState({
    title: "Short Term",
    length: "Less than a month",
  });
  const [min, setMin] = useState(2);
  const [max, setMax] = useState(30);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedSkills([]);
      setSkill("");
    }
  }, [isOpen]);

  useEffect(() => {
    console.log(selectedSkills);
  }, [selectedSkills]);

  const steps = [
    "Title Your Contract",
    "Add Key Skills",
    "Add a Description",
    "Budget & Settings",
    "Checking Things Over",
  ];

  const timelines = [
    {
      title: "Short Term",
      length: "Less than a month",
    },
    {
      title: "Mid Term",
      length: "Between 1 and 2 months",
    },
    {
      title: "Long Term",
      length: "More than 3 months",
    },
  ];

  const escalations = [
    {
      title: "Low",
      color: "#2EC4B6",
      softerColor: "rgba(46, 196, 182, 0.3)", // Softer color with reduced opacity
    },
    {
      title: "Moderate",
      color: "#FFC914",
      softerColor: "rgba(255, 201, 20, 0.3)",
    },
    {
      title: "High",
      color: "#FF9F1C",
      softerColor: "rgba(255, 159, 28, 0.3)",
    },
    {
      title: "Severe",
      color: "#F5511F",
      softerColor: "rgba(245, 81, 31, 0.3)",
    },
  ];

  function handleSkillSelect(selectedSkill) {
    if (selectedSkills.some((skill) => skill.id === selectedSkill.id)) {
      const filtered_skills = selectedSkills.filter(
        (this_skill) => this_skill.id !== selectedSkill.id
      );

      setSelectedSkills(filtered_skills);
    } else {
      setSelectedSkills([...selectedSkills, selectedSkill]);
    }
  }

  function handleTimelineSelect(timeline) {
    setSelectedTimeline(timeline);
  }

  function handleSkillChange(e) {
    setSkill(e.target.value);
  }

  function handleMinChange(e) {
    setMin(e.target.value);
  }

  function handleMaxChange(e) {
    setMax(e.target.value);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleContractCreate() {
    const payload = {
      title,
      description,
      skills: selectedSkills,
      budget: {
        min,
        max,
      },
    };

    fetchWrapper("/contracts", localStorage.getItem("token"), "POST", {
      ...payload,
    }).then((res) => {
      dispatch(addContract(res.contract));
    });
  }

  function handleSkillAdd() {
    const newSkill = {
      id: selectedSkills.length + 1,
      title: skill,
    };

    handleSkillSelect(newSkill);
    setSkill("");
  }

  return (
    <div className={styles.TaskCreation}>
      <div className={styles.Stepper}>
        {steps.map((label, index) => (
          <div
            key={label}
            className={`${styles.Step} ${
              step === index + 1 ? styles.ActiveStep : ""
            }`}
          >
            <Typography
              style={
                step === index + 1
                  ? {
                      backgroundColor: "rgb(147, 68, 226)",
                      color: "white",
                      fontSize: "20px",
                    }
                  : { fontSize: "20px" }
              }
              className={styles.StepNumber}
              variant="h4"
            >
              {step > index + 1 ? <CheckIcon /> : index + 1}
            </Typography>
            <div className={styles.StepLabel}>{label}</div>
          </div>
        ))}
      </div>
      {step === 1 ? (
        <div className={styles.StepContainer}>
          <Typography variant="caption">
            Add a title for your contract
          </Typography>
          <input
            onChange={(e) => handleTitleChange(e)}
            value={title}
            className={styles.StepInput}
            type="text"
          />
          <div className={styles.Examples}>
            <Typography color={"rebeccapurple"} variant="h6">
              Examples
            </Typography>
            <Typography color={"rebeccapurple"} variant="body1">
              - No code developer needed to rebuild app dashboard using
              bubble.io
            </Typography>
            <Typography color={"rebeccapurple"} variant="body1">
              - Video Editor needed to edit product trailer
            </Typography>
            <Typography color={"rebeccapurple"} variant="body1">
              - Nutritionist needed to develop meal plans for my app
            </Typography>
          </div>
        </div>
      ) : step === 2 ? (
        <div className={styles.StepContainer}>
          <Typography variant="caption">Add preferred skills</Typography>
          <div className={styles.SelectedSkills}>
            {selectedSkills.map((skill) => {
              return (
                <div
                  onClick={() => handleSkillSelect(skill)}
                  className={styles.Skill}
                >
                  <RemoveIcon />
                  <Typography variant="body1">{skill.title}</Typography>
                </div>
              );
            })}
          </div>
          <div style={{ rowGap: "10px" }} className={styles.Examples}>
            <div className={styles.SkillSearchContainer}>
              <input
                value={skill}
                onChange={(e) => handleSkillChange(e)}
                placeholder="Add a Skill"
                className={styles.SkillSearch}
                type="text"
              />
              <button
                disabled={
                  skill === "" ||
                  skill === " " ||
                  skill === "." ||
                  skill.length < 3
                    ? true
                    : false
                }
                onClick={handleSkillAdd}
                style={{ marginTop: "0px", height: "50px" }}
                className={styles.CreateButton}
              >
                Add Skill
              </button>
            </div>
            <div className={styles.Skill}>
              <AddIcon />
            </div>
          </div>
        </div>
      ) : step === 3 ? (
        <div className={styles.StepContainer}>
          <Typography variant="caption">Describe your contract</Typography>
          <div className={styles.SelectedSkills}>
            <textarea
              onChange={(e) => handleDescriptionChange(e)}
              value={description}
              className={styles.StepInputArea}
            ></textarea>
          </div>
          <div className={styles.Examples}>
            <Typography color={"rebeccapurple"} variant="h6">
              Tips to craft a better description
            </Typography>
            <Typography color={"rebeccapurple"} variant="body1">
              - Be descriptive by defining your problem, what you want to solve,
              and any rules on how it needs to be solved
            </Typography>
            <Typography color={"rebeccapurple"} variant="body1">
              - Include relevant links
            </Typography>
            <Typography color={"rebeccapurple"} variant="body1">
              - Explain the goal with detail
            </Typography>
          </div>
        </div>
      ) : step === 4 ? (
        <div className={styles.StepContainer}>
          <Typography variant="caption">Budget & Settings</Typography>
          <div className={styles.Budget}>
            <Typography variant="h6">Select Your Hourly Rates</Typography>
            <div className={styles.BudgetOptions}>
              <div className={styles.BudgetOption}>
                <Typography variant="h5">Min Hourly Rate</Typography>
                <input
                  onChange={(e) => handleMinChange(e)}
                  value={min}
                  className={styles.StepInput}
                  min={2}
                  type="number"
                />
              </div>
              <div className={styles.BudgetOption}>
                <Typography variant="h5">Max Hourly Rate</Typography>
                <input
                  onChange={(e) => handleMaxChange(e)}
                  value={max}
                  className={styles.StepInput}
                  min={min}
                  type="number"
                />
              </div>
            </div>
            <div className={styles.BudgetRange}></div>
          </div>
          <div className={styles.SprintInput}>
            <label className={styles.SprintLabel} htmlFor="TaskAssignees">
              What is your contract length
            </label>
            <HoverDropdown
              customStyles={{
                maxHeight: "300px",
                overflowY: "scroll",
                fontSize: "20px",
              }}
              buttonContent={
                <Typography variant="body2">
                  {selectedTimeline.title}
                </Typography>
              }
              dropdownContent={
                <>
                  {timelines.map((timeline, index) => {
                    return (
                      <div
                        key={`timeline_${index}`}
                        onClick={() => handleTimelineSelect(timeline)}
                        className={`${styles.HoverDropdownContentChildren} ${
                          selectedTimeline.title === timeline.title
                            ? styles.Selected
                            : ""
                        }`}
                      >
                        <Typography variant="body2">
                          {timeline.title}
                        </Typography>
                        <Typography color={"#a1a1a1"} variant="caption">
                          {timeline.length}
                        </Typography>
                      </div>
                    );
                  })}
                </>
              }
            />
          </div>
        </div>
      ) : step === 5 ? (
        <div className={styles.StepContainer}>
          <Typography variant="caption">Your New Contract</Typography>
          <div style={{ backgroundColor: "white" }} className={styles.Budget}>
            <Contract
              min={min}
              max={max}
              title={title}
              description={description}
              selectedSkills={selectedSkills}
              selectedTimeline={selectedTimeline}
            />
          </div>
        </div>
      ) : null}
      <div className={styles.ButtonRow}>
        {step < 5 ? (
          <button
            onClick={() => setStep(step + 1)}
            className={styles.CreateButton}
            disabled={
              (step === 1 && title.length < 5) ||
              (step === 2 && selectedSkills.length < 2) ||
              (step === 3 && description.length < 50) ||
              (step === 4 && !selectedTimeline)
                ? true
                : false
            }
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleContractCreate}
            className={styles.CreateButton}
          >
            Create Contract
          </button>
        )}
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className={styles.CreateButton}
          >
            Back
          </button>
        ) : null}
      </div>
    </div>
  );
}

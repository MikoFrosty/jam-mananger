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
  const [skills, setSkills] = useState([]);

  const topSkills = [
    'JavaScript', 'Web Design', 'HTML', 'CSS', 'PHP', 'Graphic Design', 'HTML5', 'WordPress', 'Photoshop', 'Logo Design',
    'Illustration', 'React', 'Illustrator', 'Python', 'jQuery', 'Cascading Style Sheets (CSS)', 'Website Development',
    'Mobile App Development', 'User Interface Design', 'Adobe Photoshop', 'SQL', 'MySQL', 'Web Development', 'Android',
    'Web Application', 'HTML 5', 'Software Development', 'Javascript', 'iOS', 'CSS3', 'UI/UX Design', 'Flutter', 'Java',
    'Node.js', '.NET', 'Responsive Web Design', 'Adobe Illustrator', 'App Development', 'Kotlin', 'Front-end Development',
    'C#', 'User Experience Design', 'Laravel', 'User Interface', 'Database Design', 'MongoDB', 'API Development',
    'Database Development', 'Data Entry', 'Excel', 'Software Architecture', 'Power BI', 'Go', 'Virtual Assistant', 'REST',
    'Figma', 'Dart', 'Amazon Web Services', 'Full Stack Development', 'Tableau', 'Graphic Art', 'Scripting', 'C++',
    'Business Analysis', 'Microsoft Access', 'Microsoft SQL Server', 'XML', 'Sketch', 'Google Cloud Platform',
    'Interactive Design', 'Google Docs', 'Google Analytics', 'Market Research', 'Instagram Marketing', 'UX Research',
    'Logo Design Services', 'Infographic Design', 'Product Development', 'Three.js', 'Machine Learning', 'Copywriting',
    'PostgreSQL', 'Proofreading', 'Drawing', 'Marketing Strategy', 'GitHub', 'Google AdWords', 'Google Sheets',
    'AngularJS', 'Google Workspace', 'Redux', 'Product Design', 'Statistical Analysis', 'Scala', 'Photo Editing',
    'Content Writing', 'Pandas', 'NumPy', 'Symfony', 'Technical Support', 'Computer-aided Design', 'Game Development',
    'Microsoft SQL', 'Network Administration', 'Web Application Development', 'Computer Science', 'Windows Desktop',
    'Firebase', 'Data Science', 'Elasticsearch', 'Microsoft 365', 'TypeScript', 'Tensorflow', 'Search Engine Optimization (SEO)',
    'Google Slides', 'SQLite', 'Presentations', 'Internet Research', 'Google Forms', 'GitHub API', 'Vue.js', 'ASP.NET',
    'Docker', 'Rust', 'Unreal Engine', 'Haskell', 'Information Architecture', '2D Animation', 'Social Media Management',
    'Salesforce', 'Microsoft PowerPoint', 'Scala Programming', 'Linux', 'OpenCV', 'Jenkins', 'Kubernetes', 'PyTorch',
    'Blockchain', 'OpenGL', 'Ubuntu', 'iOS Development', '3D Modeling', 'Django', 'Spring Framework', 'Google App Engine',
    'Google Translator Toolkit', 'Google App Script', 'Google Search Console', 'Google Ads', 'Google Maps API',
    'Google Data Studio', 'Amazon S3', 'Amazon Aurora', 'Amazon DynamoDB', 'Amazon RDS', 'Amazon EC2', 'Clojure', 'Dart Programming Language',
    'Progressive Web Apps (PWA)', 'AJAX', 'Google Fonts API', 'Microsoft Visio', 'Microsoft Azure',
    'Google Tag Manager', 'Objective-C', 'Rust Programming Language', 'Angular 2+', 'Swift', 'Ruby on Rails',
    'Keras', 'Express.js', '3D Rendering', 'Google Chrome Extension', 'Slack', 'Google My Business', 'Joomla',
    'Google Analytics API', 'Git', 'Google Cloud Storage', 'YouTube API', 'Ruby', 'Grunt', 'Gulp',
    'Adobe XD', 'Elasticsearch API', 'Google Places API', 'Google Maps JavaScript API', 'Mailchimp', 'Adobe Photoshop Lightroom',
    '3D Animation', 'Natural Language Processing', 'GitLab', '3ds Max', 'Unity 3D', 'OpenAI', 'Scikit-learn',
    'Solidity', 'Google Cloud Functions',
  ];

  useEffect(() => {
    if (skill === "" || !skill) {
      setSkills(topSkills);
    } else {
      const filteredSkills = topSkills.filter((thisSkill) =>
        thisSkill.toLowerCase().includes(skill.toLowerCase())
      );

      setSkills(filteredSkills);
    }
  }, [skill]);

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

  const recurring_options = [
    {
      title: "Recurring",
      description: "This task will re-open every every repeat cycle",
    },
    {
      title: "One Time",
      description: "This task will open once and complete upon delivery",
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
      timeline: selectedTimeline
    };

    fetchWrapper("/contracts", localStorage.getItem("token"), "POST", {
      ...payload,
    }).then((res) => {
      dispatch(addContract(res.contract));
      if (res.message === "Contract Created") {
        toggleModal();
      }
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
            <div className={styles.AvailableSkills}>
              {skills.map((skill, index) => {
                return (
                  <div
                    style={selectedSkills.some((thisSkill) => thisSkill.title === skill) ? {border: "1px solid rgba(162, 75, 248, 0.328)"} : {}}
                    onClick={() => handleSkillSelect({
                      title: skill,
                      id: skills.length + index,
                    })}
                    className={styles.Skill}
                  >
                    <AddIcon />
                    {skill}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : step === 3 ? (
        <div className={styles.StepContainer}>
          <Typography variant="caption">Describe your contract</Typography>
          <div className={styles.SelectedSkillsContainer}>
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

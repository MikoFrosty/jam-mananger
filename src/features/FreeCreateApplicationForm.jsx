import { useState, useEffect, useCallback } from "react";
import styles from "../css/Client/CreateContractForm.module.css";
import { useDispatch, useSelector } from "react-redux";

import HoverDropdown from "../components/HoverDropdown";

import Typography from "@mui/material/Typography";
import "react-loading-skeleton/dist/skeleton.css";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";

import _ from "lodash";
import fetchWrapper from "../utils/fetchWrapper";
import { addContract } from "../StateManagement/Actions/actions";

export default function FreeApplicationCreate({
  toggleModal,
  applicationCreated,
  isOpen,
  contract_id,
  min,
  max,
}) {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [selectedTimeline, setSelectedTimeline] = useState({
    title: "Short Term",
    length: "Less than a month",
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [addWork, setAddWork] = useState(false);
  const [workHistory, setWorkHistory] = useState([]);
  const [workTitle, setWorkTitle] = useState("");
  const [workStart, setWorkStart] = useState("");
  const [workEnd, setWorkEnd] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [currentLink, setCurrentLink] = useState("");
  const [workLinks, setWorkLinks] = useState([]);
  const [applicantEmail, setApplicantEmail] = useState("");
  const [hourlyRate, setHourlyRate] = useState(0);

  useEffect(() => {
    setHourlyRate(min);
  }, [min]);

  const topSkills = [
    "JavaScript",
    "Web Design",
    "HTML",
    "CSS",
    "PHP",
    "Graphic Design",
    "HTML5",
    "WordPress",
    "Photoshop",
    "Logo Design",
    "Illustration",
    "React",
    "Illustrator",
    "Python",
    "jQuery",
    "Cascading Style Sheets (CSS)",
    "Website Development",
    "Mobile App Development",
    "User Interface Design",
    "Adobe Photoshop",
    "SQL",
    "MySQL",
    "Web Development",
    "Android",
    "Web Application",
    "HTML 5",
    "Software Development",
    "Javascript",
    "iOS",
    "CSS3",
    "UI/UX Design",
    "Flutter",
    "Java",
    "Node.js",
    ".NET",
    "Responsive Web Design",
    "Adobe Illustrator",
    "App Development",
    "Kotlin",
    "Front-end Development",
    "C#",
    "User Experience Design",
    "Laravel",
    "User Interface",
    "Database Design",
    "MongoDB",
    "API Development",
    "Database Development",
    "Data Entry",
    "Excel",
    "Software Architecture",
    "Power BI",
    "Go",
    "Virtual Assistant",
    "REST",
    "Figma",
    "Dart",
    "Amazon Web Services",
    "Full Stack Development",
    "Tableau",
    "Graphic Art",
    "Scripting",
    "C++",
    "Business Analysis",
    "Microsoft Access",
    "Microsoft SQL Server",
    "XML",
    "Sketch",
    "Google Cloud Platform",
    "Interactive Design",
    "Google Docs",
    "Google Analytics",
    "Market Research",
    "Instagram Marketing",
    "UX Research",
    "Logo Design Services",
    "Infographic Design",
    "Product Development",
    "Three.js",
    "Machine Learning",
    "Copywriting",
    "PostgreSQL",
    "Proofreading",
    "Drawing",
    "Marketing Strategy",
    "GitHub",
    "Google AdWords",
    "Google Sheets",
    "AngularJS",
    "Google Workspace",
    "Redux",
    "Product Design",
    "Statistical Analysis",
    "Scala",
    "Photo Editing",
    "Content Writing",
    "Pandas",
    "NumPy",
    "Symfony",
    "Technical Support",
    "Computer-aided Design",
    "Game Development",
    "Microsoft SQL",
    "Network Administration",
    "Web Application Development",
    "Computer Science",
    "Windows Desktop",
    "Firebase",
    "Data Science",
    "Elasticsearch",
    "Microsoft 365",
    "TypeScript",
    "Tensorflow",
    "Search Engine Optimization (SEO)",
    "Google Slides",
    "SQLite",
    "Presentations",
    "Internet Research",
    "Google Forms",
    "GitHub API",
    "Vue.js",
    "ASP.NET",
    "Docker",
    "Rust",
    "Unreal Engine",
    "Haskell",
    "Information Architecture",
    "2D Animation",
    "Social Media Management",
    "Salesforce",
    "Microsoft PowerPoint",
    "Scala Programming",
    "Linux",
    "OpenCV",
    "Jenkins",
    "Kubernetes",
    "PyTorch",
    "Blockchain",
    "OpenGL",
    "Ubuntu",
    "iOS Development",
    "3D Modeling",
    "Django",
    "Spring Framework",
    "Google App Engine",
    "Google Translator Toolkit",
    "Google App Script",
    "Google Search Console",
    "Google Ads",
    "Google Maps API",
    "Google Data Studio",
    "Amazon S3",
    "Amazon Aurora",
    "Amazon DynamoDB",
    "Amazon RDS",
    "Amazon EC2",
    "Clojure",
    "Dart Programming Language",
    "Progressive Web Apps (PWA)",
    "AJAX",
    "Google Fonts API",
    "Microsoft Visio",
    "Microsoft Azure",
    "Google Tag Manager",
    "Objective-C",
    "Rust Programming Language",
    "Angular 2+",
    "Swift",
    "Ruby on Rails",
    "Keras",
    "Express.js",
    "3D Rendering",
    "Google Chrome Extension",
    "Slack",
    "Google My Business",
    "Joomla",
    "Google Analytics API",
    "Git",
    "Google Cloud Storage",
    "YouTube API",
    "Ruby",
    "Grunt",
    "Gulp",
    "Adobe XD",
    "Elasticsearch API",
    "Google Places API",
    "Google Maps JavaScript API",
    "Mailchimp",
    "Adobe Photoshop Lightroom",
    "3D Animation",
    "Natural Language Processing",
    "GitLab",
    "3ds Max",
    "Unity 3D",
    "OpenAI",
    "Scikit-learn",
    "Solidity",
    "Google Cloud Functions",
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

  const steps = ["Personal Info", "Relevant Work"];

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

  function handleSkillChange(e) {
    setSkill(e.target.value);
  }

  function handleEmailChange(e) {
    setApplicantEmail(e.target.value);
  }

  function handleHourlyRateChange(e) {
    setHourlyRate(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleWorkTitleChange(e) {
    setWorkTitle(e.target.value);
  }

  function handleWorkDescriptionChange(e) {
    setWorkDescription(e.target.value);
  }

  function handleLinkChange(e) {
    setCurrentLink(e.target.value);
  }

  function handleStartDateChange(e) {
    console.log(e.target.value);
    setWorkStart(e.target.value);
  }

  function handleEndDateChange(e) {
    setWorkEnd(e.target.value);
  }

  function handleWorkCreate() {
    setAddWork(true);
  }

  function convertToMS(dateStamp) {
    const date = new Date(dateStamp);
    const milliseconds = date.getTime();

    return parseInt(milliseconds);
  }

  function handleLinkAdd() {
    if (currentLink.includes("http://") || currentLink.includes("https://")) {
      setWorkLinks([...workLinks, currentLink]);

      setCurrentLink("");
    }
  }

  function handleWorkHistoryCreate() {
    const payload = {
      company: workTitle,
      duties: workDescription,
      start: workStart,
      end: workEnd,
      links: workLinks,
    };

    setWorkHistory([...workHistory, payload]);

    setWorkTitle("");
    setWorkDescription("");
    setWorkStart("");
    setWorkEnd("");
    setWorkLinks([]);
    setAddWork(false);
  }

  function handleApplicationCreate() {
    const payload = {
      applicant_type: "free",
      contract_id: contract_id,
      applicant_email: applicantEmail,
      applicant_work_history: workHistory,
      applicant_description: description,
      skills: selectedSkills,
      quote: hourlyRate,
      opt_in: true
    };

    console.log("Applied", payload);

    fetchWrapper("/applications", "", "POST", {
      ...payload,
    }).then((res) => {
      if (res.message === "Application Submitted") {
        toggleModal();
        applicationCreated();
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
        <div style={{ overflowY: "scroll" }} className={styles.StepContainer}>
          <div style={{ marginTop: "0px" }} className={styles.StepGroup}>
            <Typography variant="caption">Your Email</Typography>
            <input
              onChange={(e) => handleEmailChange(e)}
              value={applicantEmail}
              className={styles.StepInput}
              type="email"
            />
          </div>
          <div className={styles.StepGroup}>
            <Typography variant="caption">Describe Yourself</Typography>
            <textarea
              onChange={(e) => handleDescriptionChange(e)}
              value={description}
              className={styles.StepInputArea}
              style={{ backgroundColor: "#f1f1f1", borderRadius: "5px" }}
            />
          </div>
          <div className={styles.StepGroup}>
            <Typography variant="caption">Your skills</Typography>
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
            <div
              style={{ rowGap: "10px", marginTop: "10px" }}
              className={styles.Examples}
            >
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
                  style={{ marginTop: "0px", height: "42.5px" }}
                  className={styles.CreateButton}
                >
                  Add Skill
                </button>
              </div>
              <div className={styles.AvailableSkills}>
                {skills.map((skill, index) => {
                  return (
                    <div
                      style={
                        selectedSkills.some(
                          (thisSkill) => thisSkill.title === skill
                        )
                          ? { border: "1px solid rgba(162, 75, 248, 0.328)" }
                          : {}
                      }
                      onClick={() =>
                        handleSkillSelect({
                          title: skill,
                          id: skills.length + index,
                        })
                      }
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
        </div>
      ) : step === 2 ? (
        <div style={{ overflowY: "auto" }} className={styles.StepContainer}>
          <div style={{ marginTop: "0px" }} className={styles.StepGroup}>
            <Typography variant="caption">Your Hourly Rate</Typography>
            <input
              onChange={(e) => handleHourlyRateChange(e)}
              value={hourlyRate}
              className={styles.StepInput}
              type="number"
              min={min}
              max={max}
            />
            <Typography
              color={"#a1a1a1"}
              variant="caption"
            >{`The range for this contract is between $${min} & $${max} per hour`}</Typography>
          </div>
          <div className={styles.StepGroup}>
            <Typography variant="caption">Your Work</Typography>
            <div className={styles.WorkExamples}>
              <div
                onClick={handleWorkCreate}
                style={{ alignItems: "center", justifyContent: "center" }}
                className={styles.WorkExample}
              >
                <Typography variant="caption">Add Work History</Typography>
                <AddIcon />
              </div>
              {workHistory.map((work, index) => {
                return (
                  <div className={styles.WorkExample}>
                    <div className={styles.ContentRow}>
                      <Typography
                        style={{
                          maxWidth: "50%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        variant="h6"
                      >
                        {work.company}
                      </Typography>
                      <Typography
                        textAlign={"right"}
                        variant="caption"
                      >{`${work.start} - ${work.end}`}</Typography>
                    </div>
                    <text className={styles.WorkExampleText}>
                      {work.duties || "nothing to show"}
                    </text>
                    {work.links.length > 0 ? (
                      <HoverDropdown
                        id={`WorkLinksDropdown_${index}`}
                        customStyles={{ maxHeight: "300px", width: "100%" }}
                        buttonContent={
                          <Typography variant="body1">
                            {work.links.length === 1
                              ? `${work.links[0]}`
                              : `${work.links[0]} + ${
                                  work.links.length - 1
                                } more`}
                          </Typography>
                        }
                        dropdownContent={
                          <div className={styles.Skills}>
                            {work.links.map((link) => {
                              return <div>{link}</div>;
                            })}
                          </div>
                        }
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
          {addWork ? (
            <div className={styles.StepGroup}>
              <Typography variant="caption">Add Work Details</Typography>
              <div className={styles.AddWork}>
                <input
                  value={workTitle}
                  onChange={(e) => handleWorkTitleChange(e)}
                  placeholder="Workplace"
                  className={styles.SkillSearch}
                  type="text"
                />
                <div className={styles.DateSelectors}>
                  <div className={styles.DateSelector}>
                    <Typography variant="caption">From</Typography>
                    <input
                      value={workStart}
                      onChange={(e) => handleStartDateChange(e)}
                      className={styles.DateInput}
                      type="date"
                    />
                  </div>
                  <div className={styles.DateSelector}>
                    <Typography variant="caption">To</Typography>
                    <input
                      value={workEnd}
                      onChange={(e) => handleEndDateChange(e)}
                      className={styles.DateInput}
                      type="date"
                    />
                  </div>
                </div>
                <div style={{ marginTop: "0px" }} className={styles.StepGroup}>
                  <Typography variant="caption">Describe Your Work</Typography>
                  <textarea
                    onChange={(e) => handleWorkDescriptionChange(e)}
                    value={workDescription}
                    className={styles.StepInputArea}
                  />
                </div>
                <div style={{ marginTop: "20px" }} className={styles.StepGroup}>
                  <Typography variant="caption">Add Relevant Links</Typography>
                  <div className={styles.WorkLinks}>
                    <div className={styles.SkillSearchContainer}>
                      <input
                        value={currentLink}
                        onChange={(e) => handleLinkChange(e)}
                        placeholder="Portfolio, Git, Dribble, Website"
                        className={styles.SkillSearch}
                        type="text"
                      />
                      <button
                        onClick={handleLinkAdd}
                        style={{ marginTop: "0px", height: "42.5px" }}
                        className={styles.CreateButton}
                      >
                        Add Link
                      </button>
                    </div>
                    {workLinks.map((link, index) => {
                      return (
                        <Typography
                          textOverflow={"ellipsis"}
                          key={`link_${index}`}
                          variant="caption"
                          style={{ padding: "5px" }}
                        >
                          {link}
                        </Typography>
                      );
                    })}
                  </div>
                </div>
              </div>
              <button
                disabled={
                  workDescription.length < 50 ||
                  workTitle.length < 2 ||
                  !workStart ||
                  !workEnd ||
                  convertToMS(workEnd) < convertToMS(workStart)
                    ? true
                    : false
                }
                style={{
                  alignSelf: "start",
                  backgroundColor: "#f1f1f1",
                  color: "rgb(162, 75, 248)",
                }}
                className={styles.CreateButton}
                onClick={() => handleWorkHistoryCreate()}
              >
                Add Work
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
      <div className={styles.ButtonRow}>
        {step < 2 ? (
          <button
            onClick={() => setStep(step + 1)}
            className={styles.CreateButton}
            disabled={
              (step === 1 && applicantEmail.length < 5) ||
              selectedSkills.length < 3 ||
              description.length < 50 ||
              (step === 2 && workHistory.length < 1)
                ? true
                : false
            }
          >
            Next
          </button>
        ) : (
          <button
            disabled={workHistory.length < 1 || parseInt(hourlyRate) < 1}
            onClick={handleApplicationCreate}
            className={styles.CreateButton}
          >
            Submit Application
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

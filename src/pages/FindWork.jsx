import styles from "../css/FindWork.module.css";
import { useState, useEffect } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import fetchWrapper from "../utils/fetchWrapper";

import { Rating, Typography } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import HoverDropdown from "../components/HoverDropdown";

export default function FindWork({ userType = "user", customStyles = {} }) {
  const contractsPerPage = 15;
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

  const [contracts, setContracts] = useState(null);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [filterString, setFilterString] = useState("");
  const [filterDate, setFilterDate] = useState(null);
  const [fetchContracts, setFetchContracts] = useState(true);
  const [contractsLoading, setContractsLoading] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [selectedTimelines, setSelectedTimelines] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");

  function handleSkillChange(e) {
    setSkill(e.target.value);
  }

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

  function handleSkillSelect(skill) {
    if (selectedSkills.some((thisSkill) => thisSkill === skill)) {
      const filteredSkills = selectedSkills.filter((selectedSkill) => selectedSkill !== skill);
      setSelectedSkills(filteredSkills);
    } else {
      setSelectedSkills([
        ...selectedSkills,
        skill
      ])
    }
  }

  function handleTimelineSelect(timeline) {
    if (selectedTimelines.some((thisTimeline) => thisTimeline.title === timeline.title)) {
      const filteredTimelines = selectedTimelines.filter((selectedTimeline) => selectedTimeline.title !== timeline.title);
      setSelectedTimelines(filteredTimelines)
    } else {
      setSelectedTimelines([
        ...selectedTimelines,
        timeline
      ])
    }
  }

  useEffect(() => {
    if (page) {
      setSkip(page * contractsPerPage);
    } else {
      setSkip(0);
    }
  }, [page]);

  useEffect(() => {
    if (1 === 2 && fetchContracts) {
      setContractsLoading(true);
      const payload = {
        filter_date: filterDate,
        filter_skills: selectedSkills,
        filter_title: filterString,
      };

      fetchWrapper("/contracts-unauthenticated", "", "GET", {
        ...payload,
      }).then((res) => {
        console.log(res);
        setContractsLoading(false);
      });
    }
  }, [page]);

  return (
    <div className={styles.FindWork}>
      <div className={styles.Header}>
        <img
          className={styles.HeaderLogo}
          src="./kamari-1000.png"
          alt="Kamari Logo Image"
        />
        <div className={styles.HeaderButtons}>
          <button className={styles.HeaderButton}>Contact</button>
          <button className={styles.HeaderButton}>Login</button>
          <button className={styles.HeaderButton}>Get Started</button>
          <HoverDropdown
            id={"SkillsDropdown"}
            customStyles={{ height: "30vh", width: "30vw" }}
            buttonContent={
              <Typography variant="body1">Select Skills</Typography>
            }
            dropdownContent={
              <>
                <div className={styles.DropdownContent}></div>
              </>
            }
          />
        </div>
      </div>
      <div className={styles.Main}>
        <div className={styles.MainLeft}>
          <div className={styles.FilterContainer}>
            <div className={styles.ContentRow}>
              <Typography variant="caption">Filters</Typography>
              <Typography className={styles.ClickableText} variant="caption">
                Clear Filters
              </Typography>
            </div>
            <div className={styles.SkillSearchContainer}>
              <input
                placeholder="Search for Contracts"
                className={styles.SkillSearch}
                type="text"
              />
            </div>
            <div className={styles.ContractFilters}>
              <HoverDropdown
                id={"SkillsDropdown"}
                customStyles={{ height: "30vh", width: "30vw" }}
                buttonContent={
                  <Typography variant="body1">{
                    selectedSkills.length === 0 ? "Select Skills" : selectedSkills.length === 1 ? selectedSkills[0] : selectedSkills.length > 1 ? `${selectedSkills[0]} + ${selectedSkills.length - 1} more` : null
                  }</Typography>
                }
                dropdownContent={
                  <div className={styles.Skills}>
                    <input
                      value={skill}
                      onChange={(e) => handleSkillChange(e)}
                      placeholder="Search for Skills"
                      className={styles.SkillSearch}
                      type="text"
                    />
                    {skills.map((skill) => {
                      return <div style={selectedSkills.some((thisSkill) => thisSkill === skill) ? {border: "1px solid rgb(162, 75, 248)"} : {}} onClick={() => handleSkillSelect(skill)} className={styles.Skill}>{skill}</div>;
                    })}
                  </div>
                }
              />
              <HoverDropdown
                id={"TimelinesDropdown"}
                customStyles={{ maxHeight: "300px", overflowY: "scroll" }}
                buttonContent={
                  <Typography variant="body1">Select Timelime</Typography>
                }
                dropdownContent={
                  <>
                    {timelines.map((timeline) => {
                      return (
                        <div style={selectedTimelines.some((thisTimeline) => thisTimeline.title === timeline.title) ? {backgroundColor: "#e5e5e5"} : {}} onClick={() => handleTimelineSelect(timeline)} className={`${styles.HoverDropdownContentChildren}`}>
                          <Typography variant="body1">{timeline.title}</Typography>
                          <Typography color={"#a1a1a1"} variant="caption">{timeline.length}</Typography>
                        </div>
                      )
                    })}
                  </>
                }
              />
              <HoverDropdown
                id={"SkillsDropdown"}
                customStyles={{ height: "30vh", width: "30vw" }}
                buttonContent={
                  <Typography variant="body1">Posted Date</Typography>
                }
                dropdownContent={
                  <>
                    <div className={styles.DropdownContent}></div>
                  </>
                }
              />
              <HoverDropdown
                id={"SkillsDropdown"}
                customStyles={{ height: "30vh", width: "30vw" }}
                buttonContent={
                  <Typography variant="body1">Applicants</Typography>
                }
                dropdownContent={
                  <>
                    <div className={styles.DropdownContent}></div>
                  </>
                }
              />
            </div>
          </div>
          <div className={styles.ContractsContainer}>
            {contractsLoading ? (
              <div>
                <Skeleton width={"100%"} height={"200px"} />
                <Skeleton width={"100%"} height={"200px"} />
                <Skeleton width={"100%"} height={"200px"} />
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.MainRight}>
          {contractsLoading || !selectedContract ? (
            <div className={styles.SelectedContract}>
              <div className={styles.ContractHeader}>
                <Skeleton width={"400px"} height={"60px"} />
                <Skeleton width={"75px"} height={"30px"} />
              </div>
              <Skeleton width={"150px"} height={"15px"} />
              <div className={styles.ContractMain}>
                <div className={styles.ContractDescription}>
                  <Skeleton count={5} width={"100%"} height={"15px"} />
                </div>
              </div>
              <div className={styles.ContractFooter}>
                <Skeleton width={"200px"} height={"30px"} />
                <Skeleton width={"75px"} height={"30px"} />
              </div>
            </div>
          ) : (
            <div className={styles.ExpandedContract}>
              <Typography variant="h4">{selectedContract.title}</Typography>
              <div className={styles.ContentRow}>
                <Typography variant="caption">
                  {formatPostedDate(selectedContract.created_date)}
                </Typography>
                <div className={styles.IconWithText}>
                  <ExploreIcon />
                  <Typography variant="body1">Remote (US)</Typography>
                </div>
              </div>
              <div className={styles.MainContract}>
                <div
                  style={{
                    height: "90%",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                  }}
                >
                  <div className={styles.SelectedSkills}>
                    {selectedContract.skills.map((skill) => {
                      return <div className={styles.Skill}>{skill.title}</div>;
                    })}
                  </div>
                  <text className={styles.Text}>
                    {selectedContract.description}
                  </text>
                  <Typography
                    style={{
                      backgroundColor: "rgba(162, 75, 248, 0.328)",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                    textAlign={"left"}
                  >
                    {selectedContract.timeline?.title
                      ? `The client expects this contract to last ${selectedContract.timeline?.title}`
                      : "The client expects this contract to last less than a month"}
                  </Typography>
                  <div className={styles.Budget}>
                    <div className={styles.Rate}>
                      <Typography variant="caption">Hourly Minimum</Typography>
                      <Typography variant="h4">
                        {`$${selectedContract.budget.min}`}
                      </Typography>
                    </div>
                    <div className={styles.Rate}>
                      <Typography variant="caption">Hourly Maximum</Typography>
                      <Typography variant="h4">
                        {`$${selectedContract.budget.max}`}
                      </Typography>
                    </div>
                  </div>
                  <div className={styles.AboutTheClient}>
                    <Typography variant="caption">
                      The client has been a member since{" "}
                      {formatDate(clientUser?.creation_date)}
                    </Typography>
                    <Rating rating={clientUser.rating} />
                  </div>
                </div>
                <div className={styles.ContractFooter}>
                  <button className={styles.ApplyButton}>
                    Manage Contract
                  </button>
                  <Typography variant="body1">
                    {`${selectedContract.application_count || 0} Applications`}
                  </Typography>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

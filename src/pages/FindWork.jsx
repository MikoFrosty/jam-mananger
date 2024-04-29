import styles from "../css/FindWork.module.css";
import { useState, useEffect } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import fetchWrapper from "../utils/fetchWrapper";
import Contract from "../features/Clients/Contract";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Typography } from "@mui/material";
import Rating from "../features/Clients/Rating";
import HoverDropdown from "../components/HoverDropdown";

import ExploreIcon from "@mui/icons-material/Explore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import SlidingModal from "../features/Dashboard/SlidingModal";
import FreeApplicationCreate from "../features/FreeCreateApplicationForm";

export default function FindWork({ userType = "user", customStyles = {} }) {
  const navigate = useNavigate();
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

  const datePosted = [
    {
      title: "Last 24 Hours",
      filter_length: 24,
    },
    {
      title: "Last 3 Days",
      filter_length: 72,
    },
    {
      title: "Last 7 Days",
      filter_length: 168,
    },
    {
      title: "Last 30 Days",
      filter_length: 720,
    },
  ];

  const [contracts, setContracts] = useState(null);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [filterString, setFilterString] = useState("");
  const [fetchContracts, setFetchContracts] = useState(true);
  const [contractsLoading, setContractsLoading] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [selectedPostedDate, setSelectedPostedDate] = useState(null);
  const [currentlyFetching, setCurrentlyFetching] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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
      const filteredSkills = selectedSkills.filter(
        (selectedSkill) => selectedSkill !== skill
      );
      setSelectedSkills(filteredSkills);
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  }

  function handleNavigate(destination) {
    if (destination.includes("https")) {
      window.open(destination);
    } else {
      navigate(destination);
    }
  }

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function handlePostedDateSelect(date) {
    console.log(selectedPostedDate, date);
    if (selectedPostedDate?.title === date.title) {
      setSelectedPostedDate(null);
    } else {
      setSelectedPostedDate(date);
    }
  }

  function notify(message) {
    toast(message, {
      className: styles.SmallToast,
      hideProgressBar: true,
      // You can also adjust the toast duration (auto-close time) here, if needed
      autoClose: 1000,
    });
  }

  function handleFilterStringChange(e) {
    setFilterString(e.target.value);
  }

  function handleTimelineSelect(timeline) {
    if (selectedTimeline?.title === timeline.title) {
      setSelectedTimeline(null);
    } else {
      setSelectedTimeline(timeline);
    }
    console.log(timeline);
  }

  function clearFilters() {
    setSelectedTimeline(null);
    setSelectedSkills([]);
    setSelectedPostedDate(null);
    setFilterString("");
    setFetchContracts(true);
    setCurrentlyFetching(false);
    setPage(1);
  }

  useEffect(() => {
    if (fetchContracts && !currentlyFetching) {
      setCurrentlyFetching(true);
      const payload = {
        filter_date: selectedPostedDate?.filter_length
          ? selectedPostedDate?.filter_length
          : null,
        filter_skills:
          selectedSkills && selectedSkills.length > 0 ? selectedSkills : null,
        filter_title: filterString && filterString !== "" ? filterString : null,
        filter_timeline: selectedTimeline
          ? JSON.stringify(selectedTimeline)
          : null,
        skip,
      };

      setContractsLoading(true);
      setSelectedContract(null);
      console.log("searching", payload);

      fetchWrapper("/contracts-unauthenticated", "", "GET", {
        ...payload,
      }).then((res) => {
        console.log(res);
        setContractsLoading(false);
        setContracts(res.contracts);
        setFetchContracts(false);
        setCurrentlyFetching(false);
        setHasMore(res.hasMoreResults);
        setTotalResults(res.totalCount);
      });
    }
  }, [
    fetchContracts,
    selectedSkills,
    selectedPostedDate,
    filterString,
    selectedTimeline,
    skip,
  ]);

  function handleContractSearch() {
    setFetchContracts(true);
    setCurrentlyFetching(false);
  }

  function handleContractSelect(contract) {
    setSelectedContract(contract);
    console.log(contract);
  }

  useEffect(() => {
    console.log("selected contract", selectedContract);
  }, [selectedContract]);

  function formatPostedDate(postedDate) {
    const seconds = parseInt(
      (parseInt(Date.now()) - parseInt(postedDate)) / 1000
    );

    if (seconds >= 86400) {
      return `Posted ${parseInt(seconds / 86400)} days ago`;
    } else if (seconds >= 3600 && seconds < 86400) {
      return `Posted ${parseInt(seconds / 3600)} hours ago`;
    } else if (seconds >= 60 && seconds < 3600) {
      return `Posted ${parseInt(seconds / 60)} minutes ago`;
    } else {
      return `Posted ${parseInt(seconds)} seconds ago`;
    }
  }

  function formatDate(timestamp) {
    const date = new Date(parseInt(timestamp));
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month}, ${year}`;
  }

  function handlePaginationDecrement() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handlePaginationIncrement() {
    if (page * 15 < totalResults) {
      setPage(page + 1);
    }
  }

  function notifyApplicationSubmission() {
    notify("Application Submitted");
  }

  useEffect(() => {
    if (page) {
      setSkip((page - 1) * contractsPerPage);
    } else {
      setSkip(0);
    }
    setFetchContracts(true);
  }, [page]);

  useEffect(() => {
    if (contracts && contracts.length > 0) {
      setSelectedContract(contracts[0]);
    }
  }, [contracts]);

  return (
    <div className={styles.FindWork}>
      <div className={styles.Header}>
        <img
          className={styles.HeaderLogo}
          src="./kamari-1000.png"
          alt="Kamari Logo Image"
        />
        <div className={styles.HeaderButtons}>
          <button
            onClick={() => handleNavigate("https://kamariteams.com/contact")}
            className={styles.HeaderButton}
          >
            Contact
          </button>
          <button
            onClick={() => handleNavigate("/login")}
            className={styles.HeaderButton}
          >
            Login
          </button>
          <button
            onClick={() => handleNavigate("/signup")}
            className={styles.HeaderButton}
          >
            Get Started
          </button>
        </div>
      </div>
      <div className={styles.Main}>
        <SlidingModal isOpen={isOpen} toggleModal={toggleModal}>
          <FreeApplicationCreate
            applicationCreated={notifyApplicationSubmission}
            min={selectedContract?.budget.min}
            max={selectedContract?.budget.max}
            contract_id={selectedContract?.contract_id}
            isOpen={isOpen}
            toggleModal={toggleModal}
          />
        </SlidingModal>
        <div className={styles.MainLeft}>
          <div className={styles.FilterContainer}>
            <div className={styles.ContentRow}>
              <Typography variant="caption">Filters</Typography>
              <Typography
                onClick={clearFilters}
                className={styles.ClickableText}
                variant="caption"
              >
                Clear Filters
              </Typography>
            </div>
            <div className={styles.SkillSearchContainer}>
              <input
                placeholder="Search for Contracts"
                className={styles.SkillSearch}
                style={{ height: "100%" }}
                type="text"
                value={filterString}
                onChange={(e) => handleFilterStringChange(e)}
              />
              <button
                className={styles.ApplyButton}
                onClick={() => handleContractSearch()}
                style={{
                  width: "fit-content",
                  backgroundColor: "rgb(162, 75, 248)",
                  color: "white",
                }}
              >
                Search
              </button>
            </div>
            <div className={styles.ContractFilters}>
              <HoverDropdown
                id={"SkillsDropdown"}
                customStyles={{ height: "30vh", width: "30vw" }}
                buttonContent={
                  <Typography variant="body1">
                    {selectedSkills.length === 0
                      ? "Select Skills"
                      : selectedSkills.length === 1
                      ? selectedSkills[0]
                      : selectedSkills.length > 1
                      ? `${selectedSkills[0]} + ${
                          selectedSkills.length - 1
                        } more`
                      : null}
                  </Typography>
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
                      return (
                        <div
                          style={
                            selectedSkills.some(
                              (thisSkill) => thisSkill === skill
                            )
                              ? { border: "1px solid rgb(162, 75, 248)" }
                              : {}
                          }
                          onClick={() => handleSkillSelect(skill)}
                          className={styles.Skill}
                        >
                          {skill}
                        </div>
                      );
                    })}
                  </div>
                }
              />
              <HoverDropdown
                id={"PostedDateDropdown"}
                customStyles={{ maxHeight: "300px", overflowY: "scroll" }}
                buttonContent={
                  <Typography variant="body1">
                    {selectedPostedDate
                      ? selectedPostedDate.title
                      : "Posted Date"}
                  </Typography>
                }
                dropdownContent={
                  <>
                    {datePosted.map((thisDate) => {
                      return (
                        <div
                          style={
                            selectedPostedDate?.title === thisDate.title
                              ? { backgroundColor: "#e5e5e5" }
                              : {}
                          }
                          onClick={() => handlePostedDateSelect(thisDate)}
                          className={`${styles.HoverDropdownContentChildren}`}
                        >
                          <Typography variant="body1">
                            {thisDate.title}
                          </Typography>
                        </div>
                      );
                    })}
                  </>
                }
              />
              <HoverDropdown
                id={"TimelinesDropdown"}
                customStyles={{ maxHeight: "300px", overflowY: "scroll" }}
                buttonContent={
                  <Typography variant="body1">
                    {selectedTimeline
                      ? selectedTimeline.title
                      : "Contract Timeline"}
                  </Typography>
                }
                dropdownContent={
                  <>
                    {timelines.map((timeline) => {
                      return (
                        <div
                          style={
                            selectedTimeline?.title === timeline.title
                              ? { backgroundColor: "#e5e5e5" }
                              : {}
                          }
                          onClick={() => handleTimelineSelect(timeline)}
                          className={`${styles.HoverDropdownContentChildren}`}
                        >
                          <Typography variant="body1">
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
          <div className={styles.ContractsContainer}>
            {contractsLoading ? (
              <div>
                <Skeleton width={"100%"} height={"200px"} />
                <Skeleton width={"100%"} height={"200px"} />
                <Skeleton width={"100%"} height={"200px"} />
              </div>
            ) : (
              <div className={styles.Contracts}>
                {contracts?.length > 0 ? (
                  contracts.map((thisContract) => {
                    return (
                      <div onClick={() => handleContractSelect(thisContract)}>
                        <Contract
                          key={thisContract.contract_id}
                          min={thisContract.budget.min}
                          max={thisContract.budget.max}
                          selectedSkills={thisContract.skills}
                          title={thisContract.title}
                          description={thisContract.description}
                          selectedTimeline={thisContract.timeline}
                          createdDate={thisContract.created_date}
                          rating={thisContract.client_details?.rating || 5}
                          customStyle={
                            thisContract.contract_id ===
                            selectedContract?.contract_id
                              ? {
                                  border: "1px solid rgb(162, 75, 248, 0.5)",
                                }
                              : {
                                  border: "1px solid transparent",
                                }
                          }
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className={styles.NoContractsCard}>
                    <Typography variant="h4">No Contracts Found</Typography>
                    <Typography variant="caption">
                      Adjust filters to see available contracts
                    </Typography>
                  </div>
                )}
              </div>
            )}
            {hasMore ? (
              <div className={styles.ContentRow}>
                <ChevronLeftIcon
                  onClick={() => handlePaginationDecrement()}
                  className={styles.PaginationIcon}
                />
                <div className={styles.PaginationMiddle}>
                  <Typography variant="caption">{`page ${page} of ${Math.ceil(
                    totalResults / 15
                  )}`}</Typography>
                </div>
                <ChevronRightIcon
                  onClick={() => handlePaginationIncrement()}
                  className={styles.PaginationIcon}
                />
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
                    height: "93%",
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
                      backgroundColor: "rgba(46, 196, 182, 0.3)",
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
                      {formatDate(
                        selectedContract.client_account_details
                          ?.creation_date || Date.now()
                      )}
                    </Typography>
                    <Rating
                      rating={
                        selectedContract.client_account_details?.rating || 5
                      }
                    />
                  </div>
                </div>
                <div className={styles.ContractFooter}>
                  <button onClick={toggleModal} className={styles.ApplyButton}>
                    Apply
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
      <ToastContainer className={styles.ToastContainerStyle} />
    </div>
  );
}

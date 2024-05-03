import { Typography } from "@mui/material";
import styles from "../css/Pages/Landing.module.css";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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

const testimonials = [
  {
    name: "- Brandon M.",
    role: "Web Developer",
    kpis: "$12,971.68 Earned | 4 Contracts | 2 Months",
    quote: "Kamari has been a game-changer for my freelance career. The quality of contracts and clients I've found through their platform is unmatched.",
  },
  {
    name: "- Kristine F.",
    role: "Graphic Designer",
    kpis: "$3,897.37 Earned | 3 Contracts | 1 Month",
    quote: "I've been able to consistently find high-paying design gigs through Kamari. The platform is user-friendly and the support team is always helpful.",
  },
  {
    name: "- Mikal K.",
    role: "Content Writer",
    kpis: "$5,364.40 Earned | 1 Contract | 2 Months",
    quote: "As a freelance writer, Kamari has provided me with a steady stream of interesting and diverse writing projects. It's been a great experience so far.",
  },
];

export default function Landing() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [emailValid, setEmailValid] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newSkills, setNewSkills] = useState([]);

  function handleSkillSelect(skill) {
    if (selectedSkills.some((thisSkill) => thisSkill.title === skill.title)) {
      const filteredSkills = selectedSkills.filter((selectedSkill) => selectedSkill.title !== skill.title);
      setSelectedSkills(filteredSkills);
    } else {
      setSelectedSkills([skill, ...selectedSkills]);
    }
    setSearchQuery("");
  }

  function validateEmail(email) {
    if (!emailValid) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
    return true;
  }

  function handleSearchChange(event) {
    const value = event.target.value;
    setSearchQuery(value);

    if (value.includes(",")) {
      const skills = value.split(",").map((skill) => skill.trim());
      const updatedNewSkills = [...newSkills];
      const updatedSelectedSkills = [...selectedSkills];

      skills.forEach((skill) => {
        if (skill !== "" && !topSkills.some((availableSkill) => availableSkill === skill) && !newSkills.some((newSkill) => newSkill.title === skill)) {
          const newSkill = {
            title: skill,
            id: topSkills.length + newSkills.length + 1,
          };
          updatedNewSkills.push(newSkill);
          updatedSelectedSkills.unshift(newSkill);
        }
      });

      setNewSkills(updatedNewSkills);
      setSelectedSkills(updatedSelectedSkills);
      setSearchQuery("");
    }
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      const newSkill = {
        title: searchQuery,
        id: topSkills.length + newSkills.length + 1,
      };
      const updatedNewSkills = [...newSkills, newSkill];
      setNewSkills(updatedNewSkills);
      handleSkillSelect(newSkill);
    }
  }

  const allSkills = [...topSkills, ...newSkills.map((skill) => skill.title)];
  const filteredSkills = allSkills.filter((skill) =>
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedSkills = [
    ...selectedSkills.map((skill) => skill.title),
    ...filteredSkills.filter((skill) => !selectedSkills.some((selectedSkill) => selectedSkill.title === skill)),
  ];

  return (
    <div className={styles.Landing}>
      <div className={styles.MainContent}>
        <Typography className={styles.Header} variant="h2">
          Freelance Opportunities
        </Typography>
        <Typography className={styles.Header} variant="h2">
          Delivered to Your Inbox
        </Typography>
        <Typography fontSize={"larger"} marginTop={3}>
          Over 20,000 new Kamari exclusive contracts straight to your inbox. From copywriting to graphic design to AI model tuning, and many more.
        </Typography>
        <Typography marginTop={"15px"} textAlign={"left"} variant="caption">
          Enter your email
        </Typography>
        <input
          className={styles.InputField}
          type="email"
          onChange={(e) => setEmailValid(validateEmail(e.target.value))}
        />
        <div className={emailValid ? styles.ShowSkills : styles.HideSkills}>
          <Typography marginTop={"15px"} textAlign={"left"} variant="caption">
            Select your skills
          </Typography>
          <form onSubmit={handleSearchSubmit}>
            <input
              className={styles.InputField}
              style={{marginBottom: "10px"}}
              type="text"
              placeholder="Search skills or add a new skill with a comma"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>
          <div className={styles.AvailableSkills}>
            {sortedSkills.map((skill, index) => {
              const isSelected = selectedSkills.some((thisSkill) => thisSkill.title === skill);
              return (
                <div
                  key={`skill_${index}`}
                  style={isSelected ? {border: "2px solid rgb(79, 39, 255)", backgroundColor: "rgb(79, 39, 255)", color: "white"} : {}}
                  onClick={() => handleSkillSelect({ title: skill, id: index })}
                  className={styles.Skill}
                >
                  {isSelected ? <RemoveIcon /> : <AddIcon />}
                  {skill}
                </div>
              );
            })}
          </div>
          <button className={styles.Button}>Start Receiving Jobs</button>
        </div>

        <div className={styles.TestimonialsSection}>
          <Typography marginBottom={"10px"} className={styles.TestimonialsHeading} variant="h4">
            What Our Users Say
          </Typography>
          <div className={styles.TestimonialCards}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.TestimonialCard}>
                <Typography className={styles.TestimonialQuote} variant="body1">
                  {
                    `"${testimonial.quote}" ${testimonial.name}`
                  }
                </Typography>
                <Typography className={styles.TestimonialRole} variant="subtitle2">
                  {testimonial.role}
                </Typography>
                <Typography className={styles.TestimonialRole} variant="subtitle2">
                  {testimonial.kpis}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
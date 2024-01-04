import React from "react";

const CompetitiveComparison = () => {
  const kamariFeatures = [
    "Custom Agile Project Management",
    "Integrated Client Portal",
    "Git Repo Itegration",
    "AI Integration to Streamline Product Deliverability",
    "Custom Workflows",
  ];

  const jiraFeatures = [
    "Agile Project Management with Scrum and Kanban Boards",
    "Customizable Workflows",
    "Robust Reporting and Insights",
    "Project Tracking and Advanced Searching",
    "Integration with Other Tools and Platforms",
  ];

  const mondayFeatures = [
    "Project Automations",
    "Deep and Extensive Integrations",
    "Customizable Project Management",
    "User-Friendly Interface",
    "Efficient Task and Workflow Management",
  ];

  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #f1f1f1",
        borderRadius: "5px",
        padding: "20px",
        margin: "20px 0",
      }}
    >
      <h2 style={{ textAlign: "center" }}>How does Kamari stack up?</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          borderCollapse: "separate",
          borderSpacing: "0 10px",
        }}
      >
        <div
          style={{
            borderRight: "1px solid #f1f1f1",
            padding: "10px",
            flex: 1,
          }}
        >
          <h3>Kamari</h3>
          <ul style={{ listStyleType: "none", paddingLeft: "20px", textAlign: "left" }}>
            {kamariFeatures.map((feature, index) => (
              <li style={index !== kamariFeatures.length - 1 ? {borderBottom: "1px solid #f1f1f1", marginBottom: "5px"} : {}} key={`${index}`}>{`- ${feature}`}</li>
            ))}
          </ul>
        </div>
        <div
          style={{
            borderRight: "1px solid #f1f1f1",
            padding: "10px",
            flex: 1,
          }}
        >
          <h3>Jira</h3>
          <ul style={{ listStyleType: "none", paddingLeft: "20px", textAlign: "left" }}>
            {jiraFeatures.map((feature, index) => (
              <li style={index !== jiraFeatures.length - 1 ? {borderBottom: "1px solid #f1f1f1", marginBottom: "5px"} : {}} key={`${index}`}>{`- ${feature}`}</li>
            ))}
          </ul>
        </div>
        <div style={{ padding: "10px", flex: 1 }}>
          <h3>Monday</h3>
          <ul style={{ listStyleType: "none", paddingLeft: "20px", textAlign: "left" }}>
            {mondayFeatures.map((feature, index) => (
              <li style={index !== mondayFeatures.length - 1 ? {borderBottom: "1px solid #f1f1f1", marginBottom: "5px"} : {}} key={`${index}`}>{`- ${feature}`}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompetitiveComparison;

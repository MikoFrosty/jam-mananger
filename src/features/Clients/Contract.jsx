import styles from "../../css/Client/Contract.module.css";

import DiamondIcon from "@mui/icons-material/Diamond";
import FiberNewIcon from "@mui/icons-material/FiberNew";

import { Typography } from "@mui/material";

import { useSelector } from "react-redux";
import Rating from "./Rating";

export default function Contract({
  min,
  max,
  selectedSkills,
  title,
  description,
  selectedTimeline,
  customStyle = {},
  createdDate,
  type = "live",
  rating,
}) {
  const clientUser = useSelector((state) => state.app.client_user);

  return (
    <div style={customStyle} className={styles.Contract}>
      <div className={styles.Header}>
        <Typography textAlign={"left"} variant="h6">
          {title}
        </Typography>
        <div className={styles.HeaderRight}>
          {(parseInt(Date.now()) - parseInt(createdDate)) / 1000 / 60 < 60 ? (
            <FiberNewIcon />
          ) : null}
        </div>
      </div>
      <Typography
        style={{
          backgroundColor: "rgba(46, 196, 182, 0.3)",
          padding: "5px",
          borderRadius: "5px",
          width: "fit-content",
        }}
        variant="caption"
        textAlign={"right"}
      >
        {selectedTimeline?.title}: {selectedTimeline?.length}
      </Typography>
      <text className={styles.Text}>{description}</text>
      <div className={styles.SelectedSkillsContract}>
        {selectedSkills.map((skill, index) => {
          return (
            <div key={`${index}_skill`} className={styles.SkillContract}>
              <Typography variant="body1">{skill.title}</Typography>
            </div>
          );
        })}
      </div>
      <Typography textAlign={"right"} variant="body1">
        From ${min} to ${max} / hr
      </Typography>
      <div className={styles.Footer}>
        <Typography style={{ alignSelf: "end" }} variant="body1">
          By: {clientUser?.account_name || "Kamari"}
        </Typography>
        {type === "live" ? (
          <div className={styles.FooterRight}>
            <Rating rating={rating} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

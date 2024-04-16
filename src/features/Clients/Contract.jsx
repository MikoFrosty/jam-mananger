import styles from "../../css/Client/Contract.module.css";

import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DiamondIcon from "@mui/icons-material/Diamond";
import FiberNewIcon from "@mui/icons-material/FiberNew";

import { Typography } from "@mui/material";

import { useSelector } from "react-redux";

export default function Contract({
  min,
  max,
  selectedSkills,
  title,
  description,
  selectedTimeline,
}) {
  const clientUser = useSelector((state) => state.app.client_user);

  return (
    <div className={styles.Contract}>
      <div className={styles.Header}>
        <Typography variant="h6">{title}</Typography>
        <div className={styles.HeaderRight}>
          <FiberNewIcon />
          <DiamondIcon />
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
      >
        {selectedTimeline?.title}: {selectedTimeline?.length}
      </Typography>
      <textarea className={styles.StepInputArea} disabled={true}>
        {description}
      </textarea>
      <div className={styles.SelectedSkillsContract}>
        {selectedSkills.map((skill) => {
          return (
            <div className={styles.SkillContract}>
              <Typography variant="body1">{skill.title}</Typography>
            </div>
          );
        })}
      </div>
      <Typography variant="body1">
        From ${min} to ${max} / hr
      </Typography>
      <div className={styles.Footer}>
        <Typography style={{ alignSelf: "end" }} variant="body1">
          By: {clientUser?.account_name || "Kamari"}
        </Typography>
        <div className={styles.FooterRight}>
          <div className={styles.Rating}>
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
          </div>
          <button className={styles.ApplyButton}>Apply</button>
        </div>
      </div>
    </div>
  );
}

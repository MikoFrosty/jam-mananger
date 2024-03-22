import styles from "../../css/Client/ClientProjects.module.css";
import ProjectsTable from "../Dashboard/Projects/ProjectsTable";

export default function ClientProjects() {
  return (
    <div className={styles.ClientProjectDashboard}>
      <ProjectsTable type={"client"}/>
    </div>
  )
}
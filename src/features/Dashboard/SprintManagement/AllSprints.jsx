import { useState } from "react";

import styles from "../../../css/SprintManagement/AllSprints.module.css";
import DocumentationBar from "../Documentation/DocumentationBar";
import SearchBar from "../../../components/searchbar/SearchBar";
import FixedButton from "../../Buttons/FloatingAction";
import { useDispatch } from "react-redux";
import { toggleView } from "../../../StateManagement/Actions/actions";

export default function AllSprints() {
  const dispatch = useDispatch();
  const [view, setView] = useState("Table");
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(searchTerm) {
    console.log(`Search for: ${searchTerm}`);
    // Add your search logic here (e.g., filtering data, making an API call)
    setSearchTerm(searchTerm);
  }

  function handleViewToggle(value) {
    setView(value);
  }

function handleCreateClick() {
  dispatch(toggleView("sprint-create"))
}

  return (
    <div className={styles.SprintView}>
      <DocumentationBar
        label={"All Sprints"}
        toggle={true}
        toggleOptions={["Gantt", "Table", "Calendar"]}
        view={view}
        onViewToggle={handleViewToggle}
        searchChild={<SearchBar onSearch={handleSearch} />}
      />
      <div className={styles.SprintViewContent}>

      </div>
      <FixedButton label={"Create Sprint"} handleClick={handleCreateClick}/>
    </div>
  )
}
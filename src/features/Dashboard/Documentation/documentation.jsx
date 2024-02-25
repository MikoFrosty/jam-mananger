import { useEffect, useState } from "react";
import SearchBar from "../../../components/searchbar/SearchBar";
import styles from "../../../css/Documentation/Documentation.module.css";
import DocumentationBar from "./DocumentationBar";
import FolderView from "./FolderView";
import TableView from "./TableView";
import { useDispatch } from "react-redux";
import { toggleRefetch } from "../../../StateManagement/Actions/actions";
import { useSelector } from "react-redux";

export default function Documentation({ type = "user" }) {
  const dispatch = useDispatch();
  const refetch = useSelector((state) => state.app.refetch);
  const [view, setView] = useState("Docs");
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(searchTerm) {
    console.log(`Search for: ${searchTerm}`);
    // Add your search logic here (e.g., filtering data, making an API call)
    setSearchTerm(searchTerm);
  }

  function handleViewToggle(value) {
    setView(value);
  }

  return (
    <div className={styles.Documentation}>
      <DocumentationBar
        label={"Documentation"}
        toggle={true}
        toggleOptions={type === "user" ? ["Folders", "Docs"] : ["Docs"]}
        view={view}
        onViewToggle={handleViewToggle}
        searchChild={<SearchBar onSearch={handleSearch} />}
      />
      <TableView type={type} searchTerm={searchTerm} view={view} />
    </div>
  );
}

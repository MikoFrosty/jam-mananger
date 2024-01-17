import { useEffect, useState } from "react";
import SearchBar from "../../../components/searchbar/SearchBar";
import styles from "../../../css/Documentation/Documentation.module.css";
import DocumentationBar from "./DocumentationBar";
import FolderView from "./FolderView";
import TableView from "./TableView";
import { useDispatch } from "react-redux";
import { toggleRefetch } from "../../../StateManagement/Actions/actions";
import { useSelector } from "react-redux";

export default function Documentation({ withoutFirstCards }) {
  const dispatch = useDispatch();
  const refetch = useSelector((state) => state.app.refetch);
  const [view, setView] = useState("card");
  const data = {
    folders: JSON.parse(localStorage.getItem("folders")),
    documents: JSON.parse(localStorage.getItem("documents")),
  };

  useEffect(() => {
    data.folders = JSON.parse(localStorage.getItem("folders"));
    data.documents = JSON.parse(localStorage.getItem("documents"));
  }, [refetch])

  function handleSearch(searchTerm) {
    console.log(`Search for: ${searchTerm}`);
    // Add your search logic here (e.g., filtering data, making an API call)
  }

  function handleViewToggle(value) {
    setView(value);
  }

  return (
    <div className={styles.Documentation}>
      <DocumentationBar
        view={view}
        onViewToggle={handleViewToggle}
        searchChild={<SearchBar onSearch={handleSearch} />}
      />
      {view === "table" ? (
        <TableView data={data} />
      ) : (
        <FolderView data={data} withoutFirstCards={withoutFirstCards} />
      )}
    </div>
  );
}

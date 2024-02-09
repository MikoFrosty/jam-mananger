import React, { useState, Suspense } from "react";
import DocumentTable from "./DocumentsTable";
import FolderTable from "./FolderTable";
import SlidingModal from "../SlidingModal";
const FolderCreate = React.lazy(() => import("../../Folders/FolderCreate")); // Lazy-loaded

export default function TableView({ searchTerm, view }) {
  const [createFolder, setCreateFolder] = useState(false);

  function toggleModal() {
    setCreateFolder(!createFolder);
  }

  return (
    <>
      {createFolder && (
        <SlidingModal isOpen={createFolder} toggleModal={toggleModal}>
          <Suspense fallback={<div>Loading...</div>}>
            <FolderCreate toggleModal={toggleModal} />
          </Suspense>
        </SlidingModal>
      )}
      {view === "Docs" ? (
        <DocumentTable searchTerm={searchTerm} />
      ) : view === "Folders" ? (
        <FolderTable searchTerm={searchTerm} toggleModal={toggleModal} />
      ) : (
        <h3>View is not supported</h3>
      )}
    </>
  );
}

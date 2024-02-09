import React, { useEffect, useState, useCallback } from "react";
import _ from "lodash";

import styles from "../../css/DocumentEditor.module.css";
import EditorComponent from "./Editor";
import DocumentCreatorBar from "./DocumentCreationBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchWrapper from "../../utils/fetchWrapper";
import { useDispatch } from "react-redux";
import {
  addDocument,
  toggleRefetch,
} from "../../StateManagement/Actions/actions";
import mapToDbFormat from "../../utils/mapToDbFormat";
import { useSelector } from "react-redux";
import { updateDocument } from "../../StateManagement/Actions/actions";

function DocumentEditor({ isOpen, noBar, customStyles }) {
  const dispatch = useDispatch();
  const selectedEditingDocument = useSelector(
    (state) => state.app.editing_document
  );
  const [selectedFolder, setSelectedFolder] = useState(
    selectedEditingDocument.folder || {}
  );
  const [selectedClient, setSelectedClient] = useState(
    selectedEditingDocument.client || {}
  );
  const [ejInstance, setEjInstance] = useState(null);
  const [needsSave, setNeedsSave] = useState(false);

  function handleFolderSelect(folder) {
    if (folder.folder_id === selectedFolder.folder_id) {
      setSelectedFolder({});
    } else {
      setSelectedFolder(folder);
    }
  }

  function handleClientSelect(client) {
    if (client.client_id === selectedClient.client_id) {
      setSelectedClient({});
    } else {
      setSelectedClient(client);
    }
  }

  const handleEditorChange = () => {
    setNeedsSave(true);
  };

  function notify(message) {
    toast(message, {
      className: styles.SmallToast,
      hideProgressBar: true,
      // You can also adjust the toast duration (auto-close time) here, if needed
      autoClose: 1000,
    });
  }

  const handleSave = useCallback(async () => {
    if (!ejInstance) {
      console.error("Editor instance is not available.");
      return;
    }
    try {
      const editorContent = await ejInstance.save();
      const payload = {
        document_data: {
          associated_org: JSON.parse(localStorage.getItem("user")).organization,
          contributors: selectedEditingDocument.contributors || [
            JSON.parse(localStorage.getItem("user")),
          ],
          updates: selectedEditingDocument.updates || [],
          content: editorContent,
          title: editorContent.blocks[0].data.text,
          blocks: editorContent.blocks,
          last_block_timestamp: editorContent.time,
          last_block_version: editorContent.version,
        },
        document_id: selectedEditingDocument.document_id,
        document_client: selectedClient || {},
        document_folder: selectedFolder || {},
      };

      notify("Saving...");

      console.log("payload for fetch",payload)
      const mappedPayload = mapToDbFormat(payload);

      mappedPayload.document_id = selectedEditingDocument.document_id;

      dispatch(updateDocument(mappedPayload))

      // API call to save the document
      fetchWrapper(
        "/autosave-document",
        localStorage.getItem("token"),
        "POST",
        { ...payload }
      )
        .then((res) => {
          setNeedsSave(false);
          console.log("result from fetch",res)

          // Dispatch the updateDocument action with the response from the server
          dispatch(updateDocument(res.document));

          notify("Document saved");
        })
        .catch((error) => {
          console.error("Error saving document:", error);
          // If the save fails, remove the optimistically added document
          notify("Failed to save document");
        });
    } catch (error) {
      console.error("Error preparing document for save:", error);
    }
  }, [ejInstance, selectedClient, selectedFolder, dispatch]);

  const debouncedSave = useCallback(_.debounce(handleSave, 5000), [handleSave]);

  useEffect(() => {
    if (needsSave) {
      debouncedSave();
    }
  }, [needsSave, debouncedSave]);

  return (
    <div className={styles.DocumentContainer}>
      {!noBar ? (
        <DocumentCreatorBar
          handleClientSelect={handleClientSelect}
          handleFolderSelect={handleFolderSelect}
          selectedFolder={selectedFolder}
          selectedClient={selectedClient}
          onSave={handleSave}
        />
      ) : null}
      <div className={styles.DocumentWindow}>
        {/* <DocumentOptionBar /> */}
        <EditorComponent
          isOpen={isOpen}
          initialData={selectedEditingDocument.content}
          customStyles={customStyles}
          setEditorInstance={setEjInstance} // Pass the callback
          onContentChange={handleEditorChange}
        />
      </div>
      <ToastContainer className={styles.ToastContainerStyle} />
    </div>
  );
}

export default DocumentEditor;

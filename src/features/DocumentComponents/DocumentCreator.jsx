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
  replaceDocument,
  toggleRefetch,
} from "../../StateManagement/Actions/actions";
import mapToDbFormat from "../../utils/mapToDbFormat";

function DocumentCreator({ isOpen, noBar, initialData, customStyles, readOnly = false }) {
  const dispatch = useDispatch();
  const [selectedFolder, setSelectedFolder] = useState({});
  const [selectedClient, setSelectedClient] = useState({});
  const [ejInstance, setEjInstance] = useState(null);
  const [needsSave, setNeedsSave] = useState(false);
  const [previousDoc, setPreviousDoc] = useState({});
  const [isPublic, setIsPublic] = useState(false)
  const [tempId, setTempId] = useState("");

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

  function handleVisibilitySelect(option) {
    setIsPublic(option)
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
      // Fetch the current content from the Editor.js instance
      const temporary_id = tempId !== "" ? tempId : `document_${Date.now()}`;
      const editorContent = await ejInstance.save();
      const payload = {
        document_data: {
          associated_org: JSON.parse(localStorage.getItem("user")).organization,
          contributors: previousDoc?.contributors || [
            JSON.parse(localStorage.getItem("user")),
          ],
          updates: previousDoc?.updates || [],
          content: editorContent,
          title: editorContent.blocks[0].data.text,
          blocks: editorContent.blocks,
          last_block_timestamp: editorContent.time,
          last_block_version: editorContent.version,
          is_public: isPublic
        },
        document_id: previousDoc?.document_id,
        document_client: selectedClient || {},
        document_folder: selectedFolder,
        temporary_id,
      };

      const mappedPayload = mapToDbFormat(payload);
      mappedPayload.temporary_id = temporary_id;

      dispatch(addDocument(mappedPayload));

      notify("Saving");

      // append temp id to payload

      fetchWrapper(
        "/autosave-document",
        localStorage.getItem("token"),
        "POST",
        { ...payload }
      ).then((res) => {
        setNeedsSave(false);

        setPreviousDoc(res.document);

        //  replace optimistic doc with real  document
        if (res.message === "document saved") {
          console.log(res)
          dispatch(replaceDocument(temporary_id, res.document));
          notify("saved");
        } else {
          notify("there was an error saving your document");
        }
      });
    } catch (error) {
      console.error("Error saving document:", error);
    }
  }, [ejInstance, selectedClient, selectedFolder, previousDoc, isPublic]);

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
          handleVisibilitySelect={handleVisibilitySelect}
          selectedFolder={selectedFolder}
          selectedClient={selectedClient}
          isPublic={isPublic}
          onSave={handleSave}
        />
      ) : null}
      <div className={styles.DocumentWindow}>
        {/* <DocumentOptionBar /> */}
        <EditorComponent
          isOpen={isOpen}
          initialData={initialData}
          customStyles={customStyles}
          setEditorInstance={setEjInstance} // Pass the callback
          onContentChange={handleEditorChange}
          readOnly={readOnly}
        />
      </div>
      <ToastContainer className={styles.ToastContainerStyle} />
    </div>
  );
}

export default DocumentCreator;

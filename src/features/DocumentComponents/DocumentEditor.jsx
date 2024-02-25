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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function DocumentEditor({ isOpen, noBar, customStyles, readOnly = false }) {
  const dispatch = useDispatch();
  const selectedEditingDocument = useSelector(
    (state) => state.app.editing_document
  );

  const clientUser = useSelector((state) => state.app.client_user);

  console.log(selectedEditingDocument);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [ejInstance, setEjInstance] = useState(null);
  const [needsSave, setNeedsSave] = useState(false);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (selectedEditingDocument) {
      console.log(selectedEditingDocument.client)
      setSelectedClient(selectedEditingDocument.client || {});
      setSelectedFolder(selectedEditingDocument.folder || {});
      setIsPublic(selectedEditingDocument.is_public);
      setInitialData(selectedEditingDocument.content);
    }
  }, [selectedEditingDocument]);

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
    setNeedsSave(true)
  }

  function handleVisibilitySelect(option) {
    if (option === isPublic) {
      return;
    } else {
      setIsPublic(option);
      setNeedsSave(true);
    }
  }

  const handleEditorChange = () => {
    console.log("Detected a change");
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
    console.log(selectedClient)
    console.log("saving");
    if (!ejInstance) {
      console.error("Editor instance is not available.");
      return;
    }
    try {
      console.log(ejInstance);
      if (ejInstance && typeof ejInstance.save === "function") {
        const editorContent = await ejInstance.save();
        const payload = {
          document_data: {
            associated_org: JSON.parse(localStorage.getItem("user"))
              .organization,
            contributors: selectedEditingDocument.contributors || [
              JSON.parse(localStorage.getItem("user")),
            ],
            updates: selectedEditingDocument.updates || [],
            content: editorContent,
            title: editorContent.blocks[0].data.text,
            blocks: editorContent.blocks,
            last_block_timestamp: editorContent.time,
            last_block_version: editorContent.version,
            is_public: isPublic,
          },
          document_id: selectedEditingDocument.document_id,
          document_client: selectedClient,
          document_folder: selectedFolder,
        };

        console.log(payload)

        notify("Saving...");

        console.log("payload for fetch", payload);
        const mappedPayload = mapToDbFormat(payload);

        console.log("MAPPED PAYLOAD FOR DB INSERT", mappedPayload)

        mappedPayload.document_id = selectedEditingDocument.document_id;

        dispatch(updateDocument(mappedPayload));

        // API call to save the document
        fetchWrapper(
          "/autosave-document",
          localStorage.getItem("token"),
          "POST",
          { ...payload }
        )
          .then((res) => {
            setNeedsSave(false);
            console.log("result from fetch", res);

            // Dispatch the updateDocument action with the response from the server
            dispatch(updateDocument(res.document));

            notify("Document saved");
          })
          .catch((error) => {
            console.error("Error saving document:", error);
            // If the save fails, remove the optimistically added document
            notify("Failed to save document");
          });
      } else {
        console.error("Editor instance is not ready or available.");
      }
    } catch (error) {
      console.error("Error preparing document for save:", error);
    }
  }, [ejInstance, selectedClient, selectedFolder, isPublic, dispatch]);

  const debouncedSave = useCallback(_.debounce(handleSave, 5000), [handleSave]);

  useEffect(() => {
    console.log(needsSave);
    console.log("attempting to save");
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
        {!initialData ? (
          <Skeleton width="100%" height="100%" />
        ) : (
          <EditorComponent
            isOpen={isOpen}
            initialData={initialData}
            customStyles={customStyles}
            readOnly={readOnly}
            setEditorInstance={setEjInstance} // Pass the callback
            onContentChange={handleEditorChange}
          />
        )}
      </div>
      <ToastContainer className={styles.ToastContainerStyle} />
    </div>
  );
}

export default DocumentEditor;

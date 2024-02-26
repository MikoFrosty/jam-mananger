import React, { useEffect, useState, useCallback, useRef } from "react";
import _ from "lodash";

import styles from "../../css/DocumentEditor.module.css";
import EditorComponent from "./Editor";
import DocumentCreatorBar from "./DocumentCreationBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchWrapper from "../../utils/fetchWrapper";
import { useDispatch } from "react-redux";
import {
  updateMemberTask,
} from "../../StateManagement/Actions/actions";

function TaskDescriptionEditor({
  isOpen,
  customStyles,
  selectedClient,
  selectedStatus,
  selectedEscalation,
  assignees,
  title,
  selectedTask,
}) {
  const dispatch = useDispatch();

  const [ejInstance, setEjInstance] = useState(null);
  const [needsSave, setNeedsSave] = useState(false);

  const renderCount = useRef(0);
  const initialRender = useRef(true);

  const handleEditorChange = () => {
    setNeedsSave(true);
  };

  // the following logic skips the useEffect on the first two renders
  // this is because the first render, the props are empty but trigger the useEffect
  // on the second render the props are not empty but are not in need of a save
  // on the third render, the user has changed some value at which point
  //  the useEffect should run and update the selected task with new prop data
  useEffect(() => {
    if (renderCount.current < 2) {
      renderCount.current += 1;
    }
    else if (renderCount.current >= 2) {
      if (initialRender.current) {
        initialRender.current = false;
        return;
      }
      else {
        handleEditorChange();
      }
    }
  }, [selectedClient, selectedStatus, selectedEscalation, assignees, title]);

  function notify(message) {
    toast(message, {
      className: styles.SmallToast,
      hideProgressBar: true,
      // You can also adjust the toast duration (auto-close time) here, if needed
      autoClose: 1000,
    });
  }

  // useEffect(() => {
  //   setNeedsSave(true)
  // }, [selectedClient])

  const handleSave = useCallback(async () => {
    if (!ejInstance) {
      console.error("Editor instance is not available.");
      return;
    }
    try {
      const editorContent = await ejInstance.save();

      if (editorContent && selectedStatus && selectedEscalation) {
        const payload = {
          task_id: selectedTask.task_id,
          task: {
            title,
            assignees,
            description: editorContent,
            client: selectedClient || {},
            status: selectedStatus,
            escalation: selectedEscalation,
          },
        };
        
        notify("Saving...");

        // API call to save the document
        fetchWrapper("/tasks", localStorage.getItem("token"), "PUT", {
          ...payload,
        })
          .then((res) => {
            setNeedsSave(false);

            // Dispatch the updateMemberTask action with the response from the server
            dispatch(updateMemberTask(res));

            notify("Task saved");
          })
          .catch((error) => {
            console.error("Error saving task:", error);
            // If the save fails, remove the optimistically added task
            notify("Failed to save task");
          });
      }
    } catch (error) {
      console.error("Error preparing document for save:", error);
    }
  }, [
    ejInstance,
    selectedClient,
    selectedEscalation,
    selectedStatus,
    title,
    assignees,
    dispatch,
  ]);

  const debouncedSave = useCallback(_.debounce(handleSave, 5000), [handleSave]);

  useEffect(() => {
    if (needsSave) {
      debouncedSave();
    }
  }, [needsSave, debouncedSave]);

  return (
    <div className={styles.DocumentContainer}>
      <div className={styles.DocumentWindow}>
        <EditorComponent
          isOpen={isOpen}
          initialData={selectedTask.description}
          customStyles={customStyles}
          setEditorInstance={setEjInstance} // Pass the callback
          onContentChange={handleEditorChange}
          readOnly={false}
        />
      </div>
      <ToastContainer className={styles.ToastContainerStyle} />
    </div>
  );
}

export default TaskDescriptionEditor;
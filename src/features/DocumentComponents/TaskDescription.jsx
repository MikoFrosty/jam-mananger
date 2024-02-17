import React, { useEffect, useState, useCallback } from "react";
import _ from "lodash";

import styles from "../../css/DocumentEditor.module.css";
import EditorComponent from "./Editor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

function TaskDescriptionCreator({
  isOpen,
  initialData,
  customStyles,
  ejInstance,
  setEjInstance,
  placeholder
}) {
  const dispatch = useDispatch();

  const handleEditorChange = () => {
    handleSave();
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

      console.log(editorContent);
    } catch (error) {
      console.error("Error preparing document for save:", error);
    }
  }, [ejInstance, dispatch]);

  return (
    <div className={styles.DocumentContainer}>
      <div className={styles.DocumentWindow}>
        {/* <DocumentOptionBar /> */}
        <EditorComponent
          isOpen={isOpen}
          customStyles={customStyles}
          setEditorInstance={setEjInstance}
          onContentChange={handleEditorChange}
          placeholder={placeholder}
        />
      </div>
      <ToastContainer className={styles.ToastContainerStyle} />
    </div>
  );
}

export default TaskDescriptionCreator;

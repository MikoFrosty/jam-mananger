import React from "react";

import styles from "../../css/DocumentEditor.module.css";
import EditorComponent from "./Editor";
import DocumentCreatorBar from "./DocumentCreationBar";

const fetchedBlocks = [
  {
    _id: "5f54d75b114c6d176d7e9765",
    html: "Heading",
    tag: "h1",
    imageUrl: "",
  },
  {
    _id: "5f54d75b114c6d176d7e9766",
    html: "I am a <strong>paragraph</strong>",
    tag: "p",
    imageUrl: "",
  },
  {
    _id: "5f54d75b114c6d176d7e9767",
    html: "/im",
    tag: "img",
    imageUrl: "images/test.png",
  },
];

const handleSave = (editorContent) => {
  console.log('Saved content:', editorContent);
  // Here you can send the content to a backend server or store it as needed
};

function DocumentCreator({ isOpen, noBar, initialData, customStyles }) {
  return (
    <div className={styles.DocumentContainer}>
      {!noBar ? <DocumentCreatorBar /> : null}
      <div className={styles.DocumentWindow}>
        <EditorComponent
          isOpen={isOpen}
          initialData={initialData}
          customStyles={customStyles}
          onSave={handleSave}
          className={styles.Document}
        />
      </div>
    </div>
  );
}

export default DocumentCreator;

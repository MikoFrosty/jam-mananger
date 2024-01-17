import React from 'react';

import styles from "../../css/DocumentEditor.module.css";
import EditorComponent from './Editor';
import DocumentCreatorBar from './DocumentCreationBar';


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
  }
]

function DocumentCreator({ isOpen }) {
  return (
    <div className={styles.DocumentContainer}>
      <DocumentCreatorBar />
      <div className={styles.DocumentWindow}>
        <EditorComponent className={styles.Document} isOpen={isOpen}/>
      </div>
    </div>
  );
}

export default DocumentCreator;
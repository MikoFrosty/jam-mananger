// src/store.js
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  viewMode:
    localStorage.getItem("lastView") === undefined
      ? "documentation"
      : localStorage.getItem("lastView"),
  refetch: false,
  folderSelectedForDocumentCreation: {},
  documents: [],
  folders: [],
  clients: [],
  client_invitations: [],
  editing_document: {},
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_VIEW":
      return {
        ...state,
        viewMode: action.payload,
      };
    case "TOGGLE_REFETCH":
      return {
        ...state,
        refetch: action.payload,
      };
    case "SELECT_FOLDER":
      return {
        ...state,
        folderSelectedForDocumentCreation: action.payload,
      };
    case "SET_DOCUMENTS":
      return {
        ...state,
        documents: action.payload,
      };
    case "SET_FOLDERS":
      return {
        ...state,
        folders: action.payload,
      };
    case "SET_CLIENTS_AND_INVITATIONS":
      return {
        ...state,
        clients: action.payload.clients,
        client_invitations: action.payload.client_invitations,
      };
    case "ADD_CLIENT":
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };
    case "ADD_FOLDER":
      return {
        ...state,
        folders: [...state.folders, action.payload],
      };
    case "ADD_DOCUMENT": {
      // Destructure documents from current state for clarity
      const { documents } = state;

      console.log("add",documents)
      console.log("add",action.payload)

      // Check if the document being added has a temporary_id and if a document with this temporary_id already exists
      const documentIndex = documents.findIndex(
        (doc) => doc.document_id === action.payload.document_id
      );

      let updatedDocuments = [];

      if (documentIndex !== -1) {
        // A document with the same temporary_id exists, replace it with the new one
        updatedDocuments = [
          ...documents.slice(0, documentIndex),
          action.payload,
          ...documents.slice(documentIndex + 1),
        ];
      } else {
        // This is a new document or an existing document being saved without a temporary_id, add it to the state
        updatedDocuments = [...documents, action.payload];
      }

      return {
        ...state,
        documents: updatedDocuments,
      };
    }
    case "REPLACE_DOCUMENT":
      const { documents } = state;
      const document = action.payload.document;
      const temporary_id = action.payload.temporary_id;

      let updatedDocuments = [];

      const document_index = documents.findIndex(
        (doc) => doc.temporary_id === temporary_id
      );

      if (document_index !== -1) {
        updatedDocuments = [
          ...documents.slice(0, document_index),
          document,
          ...documents.slice(document_index + 1),
        ];
      } else {
        updatedDocuments = documents;
      }

      return {
        ...state,
        documents: updatedDocuments,
      };

    case "SET_EDITING_DOCUMENT":
      return {
        ...state,
        editing_document: action.payload,
      };
    case "REMOVE_DOCUMENT": {
      // Filter out the document to be removed
      const updatedDocuments = state.documents.filter(
        (doc) => doc.document_id !== action.payload.document_id
      );
      return {
        ...state,
        documents: updatedDocuments,
      };
    }
    case "REMOVE_FOLDER": {
      // Filter out the document to be removed
      const updatedFolders = state.folders.filter(
        (folder) => folder.folder_id !== action.payload.folder_id
      );
      return {
        ...state,
        folders: updatedFolders,
      };
    }

    // this needs a rework
    case "UPDATE_DOCUMENT": {
      // Destructure documents from current state for clarity
      const { documents } = state;

      console.log("update",action.payload)
      console.log("update",documents)

      // Check if the document being added has a temporary_id and if a document with this temporary_id already exists
      const documentIndex = documents.findIndex(
        (doc) => doc.document_id === action.payload.document_id
      );

      let updatedDocuments = [];

      if (documentIndex !== -1) {
        // A document with the same temporary_id exists, replace it with the new one
        updatedDocuments = [
          ...documents.slice(0, documentIndex),
          action.payload,
          ...documents.slice(documentIndex + 1),
        ];
      } else {
        // This is a new document or an existing document being saved without a temporary_id, add it to the state
        updatedDocuments = [...documents, action.payload];
      }

      return {
        ...state,
        documents: updatedDocuments,
      };
    }

    default:
      return state;
  }
}

const store = configureStore({
  reducer: {
    app: appReducer, // Wrap your reducer in an object
  },
});

export default store;

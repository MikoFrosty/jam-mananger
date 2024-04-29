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
  clients: null,
  client_invitations: [],
  editing_document: null,
  memberTasks: [],
  organization: null,
  editing_sprint: null,
  editing_task: null,
  sprints: null,
  user: null,
  client_user: null,
  logout: false,
  team: null,
  selectedMember_Tasks: null,
  client_partner: null,
  projects: null,
  invoices: null,
  contracts: null,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_VIEW":
      return {
        ...state,
        viewMode: action.payload,
      };
    case "DELETE_TASKS": {
      // Assuming payload.tasks contains an array of task IDs to delete
      const tasks = action.payload;
      const { memberTasks } = state;

      // Filter out tasks that are not in the list of IDs to delete
      const filteredMemberTasks = memberTasks.filter(
        (task) => !tasks.includes(task.task_id)
      );

      return {
        ...state,
        memberTasks: filteredMemberTasks,
      };
    }
    case "SET_INVOICES": {
      return {
        ...state,
        invoices: action.payload,
      };
    }
    case "SET_CONTRACTS": {
      return {
        ...state,
        contracts: action.payload,
      };
    }
    case "ADD_CONTRACT": {
      const contract = action.payload;
      const { contracts } = state;

      let updated_contracts = [
        ...(contracts ? contracts : []),
        contract
      ]

      return {
        ...state,
        contracts: updated_contracts
      }
    }
    case "REPLACE_CONTRACT": {
      const contract = action.payload;
      console.log(contract)
      const { contracts } = state;

      const filtered_contracts = contracts.filter((thisContract) => thisContract.contract_id !== contract.contract_id);

      let updated_contracts = [
        ...(filtered_contracts ? filtered_contracts : []),
        contract
      ]

      return {
        ...state,
        contracts: updated_contracts
      }
    }
    case "DELETE_PROJECTS": {
      // Assuming payload.tasks contains an array of task IDs to delete
      const projectsToDelete = action.payload;
      const { projects } = state;

      // Filter out tasks that are not in the list of IDs to delete
      const filteredProjects = projects.filter(
        (project) => !projectsToDelete.includes(project.project_id)
      );

      return {
        ...state,
        projects: filteredProjects,
      };
    }
    case "SET_SELECTED_MEMBER_TASKS": {
      return {
        ...state,
        selectedMember_Tasks: action.payload,
      };
    }
    case "SET_EDITING_TASK":
      return {
        ...state,
        editing_task: action.payload,
      };
    case "SET_CLIENT_PARTNERS": {
      return {
        ...state,
        client_partner: action.payload,
      };
    }
    case "CLEAR_EDITING_TASK":
      return {
        ...state,
        editing_task: null,
      };
    case "TOGGLE_REFETCH":
      return {
        ...state,
        refetch: action.payload,
      };
    case "SET_CLIENT_USER": {
      return {
        ...state,
        client_user: action.payload,
      };
    }
    case "SET_LOGOUT":
      return {
        ...state,
        logout: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
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
    case "GET_PROJECTS": {
      return {
        ...state,
        projects: action.payload,
      };
    }
    case "GET_ORGANIZATION":
      return {
        ...state,
        organization: action.payload,
      };
    case "SET_MEMBER_TASKS":
      return {
        ...state,
        memberTasks: action.payload,
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
    case "SET_EDITING_SPRINT":
      return {
        ...state,
        editing_sprint: action.payload,
      };
    case "ADD_DOCUMENT": {
      // Destructure documents from current state for clarity
      const { documents } = state;

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
    case "REPLACE_DOCUMENT": {
      const { documents } = state;
      const document = action.payload.document;
      const temporary_id = action.payload.temporary_id;
      const status = action.payload.status;

      let updatedDocuments = [];

      if (status === "new") {
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
      } else if (status === "old") {
        const document_index = documents.findIndex(
          (doc) => doc.document_id === document.document_id
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
      }

      break;
    }
    case "SET_EDITING_DOCUMENT": {
      return {
        ...state,
        editing_document: action.payload,
      };
    }
    case "REMOVE_DOCUMENT": {
      // Filter out the document to be removed
      const updatedDocuments = state.documents.filter(
        (doc) => doc.document_id !== action.payload
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
    case "SET_SPRINTS": {
      return {
        ...state,
        sprints: action.payload,
      };
    }
    case "UPDATE_MEMBER_TASK_OPTIMISTICALLY": {
      const updatedTasks = state.memberTasks.map((task) =>
        task.task_id === action.payload.taskId
          ? { ...task, ...action.payload.updatedTask }
          : task
      );
      return {
        ...state,
        memberTasks: updatedTasks,
      };
    }
    case "SET_TEAM":
      return {
        ...state,
        team: action.payload,
      };
    case "UPDATE_MEMBER_TASK": {
      const { memberTasks } = state;

      const updating_task = action.payload.task;
      const updating_task_id = action.payload.task_id;

      const existingTaskIndex = memberTasks.findIndex(
        (task) => task.task_id === updating_task_id
      );

      if (existingTaskIndex !== -1) {
        const updatedMemberTasks = [...memberTasks];
        updatedMemberTasks[existingTaskIndex] = updating_task;

        return {
          ...state,
          memberTasks: updatedMemberTasks,
        };
      }

      break;
    }
    case "ADD_MEMBER_TASK": {
      // destructure member tasks
      const { memberTasks } = state;

      console.log(action.payload);

      const existingTaskIndex = memberTasks.findIndex(
        (task) => task.temporary_task_id === action.payload.temporary_task_id
      );

      if (existingTaskIndex !== -1) {
        console.log("task found, replacing");
        const updatedMemberTasks = [...memberTasks];
        updatedMemberTasks[existingTaskIndex] = action.payload;

        console.log("Updated Member Tasks", updatedMemberTasks);

        return {
          ...state,
          memberTasks: updatedMemberTasks,
        };
      } else {
        return {
          ...state,
          memberTasks: [...memberTasks, action.payload],
        };
      }
    }

    case "ADD_MEMBER_PROJECT": {
      // destructure member tasks
      const { projects } = state;

      console.log(action.payload);

      const existingProjectIndex = projects.findIndex(
        (project) =>
          project.temporary_project_id === action.payload.temporary_project_id
      );

      if (existingProjectIndex !== -1) {
        console.log("project found, replacing");
        const updatedProjects = [...projects];
        updatedProjects[existingProjectIndex] = action.payload;

        console.log("Updated Projects", updatedProjects);

        return {
          ...state,
          projects: updatedProjects,
        };
      } else {
        return {
          ...state,
          projects: [...projects, action.payload],
        };
      }
    }

    case "UPDATE_DOCUMENT": {
      // Destructure documents from current state for clarity
      const { documents } = state;

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

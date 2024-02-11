import fetchWrapper from "../../utils/fetchWrapper";

// Action to toggle the view
export function toggleView(viewMode) {
  return {
    type: "TOGGLE_VIEW",
    payload: viewMode,
  };
}

// Action to toggle the refresh
export function toggleRefetch(refetch) {
  return {
    type: "TOGGLE_REFETCH",
    payload: refetch,
  };
}

export function selectFolder(folder) {
  return {
    type: "SELECT_FOLDER",
    payload: folder,
  };
}

export function getOrganization() {
  return async function fetchOrganization(dispatch) {
    try {
      const organization = await fetchWrapper(
        "/organization",
        localStorage.getItem("token"),
        "GET"
      ).then((res) => {
        return res.organization
      });

      dispatch({
        type: "GET_ORGANIZATION",
        payload: organization,
      });
    } catch (error) {
      console.error("Failed to fetch organization", error);
    }
  };
}

export function fetchClients() {
  // This returns a function that takes the `dispatch` method as an argument
  // Redux Thunk middleware will pass `dispatch` to this function
  return async function (dispatch) {
    try {
      const { clients, client_invitations } = await fetchWrapper(
        "/client",
        localStorage.getItem("token"),
        "GET"
      ).then((res) => {
        return {
          clients: res.clients,
          client_invitations: res.client_invitations,
        };
      });

      console.log(clients, client_invitations);
      // Dispatch an action with the fetched data
      dispatch({
        type: "SET_CLIENTS_AND_INVITATIONS",
        payload: { clients, client_invitations },
      });
    } catch (error) {
      console.error("Failed to fetch clients", error);
    }
  };
}

export function fetchDocuments() {
  return async function (dispatch) {
    try {
      const response = await fetchWrapper(
        "/documents",
        localStorage.getItem("token"),
        "GET"
      );
      // Assuming the response from fetchWrapper is the actual data you want to set
      console.log(response);
      dispatch({
        type: "SET_DOCUMENTS",
        payload: response.documents,
      });
    } catch (error) {
      console.error("Error fetching documents:", error);
      // Optionally, dispatch an error action here
    }
  };
}

export function fetchFolders() {
  return async function (dispatch) {
    try {
      const response = await fetchWrapper(
        "/folders",
        localStorage.getItem("token"),
        "GET"
      );
      // Assuming the response from fetchWrapper is the actual data you want to set
      console.log(response);
      dispatch({
        type: "SET_FOLDERS",
        payload: response.folders,
      });
    } catch (error) {
      console.error("Error fetching folders:", error);
      // Optionally, dispatch an error action here
    }
  };
}

export function deleteDocument(document) {
  return async function (dispatch) {
    try {
      const payload = {
        document_id: document.document_id,
      };
      const response = fetchWrapper(
        "/document",
        localStorage.getItem("token"),
        "DELETE",
        { ...payload }
      );
      // Assuming the response from fetchWrapper is the actual data you want to set
      dispatch({
        type: "REMOVE_DOCUMENT",
        payload: document,
      });
    } catch (error) {
      console.error("Error deleting document:", error);
      // Optionally, dispatch an error action here
    }
  };
}

export function deleteFolder(folder) {
  return async function (dispatch) {
    try {
      const payload = {
        folder_id: folder.folder_id,
      };
      const response = fetchWrapper(
        "/folder",
        localStorage.getItem("token"),
        "DELETE",
        { ...payload }
      );
      // Assuming the response from fetchWrapper is the actual data you want to set
      dispatch({
        type: "REMOVE_FOLDER",
        payload: folder,
      });
    } catch (error) {
      console.error("Error deleting folder:", error);
      // Optionally, dispatch an error action here
    }
  };
}

// Action to add a new client
export function addClient(client) {
  return {
    type: "ADD_CLIENT",
    payload: client,
  };
}

// Action to add a new folder
export function addFolder(folder) {
  return {
    type: "ADD_FOLDER",
    payload: folder,
  };
}

// Action to add a new document
export function addDocument(document) {
  return {
    type: "ADD_DOCUMENT",
    payload: document,
  };
}

// Action to update an existing document
export function updateDocument(document) {
  return {
    type: "UPDATE_DOCUMENT",
    payload: document,
  };
}

// Action to replace a temporary document with the one from the server
export const replaceDocument = (temporary_id, document) => ({
  type: "REPLACE_DOCUMENT",
  payload: { temporary_id, document },
});

// Action to remove a temporary document if the save operation fails
export const removeTemporaryDocument = (temporary_id) => ({
  type: "REMOVE_TEMPORARY_DOCUMENT",
  payload: { temporary_id },
});

export function setEditingDocument(document) {
  return {
    type: "SET_EDITING_DOCUMENT",
    payload: document,
  };
}

export function addMemberTask(task) {
  return {
    type: "ADD_MEMBER_TASK",
    payload: task,
  };
}

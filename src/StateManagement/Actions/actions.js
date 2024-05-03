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

export function fetchProjects() {
  return async function (dispatch) {
    try {
      const projects = await fetchWrapper(
        "/projects",
        localStorage.getItem("token"),
        "GET"
      ).then((res) => {
        return res.projects;
      });

      dispatch({
        type: "GET_PROJECTS",
        payload: projects,
      });
    } catch (error) {
      console.error("Failed to fetch organization", error);
    }
  };
}

export function fetchApplications() {
  return async function (dispatch) {
    try {
      const applications = await fetchWrapper(
        "/applications",
        localStorage.getItem("token"),
        "GET"
      ).then((res) => {
        return res.applications;
      });

      dispatch({
        type: "GET_APPLICATIONS",
        payload: applications,
      });
    } catch (error) {
      console.error("Failed to fetch organization", error);
    }
  };
}

export function fetchContracts(type) {
  let contracts = [];

  if (type === "authenticated") {
    return async function (dispatch) {
      try {
        contracts = await fetchWrapper(
          "/contracts-authenticated",
          localStorage.getItem("token"),
          "GET"
        ).then((res) => {
          console.log(res);
          return res.contracts;
        });

        dispatch({
          type: "SET_CONTRACTS",
          payload: contracts,
        });
      } catch (error) {
        console.error("Failed to fetch contracts", error);
      }
    };
  } else {
    return async function (dispatch) {
      try {
        contracts = await fetchWrapper(
          "/contracts",
          "",
          "GET"
        ).then((res) => {
          return res.contracts;
        });
  
        dispatch({
          type: "SET_CONTRACTS",
          payload: contracts,
        });
      } catch (error) {
        console.error("Failed to fetch contracts", error);
      }
    };
  }
}

export function getOrganization() {
  return async function fetchOrganization(dispatch) {
    try {
      const organization = await fetchWrapper(
        "/organization",
        localStorage.getItem("token"),
        "GET"
      ).then((res) => {
        return res.organization;
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

export function fetchClientUser() {
  return async function (dispatch) {
    try {
      const response = await fetchWrapper(
        "/client-user",
        localStorage.getItem("token"),
        "GET"
      );

      dispatch({
        type: "SET_CLIENT_USER",
        payload: response.client_user,
      });
    } catch (error) {
      console.error("Error fetching client user:", error);
      // Optionally, dispatch an error action here
    }
  };
}

export function fetchClientAccount() {
  return async function (dispatch) {
    try {
      const response = await fetchWrapper(
        "/client-account",
        localStorage.getItem("token"),
        "GET"
      );

      console.log(response)

      dispatch({
        type: "SET_CLIENT_USER",
        payload: response.client_account,
      });
    } catch (error) {
      console.error("Error fetching client account:", error);
      // Optionally, dispatch an error action here
    }
  };
}

export function fetchPartners() {
  return async function (dispatch) {
    try {
      const response = await fetchWrapper(
        "/client-partners",
        localStorage.getItem("token"),
        "GET"
      );

      dispatch({
        type: "SET_CLIENT_PARTNERS",
        payload: response.partners[0],
      });
    } catch (error) {
      console.error("Error fetching client partners:", error);
      // Optionally, dispatch an error action here
    }
  };
}

export function fetchClientDocuments() {
  return async function (dispatch) {
    try {
      const response = await fetchWrapper(
        "/client-documents",
        localStorage.getItem("token"),
        "GET"
      );
      // Assuming the response from fetchWrapper is the actual data you want to set
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

export function deleteDocument(document_id) {
  return async function (dispatch) {
    try {
      const payload = {
        document_id,
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
        payload: document_id,
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

// Action to add contract
export function addContract(contract) {
  return {
    type: "ADD_CONTRACT",
    payload: contract
  }
}

export function replaceContract(contract) {
  return {
    type: "REPLACE_CONTRACT",
    payload: contract
  }
}

// Action to update an existing document
export function updateDocument(document) {
  return {
    type: "UPDATE_DOCUMENT",
    payload: document,
  };
}

// Action to replace a temporary document with the one from the server
export const replaceDocument = (temporary_id, status, document) => ({
  type: "REPLACE_DOCUMENT",
  payload: { temporary_id, status, document },
});

// Action to remove a temporary document if the save operation fails
export const removeTemporaryDocument = (temporary_id) => ({
  type: "REMOVE_TEMPORARY_DOCUMENT",
  payload: { temporary_id },
});

export function addMemberTask(task) {
  return {
    type: "ADD_MEMBER_TASK",
    payload: task,
  };
}

export function addMemberProject(project) {
  return {
    type: "ADD_MEMBER_PROJECT",
    payload: project,
  };
}

export function updateMemberTask(payload) {
  return {
    type: "UPDATE_MEMBER_TASK",
    payload: payload,
  };
}

export function setUser(user) {
  return {
    type: "SET_USER",
    payload: user,
  };
}

export function updateMemberTaskOptimistically(taskId, updatedTask) {
  return {
    type: "UPDATE_MEMBER_TASK_OPTIMISTICALLY",
    payload: { taskId, updatedTask },
  };
}

export function getUser() {
  return async function (dispatch) {
    try {
      const response = await fetchWrapper(
        "/user",
        localStorage.getItem("token"),
        "GET"
      );

      if (response.message === "User found") {
        dispatch({
          type: "SET_USER",
          payload: response.user,
        });
      }
    } catch (error) {
      console.error("Could not fetch user:", error);
      // Optionally, dispatch an error action here
    }
  };
}

export function setLogout(bool) {
  return {
    type: "SET_LOGOUT",
    payload: bool,
  };
}

export function setEditingDocument(document) {
  return async function (dispatch) {
    try {
      const res = await fetchWrapper(
        `/documents?doc_id=${document.document_id}`,
        localStorage.getItem("token"),
        "GET"
      );

      dispatch({
        type: "SET_EDITING_DOCUMENT",
        payload: res.documents,
      });
    } catch (error) {
      console.error("Error fetching tasks", error);
      // Optionally, dispatch an error action here
    }
  };
}

export function fetchTasks(payload) {
  return async function (dispatch) {
    try {
      const res = await fetchWrapper(
        "/tasks",
        localStorage.getItem("token"),
        "GET",
        { ...payload }
      );

      // Assuming the response from fetchWrapper is the actual data you want to set
      dispatch({
        type: "SET_MEMBER_TASKS",
        payload: res.tasks,
      });
    } catch (error) {
      console.error("Error fetching tasks", error);
      // Optionally, dispatch an error action here
    }
  };
}

export function updateUser(payload) {
  return async function (dispatch) {
    const response = await fetchWrapper(
      "/user",
      localStorage.getItem("token"),
      "PUT",
      { ...payload }
    );

    if (response.message === "User Updated") {
      dispatch({
        type: "SET_USER",
        payload: response.user,
      });
    }
  };
}

export function fetchTeam() {
  return async function (dispatch) {
    try {
      const response = await fetchWrapper(
        "/team",
        localStorage.getItem("token"),
        "GET"
      );

      dispatch({
        type: "SET_TEAM",
        payload: response.team,
      });
    } catch (error) {
      console.error("Error fetching team data:", error);
      // Optionally, dispatch an error action here
    }
  };
}

export function fetchUserInvoices(type = "expanded", chunk = 15) {
  return async function (dispatch) {
    try {
      const response = await fetchWrapper(
        "/invoices",
        localStorage.getItem("token"),
        "GET",
        {
          type,
          chunk,
        }
      );

      console.log(response);

      dispatch({
        type: "SET_INVOICES",
        payload: response.invoices,
      });
    } catch (error) {
      console.error("Error fetching invoice data:", error);
      // Optionally, dispatch an error action here
    }
  };
}

export function fetchSprints() {
  return async function (dispatch) {
    try {
      const response = await fetchWrapper(
        "/sprints",
        localStorage.getItem("token"),
        "GET"
      );
      dispatch({
        type: "SET_SPRINTS",
        payload: response.sprints,
      });
    } catch (error) {
      console.error("Error fetching sprints:", error);
      // Optionally, dispatch an error action here
    }
  };
}

export function createSprint(payload) {
  return async function (dispatch) {
    try {
      const res = await fetchWrapper(
        "/sprints",
        localStorage.getItem("token"),
        "POST",
        { ...payload }
      );

      dispatch({
        type: "SET_EDITING_SPRINT",
        payload: res.sprint,
      });
    } catch (error) {
      console.error("Error creating sprint:", error);
      // Optionally, dispatch an error action here
    }
  };
}

export function setEditingSprint(sprint) {
  return {
    type: "SET_EDITING_SPRINT",
    payload: sprint,
  };
}

export function setEditingTask(task) {
  return {
    type: "SET_EDITING_TASK",
    payload: task,
  };
}

export function setSelectedMemberTasks(member) {
  return {
    type: "SET_SELECTED_MEMBER_TASKS",
    payload: member,
  };
}

export function deleteTasks(tasks) {
  return {
    type: "DELETE_TASKS",
    payload: tasks,
  };
}

export function deleteProjects(projects) {
  return {
    type: "DELETE_PROJECTS",
    payload: projects,
  };
}

export function setClientUser(client) {
  return {
    type: "SET_CLIENT_USER",
    payload: client,
  };
}

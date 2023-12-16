/**
 *
 * @param {string} url
 * @param {string} token
 * @param {string} method
 * @param {object} payload
 * @returns
 */

const fetchWrapper = async (path, token, method, payload) => {
  const baseUrl = `https://jams-manager-2be71439fdcd.herokuapp.com`;

  // Initialize requestOptions with method and headers
  let requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: method !== "GET" ? JSON.stringify(payload) : null, // Only add body for non-GET requests
  };

  // Automatically add the JWT token to the headers if not a login/signup request
  if (!["/login", "/signup"].includes(path)) {
    requestOptions.headers = {
      ...requestOptions.headers,
      Authorization: `${token}`,
    };
  }

  // Call the native fetch function
  try {
    const response = await fetch(baseUrl + path, requestOptions);
    if (!response.ok) {
      // Handle specific error for invalid token
      if (response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.error("Invalid token, please log in again.");
        throw new Error("Invalid token");
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export default fetchWrapper;

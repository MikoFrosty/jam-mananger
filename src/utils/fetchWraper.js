/**
 *
 * @param {*} url
 * @param {*} options
 * @param {*} token
 * @returns
 */

const fetchWrapper = async (url, token, options = {}) => {
  // Clone the options object
  const requestOptions = { ...options };
  const baseUrl = `https://jams-manager-2be71439fdcd.herokuapp.com/`;

  // Automatically add the JWT token to the headers if not a login/signup request
  if (!["/login", "/signup"].includes(url)) {
    requestOptions.headers = {
      ...requestOptions.headers,
      Authorization: `${token}`,
    };
  }

  // Call the native fetch function
  try {
    const response = await fetch(baseUrl + url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    // TODO: handle invalid token and erase it from local storage along with user data (local)
    console.error("Fetch error:", error);
    throw error;
  }
};

export default fetchWrapper;

const setToken = (apiToken) => {
  localStorage.setItem("API_TOKEN", apiToken);
};

const getToken = () => {
  return localStorage.getItem("API_TOKEN");
};

const clearToken = () => {
  localStorage.removeItem("API_TOKEN");
};

export { setToken, getToken, clearToken };

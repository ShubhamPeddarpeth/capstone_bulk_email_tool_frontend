import axios from "axios";

export const signup = (user) => {
  const { firstName, lastName, email, password } = user;
  return axios
    .post("https://bulk-email-tool-backend-v04p.onrender.com/api/v1/register", {
      firstName,
      lastName,
      email,
      password,
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      if (err.response && err.response.status === 409) {
        throw new Error("User already exists. Please login.");
      } else {
        throw err;
      }
    });
};

export const signin = (email, password) => {
  return axios
    .post("https://bulk-email-tool-backend-v04p.onrender.com/api/v1/login", {
      email,
      password,
    })
    .then(async (res) => {
      saveToken(res.data.token);
      return {
        valid: true,
        status: res.status,
        message: res.data.message,
      };
    })
    .catch((err) => {
      console.error(
        "Error during signin:",
        err.response ? err.response.data : err.message
      );

      return {
        valid: false,
        status: err.response ? err.response.status : 500,
        message: err.response
          ? err.response.data.message
          : "An error occurred during signin",
      };
    });
};

const saveToken = (token) => {
  const data = `Bearer ${token}`;
  window.localStorage.setItem("BulkEmailTool", data);
};

export const getToken = () => {
  return window.localStorage.getItem("BulkEmailTool");
};

export const signout = () => {
  window.localStorage.removeItem("BulkEmailTool");
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("BulkEmailTool")) {
    return true;
  } else {
    return false;
  }
};

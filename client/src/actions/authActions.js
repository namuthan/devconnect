import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

export const registeruser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Login - Get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // save token to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token); // to be used for every subsequent api call
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log("Errors\n" + err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

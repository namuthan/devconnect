import axios from "axios";
import { logoutUser } from "./authActions";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profiles")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create PRofile

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profiles", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err => {
      console.log("ERR\n" + JSON.stringify(err.response.data));
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can not be undone")) {
    axios
      .delete("/api/profiles")
      .then(res => {
        console.log("Clearing current profile");
        dispatch(clearCurrentProfile());
        dispatch(logoutUser());
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

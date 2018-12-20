import axios from "axios";
import { GET_PROFILE, GET_ERRORS, CLEAR_ERRORS } from "./types";

export const getProfile = id => dispatch => {
  axios
    .get(`/api/users/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const saveProfile = (id, profileData, history) => dispatch => {
  axios
    .put(`/api/users/${id}`, profileData)
    .then(
      res =>
        dispatch({
          type: CLEAR_ERRORS,
          payload: null
        }),
      history.push("/dogs")
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

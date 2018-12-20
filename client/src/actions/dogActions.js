import axios from "axios";
import { GET_DOGS, GET_DOG, GET_ERRORS, DELETE_VACCINATION } from "./types";

export const getDogs = () => dispatch => {
  axios
    .get(`/api/dogs`)
    .then(res =>
      dispatch({
        type: GET_DOGS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DOGS,
        payload: {}
      })
    );
};

export const createDogList = (dogData, history) => dispatch => {
  axios
    .post("/api/dogs/new", dogData)
    .then(res => history.push("/dogs"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getDog = id => dispatch => {
  axios
    .get(`/api/dogs/${id}`)
    .then(res =>
      dispatch({
        type: GET_DOG,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DOG,
        payload: {}
      })
    );
};

export const deleteDog = (id, history) => dispatch => {
  axios
    .delete(`/api/dogs/${id}`)
    .then(res => history.push("/dogs"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const addVaccin = (id, vaccinData, history) => dispatch => {
  axios
    .post(`/api/dogs/${id}/vaccination`, vaccinData)
    .then(
      res =>
        dispatch({
          type: GET_DOG,
          payload: res.data
        }),
      history.push(`/dog/${id}`)
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteVaccin = (id, vaccinId) => dispatch => {
  axios
    .delete(`/api/dogs/${id}/vaccination/${vaccinId}`)
    .then(res =>
      dispatch({
        type: DELETE_VACCINATION,
        payload: res.data
      })
    )
    .catch(err => getDog());
};

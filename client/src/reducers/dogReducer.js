import { GET_DOGS, GET_DOG, DELETE_VACCINATION } from "../actions/types";

const initialState = {
  dog: {},
  dogs: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload
      };
    case GET_DOG:
      return {
        ...state,
        dog: action.payload
      };
    case DELETE_VACCINATION:
      return {
        ...state,
        dog: action.payload
      };
    default:
      return state;
  }
};

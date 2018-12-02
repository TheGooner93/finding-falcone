import { GET_ERRORS } from "../actions/types";

const initialState = {
  isErrorbarOpen: false,
  errorText: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        isErrorbarOpen: action.payload ? true : false,
        errorText: action.payload
      };
    default:
      return state;
  }
}

import { GET_API_TOKEN } from "../actions/types";

const initialState = {
  token: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_API_TOKEN:
      return {
        token: action.payload
      };
    default:
      return state;
  }
};

import { UPDATE_SEARCH_TIME } from "../actions/types";

const initialState = {
  totalSearchTime: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_TIME:
      return {
        totalSearchTime: action.payload
      };
    default:
      return state;
  }
};

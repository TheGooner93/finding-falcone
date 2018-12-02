import { GET_ERRORS } from "./types";

export const getErrors = errorMessage => {
  return {
    type: GET_ERRORS,
    payload: errorMessage
  };
};

import axios from "axios";

import { AUTH_TOKEN_URL } from "../config/remoteUrls";
import { GET_API_TOKEN } from "./types";

import { getErrors } from "./errorActions";

export const fetchAuthToken = () => dispatch => {
  axios.defaults.headers.common["Accept"] = "application/json";
  axios
    .post(AUTH_TOKEN_URL)
    .then(res => {
      dispatch({ type: GET_API_TOKEN, payload: res.data.token });
    })
    .catch(err => dispatch(getErrors(err.message)));
};

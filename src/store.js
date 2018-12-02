import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import mainReducer from "./reducers/mainReducer";
import timeReducer from "./reducers/timeReducer";
import errorReducer from "./reducers/errorReducer";

// Combine reducers
const rootReducer = combineReducers({
  authReducer,
  mainReducer,
  timeReducer,
  errorReducer
});

const middleware = applyMiddleware(thunk);

const initialState = {};

//Use compose in case of absence of Redux DevTools
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(middleware)
);

export default store;

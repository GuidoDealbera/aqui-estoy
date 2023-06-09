
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import authReducer from "../Reducer/authReducer";
import ThunkMiddleware from "redux-thunk";
import viewReducer from "../Reducer/viewReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  auth: authReducer,
  view: viewReducer,
});
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(ThunkMiddleware))
);

export default store;

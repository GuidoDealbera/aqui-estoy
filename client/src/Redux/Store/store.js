// import { createStore, applyMiddleware, combineReducers } from "redux";
// import thunk from "redux-thunk";
// import authReducer from "../Reducer/authReducer";

// const rootReducer = combineReducers({
//   auth: authReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import authReducer from "../Reducer/authReducer";
import ThunkMiddleware from "redux-thunk";

//?     DEV TOOLS
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  auth: authReducer,
});

//?      STORE
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(ThunkMiddleware))
);

export default store;

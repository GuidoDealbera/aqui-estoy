<<<<<<< HEAD
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import authReducer from "../Reducer/authReducer";
import ThunkMiddleware from "redux-thunk";
=======
import { applyMiddleware, legacy_createStore as createStore, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "../Reducer/reducer";
>>>>>>> 2ddc6a96a693395985e8212ec04d25073182617c

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

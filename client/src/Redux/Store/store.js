import { createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunk from "redux-thunk";
import authReducer from "../Reducer/authReducer";

const composeEnhancer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
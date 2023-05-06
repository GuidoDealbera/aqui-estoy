import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_ONE_COMPANION,
  GET_ONE_SUPERVISOR,
  PUT_COMPANION,
  PUT_SUPERVISOR,
  POST_ASSIGN_SUPERVISOR_SHIFT,
  POST_ASSIGN_COMPANION_SHIFT,
  SET_LOADING,
} from "../Actions/action-types";
//Acá pongo los GET_ONE y los PUT modificando user;
const initialState = {
  isAuthenticated: JSON.parse(sessionStorage.getItem("user")) ? true : false,
  user: JSON.parse(sessionStorage.getItem("user")) || {},
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      sessionStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };

    case GET_ONE_COMPANION:
      return {
        ...state,
        user: action.payload,
      };
    case GET_ONE_SUPERVISOR:
      return {
        ...state,
        user: action.payload,
      };
    case PUT_COMPANION:
      return {
        ...state,
        user: action.payload,
      };
    case PUT_SUPERVISOR:
      return {
        ...state,
        user: action.payload,
      };
    case "GET_BOTH_ROLES":
      return {
        ...state,
        user: action.payload,
      };
    case POST_ASSIGN_SUPERVISOR_SHIFT:
      return {
        ...state,
      };
    case POST_ASSIGN_COMPANION_SHIFT:
      return {
        ...state,
        user: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return { ...state };
  }
};

export default authReducer;

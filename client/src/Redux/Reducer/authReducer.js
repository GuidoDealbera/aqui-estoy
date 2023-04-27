import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_ONE_COMPANION,
  GET_ONE_SUPERVISOR,
  PUT_COMPANION,
  PUT_SUPERVISOR,
} from "../Actions/action-types";
//Acá pongo los GET_ONE y los PUT modificando user;
const initialState = {
  isAuthenticated: false,
  user: {},
  error: null,
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
      return initialState;

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
        user: { ...user, ...action.payload },
      };
    case PUT_SUPERVISOR:
      return {
        ...state,
        user: { ...user, ...action.payload },
      };
    default:
      return { ...state };
  }
};

export default authReducer;

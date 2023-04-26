
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../Actions/action-types';


const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  console.log(state);
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
    default:
      return {...state};
  }
};

export default authReducer;
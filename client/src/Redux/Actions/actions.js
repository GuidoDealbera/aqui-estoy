
import { LOGIN_FAIL, LOGIN_SUCCESS } from "./action-types";

export const loginSuccess = (userData) => {
  sessionStorage.setItem('user', JSON.stringify(userData))
    return {
      type: LOGIN_SUCCESS,
      payload: userData,
    };
  };
  
  export const loginFail = (error) => {
    return {
      type: LOGIN_FAIL,
      payload: error,
    };
  };
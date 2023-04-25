export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export const loginSuccess = (userData) => {
    return {
      type: "LOGIN_SUCCESS",
      payload: userData,
    };
  };
  
  export const loginFail = (error) => {
    return {
      type: "LOGIN_FAIL",
      payload: error,
    };
  };
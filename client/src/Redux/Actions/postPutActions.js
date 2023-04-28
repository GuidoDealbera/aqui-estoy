import {
  POST_COMPANION,
  POST_SUPERVISOR,
  PUT_COMPANION,
  PUT_SUPERVISOR,
} from "./action-types";
import axios from "axios";

export const postCompanion = (companion) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/postCompanion",
        companion
      );
      dispatch({ type: POST_COMPANION, payload: response.data });
    } catch (error) {
      alert("No se pudo crear el ACOMPAÑANTE");
    }
  };
};

export const postSupervisor = (supervisor) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/postSupervisor",
        supervisor
      );
      dispatch({ type: POST_SUPERVISOR, payload: response.data });
    } catch (error) {
      console.log(error.message);
      alert("No se pudo crear el SUPERVISOR");
    }
  };
};

export const putCompanion = (id, companion) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `http://localhost:3001/putCompanion/${id}`,
        companion
      );
      dispatch({ type: PUT_COMPANION, payload: response.data });
    } catch (error) {
      alert("No se pudo actualizar el ACOMPAÑANTE");
    }
  };
};

export const putSupervisor = (id, supervisor) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `http://localhost:3001/putSupervisor/${id}`,
        supervisor
      );
      dispatch({ type: PUT_SUPERVISOR, payload: response.data });
    } catch (error) {
      alert("No se pudo actualizar el SUPERVISOR");
    }
  };
};

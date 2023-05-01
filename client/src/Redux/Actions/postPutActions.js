import {
  POST_COMPANION,
  POST_SUPERVISOR,
  PUT_COMPANION,
  PUT_SUPERVISOR,
  POST_ASSIGN_SUPERVISOR_SHIFT,
  POST_ASSIGN_COMPANION_SHIFT,
} from "./action-types";
import axios from "axios";

export const postCompanion = (companion) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "/postCompanion",
        companion
      );
      dispatch({ type: POST_COMPANION, payload: response.data });
      alert("ACOMPAÑANTE creado");
    } catch (error) {
      alert("No se pudo crear el ACOMPAÑANTE");
    }
  };
};

export const postSupervisor = (supervisor) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "/postSupervisor",
        supervisor
      );
      dispatch({ type: POST_SUPERVISOR, payload: response.data });
      alert("SUPERVISOR creado");
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
        `/putCompanion/${id}`,
        companion,  {
          headers: {"Content-Type": "application/json"}
      });
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
        `/putSupervisor/${id}`,
        supervisor
      );
      dispatch({ type: PUT_SUPERVISOR, payload: response.data });
    } catch (error) {
      alert("No se pudo actualizar el SUPERVISOR");
    }
  };
};

export const postAssignSupervisorShift = (idSupervisor, idShift)=>{
  return async function(dispatch){
    try{
      const response = (await axios.post(`/postAssignSupervisorShift/${idSupervisor}`, idShift)).data
      dispatch({type:POST_ASSIGN_SUPERVISOR_SHIFT, payload:response})
    }catch(error){
      error.message
    }
  }
}

export const postAssignCompanionShift = (idCompanion, idShift)=>{
  return async function(dispatch){
    try{
      const response = (await axios.post(`/postAssignCompanionShift/${idCompanion}`, idShift)).data
      dispatch({type:POST_ASSIGN_COMPANION_SHIFT, payload:response})
    }catch(error){
      error.message
    }
  }
}

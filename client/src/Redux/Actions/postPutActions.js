import {
  POST_COMPANION,
  POST_SUPERVISOR,
  PUT_COMPANION,
  PUT_SUPERVISOR,
  POST_ASSIGN_SUPERVISOR_SHIFT,
  POST_ASSIGN_COMPANION_SHIFT,
  POST_SUPERVISOR_CHARGE,
} from "./action-types";
import axios from "axios";
import { toast } from "sonner";
import { toastSuccess, toastError } from "./alertStyle";

export const postCompanion = (companion) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/postCompanion", companion);
      dispatch({ type: POST_COMPANION, payload: response.data });
      toast.success("ACOMPAÑANTE creado", toastSuccess);
    } catch (error) {
      toast.error("No se pudo crear el ACOMPAÑANTE", toastError);
    }
  };
};

export const postSupervisor = (supervisor) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/postSupervisor", supervisor);
      dispatch({ type: POST_SUPERVISOR, payload: response.data });
      toast.success("SUPERVISOR creado", toastSuccess);
    } catch (error) {
      console.log(error.message);
      toast.error("No se pudo crear el SUPERVISOR", toastError);
    }
  };
};

export const putCompanion = (id, companion) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/putCompanion/${id}`, companion, {
        headers: { "Content-Type": "application/json" },
      });
      dispatch({ type: PUT_COMPANION, payload: response.data });
    } catch (error) {
      toast.error("No se pudo actualizar el ACOMPAÑANTE", toastError);
    }
  };
};

export const putSupervisor = (id, supervisor) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/putSupervisor/${id}`, supervisor);
      dispatch({ type: PUT_SUPERVISOR, payload: response.data });
    } catch (error) {
      toast.error("No se pudo actualizar el SUPERVISOR", toastError);
    }
  };
};

export const postAssignSupervisorShift = (idSupervisor, idShift, rol) => {
  return async function (dispatch) {
    try {
      const response = (
        await axios.post(`/postAssignSupervisorShift/${idSupervisor}`, {
          idShift,
          rol,
        })
      ).data;
      dispatch({ type: POST_ASSIGN_SUPERVISOR_SHIFT, payload: response });
      alert("Tu turno ha sido confirmado");
    } catch (error) {
      alert("No fue posible asignar el turno");
    }
  };
};

export const postAssignCompanionShift = (idCompanion, idShift, rol) => {
  return async function (dispatch) {
    try {
      const response = (
        await axios.post(`/postAssignCompanionShift/${idCompanion}`, {
          idShift,
          rol,
        })
      ).data;
      dispatch({ type: POST_ASSIGN_COMPANION_SHIFT, payload: response });
      alert("Tu turno ha sido confirmado");
    } catch (error) {
      alert("No fue posible asignar el turno");
    }
  };
};

export const postSupervisorCharge = (idSupervisor, arrayCompanion) =>{
  return async function(dispatch){
    try{  
      const response = (await axios.post(`/postSupervisorCharge/${idSupervisor}`, {arrayCompanion})).data;
      dispatch({type:POST_SUPERVISOR_CHARGE, payload:response})
      alert("El acompañante ha sido correctamente asignado");
    } catch(error){
      alert("No fue posible asignar el acompañante");
    }
  }
}


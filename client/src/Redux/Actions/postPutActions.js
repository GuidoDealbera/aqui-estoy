import {
  POST_COMPANION,
  POST_SUPERVISOR,
  PUT_COMPANION,
  PUT_SUPERVISOR,
  POST_ASSIGN_SUPERVISOR_SHIFT,
  POST_ASSIGN_COMPANION_SHIFT,
  POST_SUPERVISOR_CHARGE,
  PUT_SUPERVISOR_CHARGE,
  POST_EMAIL_ACCOUNT_CREATED,
  DELETE_COMPANION_SHIFT,
  DELETE_SUPERVISOR_SHIFT,
  PUT_COMPANION_EDIT,
  PUT_SUPERVISOR_EDIT,
} from "./action-types";
import axios from "axios";
import { toast } from "sonner";
import { toastSuccess, toastError, toastWarning } from "./alertStyle";
import { setLoading } from "./viewActions";
export const postEmailCreatedAccount = (user) => {
  return async function (dispatch) {
    try {
      await axios.post("/postCreatedAccount", {
        ...user,
        type: "accountCreated",
      });
      dispatch({ type: POST_EMAIL_ACCOUNT_CREATED });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const postCompanion = (companion) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const response = await axios.post("/postCompanion", companion);

      dispatch({ type: POST_COMPANION, payload: response.data });
      dispatch(setLoading(false));
      toast.success("ACOMPAÑANTE creado", toastSuccess);
    } catch (error) {
      toast.error("No se pudo crear el ACOMPAÑANTE", toastError);
    }
  };
};

export const postSupervisor = (supervisor) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const response = await axios.post("/postSupervisor", supervisor);

      dispatch({ type: POST_SUPERVISOR, payload: response.data });
      dispatch(setLoading(false));
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
      dispatch(setLoading(true));
      const response = await axios.put(`/putCompanion/${id}`, companion, {
        headers: { "Content-Type": "application/json" },
      });
      dispatch({ type: PUT_COMPANION, payload: response.data });
      dispatch(setLoading(false));
      sessionStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      toast.error("No se pudo actualizar el ACOMPAÑANTE", toastError);
    }
  };
};

export const putSupervisor = (id, supervisor) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const response = await axios.put(`/putSupervisor/${id}`, supervisor);
      dispatch({ type: PUT_SUPERVISOR, payload: response.data });
      dispatch(setLoading(false));
      sessionStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      toast.error("No se pudo actualizar el SUPERVISOR", toastError);
    }
  };
};
export const addShiftEmail = (user) => {
  return async function (dispatch) {
    await axios.post("./postAddShift", {
      idUser: user.id,
      idShift: user.idShift,
      rol: user.rol,
    });
  };
};

export const deleteShiftEmail = (user) => {
  return async function (dispatch) {
    await axios.post("./postDeleteShift", {
      idUser: user.idUser,
      idShift: user.idShift,
      rol: user.rol,
    });
  };
};

export const postAssignSupervisorShift = (idSupervisor, idShift, rol) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const response = (
        await axios.post(`/postAssignSupervisorShift/${idSupervisor}`, {
          idShift,
          rol,
        })
      ).data;

      dispatch(
        addShiftEmail({
          id: idSupervisor,
          idShift: idShift,
          rol: "Supervisor",
        })
      );
      dispatch({ type: POST_ASSIGN_SUPERVISOR_SHIFT, payload: response });
      dispatch(setLoading(false));
      toast.success("Tu turno ha sido confirmado", toastSuccess);
    } catch (error) {
      toast.error(
        "No fue posible asignar el turno, ha alcanzado el máximo permitido",
        toastError
      );
    }
  };
};

export const postAssignCompanionShift = (idCompanion, idShift, rol) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const response = (
        await axios.post(`/postAssignCompanionShift/${idCompanion}`, {
          idShift,
          rol,
        })
      ).data;

      dispatch(
        addShiftEmail({
          id: idCompanion,
          idShift: idShift,
          rol: "Companion",
        })
      );
      dispatch({ type: POST_ASSIGN_COMPANION_SHIFT, payload: response });
      dispatch(setLoading(false));
      toast.success("Tu turno ha sido confirmado", toastSuccess);
    } catch (error) {
      toast.error("Ya cuentas con un turno asignado", toastError);
    }
  };
};

export const postSupervisorCharge = (idSupervisor, arrayCompanion) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const response = (
        await axios.post(`/postSupervisorCharge/${idSupervisor}`, {
          arrayCompanion,
        })
      ).data;
      dispatch({ type: POST_SUPERVISOR_CHARGE, payload: response });
      dispatch(setLoading(false));
      toast.success(
        "Los acompañantes han sido correctamente asignados",
        toastSuccess
      );
    } catch (error) {
      toast.error("No fue posible asignar los acompañantes", toastError);
    }
  };
};

export const putSupervisorCharge = (idSupervisor, arrayCompanion) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      JSON.stringify(arrayCompanion);
      const response = (
        await axios.put(`/putSupervisorCharge/${idSupervisor}`, {
          arrayCompanion,
        })
      ).data;

      console.log(response);
      dispatch({ type: PUT_SUPERVISOR_CHARGE, payload: response });
      dispatch(setLoading(false));
      toast.success(
        "Los acompañantes han sido eliminados del supervisor",
        toastSuccess
      );
    } catch (error) {
      console.log("Error:", error.message);
      console.log("Response:", error.response);
    }
  };
};

export const deleteCompanionShift = (id, idShift) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const response = (
        await axios.delete("/deleteCompanionShift", {
          data: {
            id: id,
            idShift: idShift,
          },
        })
      ).data;
      console.log(response);
      dispatch(
        deleteShiftEmail({
          idUser: id,
          idShift: idShift,
          rol: "Companion",
        })
      );
      dispatch({ type: DELETE_COMPANION_SHIFT, payload: response });
      dispatch(setLoading(false));
      toast.success("Tu turno ha sido eliminado", toastSuccess);
    } catch (error) {
      toast.error("No fue posible eliminar el turno", toastError);
    }
  };
};

export const deleteSupervisorShift = (id, idShift) => {
  return async function (dispatch) {
    try {
      console.log(id);
      dispatch(setLoading(true));
      const response = (
        await axios.delete("/deleteSupervisorShift", {
          data: {
            id: id,
            idShift: idShift,
          },
        })
      ).data;
      console.log(response);
      dispatch(
        deleteShiftEmail({
          idUser: id,
          idShift: idShift,
          rol: "Supervisor",
        })
      );
      dispatch({ type: DELETE_SUPERVISOR_SHIFT, payload: response });
      dispatch(setLoading(false));

      toast.error("El turno del supervisor ha sido eliminado", toastWarning);
    } catch (error) {
      toast.error(
        "No fue posible eliminar el turno del supervisor",
        toastError
      );
    }
  };
};
export const putCompanionEdit = (id, companion) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const response = await axios.put(`/putCompanion/${id}`, companion, {
        headers: { "Content-Type": "application/json" },
      });
      dispatch({ type: PUT_COMPANION_EDIT, payload: response.data });
      dispatch(setLoading(false));
    } catch (error) {
      toast.error("No se pudo actualizar el ACOMPAÑANTE", toastError);
    }
  };
};

export const putSupervisorEdit = (id, supervisor) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const response = await axios.put(`/putSupervisor/${id}`, supervisor);
      dispatch({ type: PUT_SUPERVISOR_EDIT, payload: response.data });
      dispatch(setLoading(false));
    } catch (error) {
      toast.error("No se pudo actualizar el SUPERVISOR", toastError);
    }
  };
};

export const putUserPassword = (passwordRecoveryInfo, password) => {
  return async function (dispatch) {
    await axios.put("/putUserPassword", {
      typeUser: passwordRecoveryInfo.typeUser,
      email: passwordRecoveryInfo.email,
      password: password,
    });
  };
};

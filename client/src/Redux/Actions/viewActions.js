import {
    LOGOUT,
    GET_ALL_COMPANIONS,
    GET_ALL_SUPERVISORS,
    GET_COMPANIONS_AT_CHARGE,
    GET_ONE_COMPANION,
    GET_ONE_SUPERVISOR,
    GET_ALL_SUPERVISOR_SHIFT,
    GET_ALL_COMPANION_SHIFT,
    GET_ALL_COMPANION_SHIFT_ASSIGN,
    GET_ALL_SUPERVISOR_SHIFT_ASSIGN,
    SET_LOADING,
    GET_USER_BY_ID
} from "./action-types";
import axios from 'axios'
import { toast } from "sonner";
import { toastError } from "./alertStyle";

export const getAllCompanions = () => {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const response = await axios.get('/getCompanion');
            dispatch({ type: GET_ALL_COMPANIONS, payload: response.data })
            dispatch(setLoading(false))
        } catch (error) {
            toast.error('No se pudieron cargar los ACOMPAÑANTES', toastError)
        }
    }
};

export const getAllSupervisors = () => {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const response = await axios.get('/getSupervisor');
            dispatch({ type: GET_ALL_SUPERVISORS, payload: response.data })
            dispatch(setLoading(false))
        } catch (error) {
            toast.error('No se pudieron cargar los SUPERVISORES', toastError)
        }
    }
};

export const getCompanionsAtCharge = (idSupervisor) => {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const response = await axios.get(`/getSupervisorCharge/${idSupervisor}`);
            dispatch({ type: GET_COMPANIONS_AT_CHARGE, payload: response.data })
            dispatch(setLoading(false))
        } catch (error) {
            toast.error('No se pudieron cargar los ACOMPAÑANTES A CARGO', toastError)
        }
    }
};

export const getOneCompanion = (email, password) => {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const response = await axios.post('/getOneCompanion', { email, password },
                {
                    headers: { "Content-Type": "application/json" }
                });
            dispatch({ type: GET_ONE_COMPANION, payload: response.data })
            dispatch(setLoading(false))
        } catch (error) {
            toast.error('No se pudo cargar el ACOMPAÑANTE', toastError)
        }
    }
};

export const getOneSupervisor = (email, password) => {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const response = await axios.post('/getOneSupervisor', { email, password },
                {
                    headers: { "Content-Type": "application/json" }
                });
            dispatch({ type: GET_ONE_SUPERVISOR, payload: response.data })
            dispatch(setLoading(false))
        } catch (error) {
            toast.error('No se pudo cargar el SUPERVISOR', toastError)
        }
    }
};

export const getBothRoles = (email, password) => {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const response = await axios.post('/getBothRoles', { email, password });
            dispatch({ type: "GET_BOTH_ROLES", payload: response.data })
            dispatch(setLoading(false))
        } catch (error) {
            toast.error('No se pudo cargar el USUARIO', toastError)
        }
    }
};

export const setLoading = (isLoading) => {
    return {
        type: SET_LOADING,
        payload: isLoading,
    }
};

export const logOut = () => {
    return {
        type: LOGOUT
    }
};

export const getAllSupervisorShift = () => {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const response = (await axios.get('/getSupervisorShift')).data;
            dispatch({ type: GET_ALL_SUPERVISOR_SHIFT, payload: response })
            dispatch(setLoading(false))
        } catch (error) {
            toast.error('No se pudieron cargar los turnos de SUPERVISORES', toastError)
        }
    }
}
export const getAllCompanionShift = () => {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const response = (await axios.get('/getCompanionShift')).data;
            dispatch({ type: GET_ALL_COMPANION_SHIFT, payload: response })
            dispatch(setLoading(false))
        } catch (error) {
            toast.error('No se pudieron cargar los turnos de ACOMPAÑANTE', toastError)
        }
    }
}
export const getAllSupervisorShiftAssign = () => {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const response = (await axios.get('/getAllSupervisorShift')).data;
            dispatch({ type: GET_ALL_SUPERVISOR_SHIFT_ASSIGN, payload: response })
            dispatch(setLoading(false))
        } catch (error) {
            toast.error('No se pudieron cargar los turnos de SUPERVISORES', toastError)
        }
    }
}

export const getAllCompanionShiftAssign = () => {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const response = (await axios.get('/getAllCompanionShift')).data;
            dispatch({ type: GET_ALL_COMPANION_SHIFT_ASSIGN, payload: response })
            dispatch(setLoading(false))
        } catch (error) {
            toast.error('No se pudieron cargar los turnos de ACOMPAÑANTES', toastError)
        }
    }
}

export const getUserById = (id) => {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const response = (await axios.get(`/getUserById/${id}`)).data;
            dispatch({ type: GET_USER_BY_ID, payload: response })
            dispatch(setLoading(false))
        } catch (error) {
            toast.error('No se pudo cargar el usuario', toastError)
        }
    }
}


import {
  LOGOUT,
  GET_ALL_COMPANIONS,
  GET_ALL_SUPERVISORS,
  GET_COMPANIONS_AT_CHARGE,
  GET_ONE_COMPANION,
  GET_ONE_SUPERVISOR,
} from "./action-types";
import axios from 'axios'

export const getAllCompanions = () => {
    return async function (dispatch){
        try {
            const response = await axios.get('http://localhost:3001/getCompanion');
            dispatch({type: GET_ALL_COMPANIONS, payload: response.data})
        } catch (error) {
            // alert('No se pudieron cargar los ACOMPAÑANTES')
        }
    }
};

export const getAllSupervisors = () => {
    return async function (dispatch){
        try {
            const response = await axios.get('http://localhost:3001/getSupervisor');
            dispatch({type: GET_ALL_SUPERVISORS, payload: response.data})
        } catch (error) {
            // alert('No se pudieron cargar los SUPERVISORES')
        }
    }
};

export const getCompanionsAtCharge = () => {
    return async function (dispatch){
        try {
            const response = await axios.get('http://localhost:3001/(insertar Ruta)');
            dispatch({type: GET_COMPANIONS_AT_CHARGE, payload: response.data})
        } catch (error) {
            // alert('No se pudieron cargar los ACOMPAÑANTES A CARGO')
        }
    }
};

export const getOneCompanion = () => {
    return async function (dispatch){
        try {
            const response = await axios.get('http://localhost:3001/getOneCompanion');
            dispatch({type: GET_ONE_COMPANION, payload: response.data})
        } catch (error) {
            // alert('No se pudo cargar el ACOMPAÑANTE')
        }
    }
};

export const getOneSupervisor = () => {
    return async function (dispatch){
        try {
            const response = await axios.get('http://localhost:3001/getOneSupervisor');
            dispatch({type: GET_ONE_SUPERVISOR, payload: response.data})
        } catch (error) {
            // alert('No se pudo cargar el SUPERVISOR')
        }
    }
}

export const logOut = () => {
   return {
    type: LOGOUT
   }
};
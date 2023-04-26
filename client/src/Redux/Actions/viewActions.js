import {
  LOGOUT,
  GET_ALL_COMPANIONS,
  GET_ALL_SUPERVISORS,
  GET_COMPANIONS_AT_CHARGE,
} from "./action-types";
import axios from 'axios'

export const getAllCompanions = () => {
    return async function (dispatch){
        try {
            const response = await axios.get('http://localhost:3001/getCompanion');
            dispatch({type: GET_ALL_COMPANIONS, payload: response.data})
        } catch (error) {
            alert('No se pudieron cargar los ACOMPAÑANTES')
        }
    }
};

export const getAllSupervisors = () => {
    return async function (dispatch){
        try {
            const response = await axios.get('http://localhost:3001/getSupervisor');
            dispatch({type: GET_ALL_SUPERVISORS, payload: response.data})
        } catch (error) {
            alert('No se pudieron cargar los SUPERVISORES')
        }
    }
};

// export const getCompanionsAtCharge = () => {
//     return async function (dispatch){
//         try {
//             const response = await axios.get('http://localhost:3001/(insertar Ruta)');
//             dispatch({type: GET_COMPANIONS_AT_CHARGE, payload: response.data})
//         } catch (error) {
//             alert('No se pudieron cargar los ACOMPAÑANTES A CARGO')
//         }
//     }
// };

export const logOut = () => {
   return {
    type: LOGOUT
   }
};
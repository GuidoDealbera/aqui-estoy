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
  } from "./action-types";
  import axios from 'axios'
  
  export const getAllCompanions = () => {
      return async function (dispatch){
          try {
              const response = await axios.get('/getCompanion');
              dispatch({type: GET_ALL_COMPANIONS, payload: response.data})
          } catch (error) {
              alert('No se pudieron cargar los ACOMPAÑANTES')
          }
      }
  };
  
  export const getAllSupervisors = () => {
      return async function (dispatch){
          try {
              const response = await axios.get('/getSupervisor');
              dispatch({type: GET_ALL_SUPERVISORS, payload: response.data})
          } catch (error) {
              alert('No se pudieron cargar los SUPERVISORES')
          }
      }
  };
  
  export const getCompanionsAtCharge = (idSupervisor) => {
      return async function (dispatch){
          try {
              const response = await axios.get(`/getSupervisorCharge/${idSupervisor})`);
              dispatch({type: GET_COMPANIONS_AT_CHARGE, payload: response.data})
          } catch (error) {
              alert('No se pudieron cargar los ACOMPAÑANTES A CARGO')
          }
      }
  };
  
  export const getOneCompanion = (email, password) => {
      return async function (dispatch){
          try {
              const response = await axios.post('/getOneCompanion', {email, password},
              {
                  headers: {"Content-Type": "application/json"}
              });
              dispatch({type: GET_ONE_COMPANION, payload: response.data})
          } catch (error) {
              alert('No se pudo cargar el ACOMPAÑANTE')
          }
      }
  };
  
  export const getOneSupervisor = (email, password) => {
      return async function (dispatch){
          try {
              const response = await axios.post('/getOneSupervisor', {email, password},
              {
                  headers: {"Content-Type": "application/json"}
              });
              dispatch({type: GET_ONE_SUPERVISOR, payload: response.data})
          } catch (error) {
              alert('No se pudo cargar el SUPERVISOR')
          }
      }
  };
  
  export const getBothRoles = (email, password) => {
      return async function (dispatch){
          try {
              const response = await axios.post('/getBothRoles', {email, password});
              dispatch({type: "GET_BOTH_ROLES", payload: response.data})
          } catch (error) {
              dispatch({type: "GET_BOTH_ROLES", payload: "No se encontro"})
              alert('No se pudo cargar el USUARIO')
          }
      }
  };
  
  
  
  export const logOut = () => {
     return {
      type: LOGOUT
     }
  };
  
  export const getAllSupervisorShift = ()=>{
      return async function(dispatch){
          try{
              const response = (await axios.get('/getSupervisorShift')).data;
              dispatch({type: GET_ALL_SUPERVISOR_SHIFT, payload:response})
          }catch(error){
              alert('No se pudieron cargar los turnos de SUPERVISORES')
          }
      }
  }
  export const getAllCompanionShift = ()=>{
      return async function(dispatch){
          try{
              const response = (await axios.get('/getCompanionShift')).data;
              dispatch({type: GET_ALL_COMPANION_SHIFT, payload:response})
          }catch(error){
              alert('No se pudieron cargar los turnos de ACOMPAÑANTE')
          }
      }
  }
  export const getAllSupervisorShiftAssign = ()=>{
    return async function(dispatch){
        try{
            const response = (await axios.get('/getAllSupervisorShift')).data;
            dispatch({type: GET_ALL_SUPERVISOR_SHIFT_ASSIGN, payload:response})
        }catch(error){
            alert('No se pudieron cargar los turnos de SUPERVISORES')
        }
    }
}

export const getAllCompanionShiftAssign = ()=>{
    return async function(dispatch){
        try{
            const response = (await axios.get('/getAllCompanionShift')).data;
            dispatch({type: GET_ALL_COMPANION_SHIFT_ASSIGN, payload:response})
        }catch(error){
            alert('No se pudieron cargar los turnos de ACOMPAÑANTES')
        }
    }
}

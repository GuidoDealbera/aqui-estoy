import {
  GET_ALL_COMPANIONS,
  GET_ALL_SUPERVISORS,
  GET_COMPANIONS_AT_CHARGE,
  POST_COMPANION,
  POST_SUPERVISOR,

  GET_ALL_SUPERVISOR_SHIFT,
  GET_ALL_COMPANION_SHIFT,
  GET_ALL_COMPANION_SHIFT_ASSIGN,
  GET_ALL_SUPERVISOR_SHIFT_ASSIGN,
} from "../Actions/action-types";
//Acá van los POST modificando a allCompanions y allSupervisors
const initialState = {
    allCompanions: [],
    allSupervisors: [],
    companionAtCharge: [],
    allSupervisorShift: [],
    allCompanionShift: [],
    allSupervisorShiftAssign : [],
    allCompanionShiftAssign: [],
}
const viewReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case GET_ALL_COMPANIONS:
            return {
                ...state,
                allCompanions: payload,
            }
        case GET_ALL_SUPERVISORS:
            return {
                ...state,
                allSupervisors: payload,
            }
        case GET_COMPANIONS_AT_CHARGE:
            return {
                ...state,
                companionAtCharge: payload
            }
        case POST_COMPANION:
            return{
                ...state,
                allCompanions: [...state.allCompanions, payload]
            }
        case POST_SUPERVISOR:
            return{
                ...state,
                allSupervisors: [...state.allSupervisors, payload]
            }
        case GET_ALL_SUPERVISOR_SHIFT:
            return{
                ...state,
                allSupervisorShift: payload,
            }
        case GET_ALL_COMPANION_SHIFT:
            return{
                ...state,
                allCompanionShift: payload,
            }
        case GET_ALL_SUPERVISOR_SHIFT_ASSIGN:
                return{
                    ...state,
                    allSupervisorShiftAssign: payload,
                }
         case GET_ALL_COMPANION_SHIFT_ASSIGN:
                return{
                    ...state,
                    allCompanionShiftAssign: payload,
                }
                          
        default:
            return {
                ...state
            }
    }

};

export default viewReducer;

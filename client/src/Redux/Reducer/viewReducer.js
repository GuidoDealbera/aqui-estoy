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
    POST_SUPERVISOR_CHARGE,
    GET_USER_BY_ID,
    PUT_SUPERVISOR_CHARGE,
} from "../Actions/action-types";
//Acá van los POST modificando a allCompanions y allSupervisors
const initialState = {
    allCompanions: [],
    allSupervisors: [],
    companionAtCharge: [],
    allSupervisorShift: [],
    allCompanionShift: [],
    allSupervisorShiftAssign: [],
    allCompanionShiftAssign: [],
    viewUser: {}
}
const viewReducer = (state = initialState, { type, payload }) => {
    switch (type) {
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
            return {
                ...state,
                allCompanions: [...state.allCompanions, payload]
            }
        case POST_SUPERVISOR:
            return {
                ...state,
                allSupervisors: [...state.allSupervisors, payload]
            }
        case GET_ALL_SUPERVISOR_SHIFT:
            return {
                ...state,
                allSupervisorShift: payload,
            }
        case GET_ALL_COMPANION_SHIFT:
            return {
                ...state,
                allCompanionShift: payload,
            }
        case GET_ALL_SUPERVISOR_SHIFT_ASSIGN:
            return {
                ...state,
                allSupervisorShiftAssign: payload,
            }
        case GET_ALL_COMPANION_SHIFT_ASSIGN:
            return {
                ...state,
                allCompanionShiftAssign: payload,
            }
        case POST_SUPERVISOR_CHARGE:
            const updatedSupervisorIndex = state.allSupervisors.findIndex(supervisor => supervisor.id === payload.id);
            if (updatedSupervisorIndex !== -1) {
                const updatedSupervisors = [...state.allSupervisors];
                updatedSupervisors[updatedSupervisorIndex] = payload;
                return {
                    ...state,
                    allSupervisors: updatedSupervisors,
                };
            } else {
                return {
                    ...state,
                    allSupervisors: [...state.allSupervisors, payload],
           };
       }
       case PUT_SUPERVISOR_CHARGE:
        const putSupervisorIndex = state.allSupervisors.findIndex(supervisor => supervisor.id === payload.id);
        if (putSupervisorIndex !== -1) {
            const putSupervisors = [...state.allSupervisors];
            putSupervisors[putSupervisorIndex] = payload;
            return {
                ...state,
                allSupervisors: putSupervisors,
            };
        } else {
            return {
                ...state,
                allSupervisors: [...state.allSupervisors],
       };
   }
         case GET_USER_BY_ID:
            return {
                ...state,
                viewUser: payload
            }
        default:
            return {
                ...state
            }
    }

};

export default viewReducer;

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
    PUT_SUPERVISOR_EDIT,
    PUT_COMPANION_EDIT,
    GET_ALL_SUPERVISORS_PER_SHIFT,
    GET_ALL_COMPANIONS_PER_SHIFT,
    DELETE_SUPERVISOR_SHIFT,
    DELETE_COMPANION_SHIFT,
    PUT_COMPANION_SHIFT,
    PUT_SUPERVISOR_SHIFT,
    PUT_SUPERVISOR_SHIFT_RULES,
    PUT_COMPANION_SHIFT_RULES,
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
    viewUser: {},
    supervisorsPerShift: [],
    companionsPerShift: [],
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

        case PUT_SUPERVISOR_EDIT:
            const supervisorIndex = state.allSupervisors.findIndex(supervisor => supervisor.id === payload.id);
            if (supervisorIndex !== -1) {
                const putSupervisors = [...state.allSupervisors];
                putSupervisors[supervisorIndex] = payload;
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

        case PUT_COMPANION_EDIT:
            const companionIndex = state.allCompanions.findIndex(companion => companion.id === payload.id);
            if (companionIndex !== -1) {
                const putCompanions = [...state.allCompanions];
                putCompanions[companionIndex] = payload;
                return {
                    ...state,
                    allCompanions: putCompanions,
                };
            } else {
                return {
                    ...state,
                    allCompanions: [...state.allCompanions],
                };
            }
        case GET_ALL_SUPERVISORS_PER_SHIFT:
            return {
                ...state,
                supervisorsPerShift: payload
            }
        case GET_ALL_COMPANIONS_PER_SHIFT:
            return {
                ...state,
                companionsPerShift: payload
            }
        case DELETE_SUPERVISOR_SHIFT:
            const shiftIndex = state.supervisorsPerShift.findIndex(shift => shift.shiftId === payload.idShift);
            if (shiftIndex !== -1) {
                const updatedShift = {
                    ...state.supervisorsPerShift[shiftIndex],
                    shiftSupervisors: state.supervisorsPerShift[shiftIndex].shiftSupervisors.filter(supervisor => supervisor.id !== action.payload.id)
                };
                const updatedSupervisorsPerShift = [
                    ...state.supervisorsPerShift.slice(0, shiftIndex),
                    updatedShift,
                    ...state.supervisorsPerShift.slice(shiftIndex + 1)
                ];
                return {
                    ...state,
                    supervisorsPerShift: updatedSupervisorsPerShift,

                };
            }
            return state;

        case DELETE_COMPANION_SHIFT:
            const shiftIndex1 = state.companionsPerShift.findIndex(shift => shift.shiftId === payload.idShift);
            if (shiftIndex1 !== -1) {
                const updatedShift = {
                    ...state.companionsPerShift[shiftIndex1],
                    shiftCompanions: state.companionsPerShift[shiftIndex1].shiftCompanions.filter(companion => companion.id !== action.payload.id)
                };
                const updatedCompanionsPerShift = [
                    ...state.companionsPerShift.slice(0, shiftIndex1),
                    updatedShift,
                    ...state.companionsPerShift.slice(shiftIndex1 + 1)
                ];
                return {
                    ...state,
                    companionsPerShift: updatedCompanionsPerShift,

                };
            }
            return state;
        case PUT_COMPANION_SHIFT:
            return {
                ...state,
                companionsPerShift: payload
            }
        case PUT_SUPERVISOR_SHIFT:
            return {
                ...state,
                supervisorsPerShift: payload
            }
            
        case PUT_COMPANION_SHIFT_RULES:
            return {
                ...state,
                companionsPerShift: payload
            }
        case PUT_SUPERVISOR_SHIFT_RULES:
            return {
                ...state,
                supervisorsPerShift: payload
            }
            
        default:
            return {
                ...state
            }
    }

};

export default viewReducer;

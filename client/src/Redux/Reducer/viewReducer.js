import {
  GET_ALL_COMPANIONS,
  GET_ALL_SUPERVISORS,
  GET_COMPANIONS_AT_CHARGE,
} from "../Actions/action-types";

const initialState = {
    allCompanions: [],
    allSupervisors: [],
    companionAtCharge: [],
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
        default:
            return {
                ...state
            }
    }
};

export default viewReducer;

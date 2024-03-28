import { actionTypes } from "./action";

export const initialState = {
    userTimeSheet: [],
    approveTimesheet:[]
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_TIMESHEET:
            return {
                ...state,
                ...{ userTimeSheet: action.payload }
            }
        case actionTypes.APPROVE_TIMESHEET:
        return {
            ...state,
            ...{ approveTimesheet: action.payload }
        }
        default:
            return state;
    }
}

export default reducer;
import { actionTypes } from "./action";


export const initialState = {
    userList:[],
    timesheet:[]
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.USERLIST:
            return {
                ...state,
                ...{userList:action.payload
                 }
            }
        case actionTypes.TIMESHEETS:
            return {
                ...state,
                ...{ timesheet:action.payload }
            };
            default:
            return state;
    };

}
export default reducer;
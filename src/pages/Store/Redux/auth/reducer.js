import { actionTypes } from "./action";


export const initialState = {
    isAuthentification: false,
    rptManager:null,
    usertype: "",
    userDetails: [],
    userId: "",
    token: "",
    profile: "",
    userName: "",
    role: "",
    empId: ""
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                ...{
                    isAuthentification: true, rptManager:action.payload.rptManager, usertype: action.payload.userType, userId: action.payload.userId, userName: action.payload.name, profile: action.payload.profile, role: action.payload.role, token: action.payload.token, empId: action.payload.empId
                }
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                ...{
                    isAuthentification: false,
                    rptManager:null,
                    usertype: "",
                    userDetails: [],
                    userId: "",
                    token: "",
                    profile: "",
                    userName: "",
                    role: "",
                    empId: ""
                }
            };
        case actionTypes.LOGINDETAILS:
            return {
                ...state,
                ...{ userDetails: action.payload }
            };
        case actionTypes.PRACTICEDETAILS:
            return {
                ...state,
                ...{ PracDetails: action.payload }
            };
        case actionTypes.FAV:
            return {
                ...state,
                ...{ favorite: action.payload }
            };
        case actionTypes.TIMESHEETS:
            return {
                ...state,
                ...{ timesheet: action.payload }
            };
        default:
            return state;
    };

}
export default reducer;
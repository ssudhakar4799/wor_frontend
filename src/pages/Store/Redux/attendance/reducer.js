import { actionTypes } from "./action";


export const initialState = {
    allDatas:{},
    checkin_id:"",
    checkin_Time:"",
    checkout_Time:"",
    todayStatus:true,
    checkInAllDatas:[],
    approvedAttendanceData:[],
    leaves:[],
    approvedLeaves:[]
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CHECKIN:
            return {
                ...state,
                ...{ allDatas:action.payload, checkin_Time:action.payload.checkinTime, checkin_id:action.payload._id, todayStatus:action.payload.todayCheck
                 }
            }
        case actionTypes.CHECKOUT:
            return {
                ...state,
                ...{allDatas:action.payload,todayStatus:action.payload.todayCheck, checkout_Time:action.payload.checkOutTime }
            };
        case actionTypes.FETCH_ALL_DATAS:
            return {
                ...state,
                ...{ checkInAllDatas:action.payload }
            }
        case actionTypes.APPROVED_ATTENDANCE:
            return {
                ...state,
                ...{ approvedAttendanceData:action.payload }
            }
        case actionTypes.LIST_OF_LEAVE:
            return {
                ...state,
                ...{ leaves:action.payload }
            }
        case actionTypes.APPROVED_LEAVE:
            return {
                ...state,
                ...{ approvedLeaves:action.payload }
            }    
        default:
        return state;
    };

}
export default reducer;
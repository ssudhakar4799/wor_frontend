
export const actionTypes = {
    CHECKIN: "CHECKIN",
    CHECKOUT:"CHECKOUT",
    FETCH_ALL_DATAS:"FETCH_ALL_DATAS",
    APPROVED_ATTENDANCE:"APPROVED_ATTENDANCE",
    LIST_OF_LEAVE:"LIST_OF_LEAVE",
    APPROVED_LEAVE:"APPROVED_LEAVE"
}
export function checkin(payload) {
    return {type: actionTypes.CHECKIN,payload}
}
export function checkout(payload) {
    return{type:actionTypes.CHECKOUT,payload}
    
}
export function oneUserCheckinAllData(payload) {
    return{type:actionTypes.FETCH_ALL_DATAS,payload}
    
}
export function approvedAttendance(payload) {
    return{type:actionTypes.APPROVED_ATTENDANCE,payload}
    
}

// list of leaves
export function listOfLeaves(payload) {
    return{type:actionTypes.LIST_OF_LEAVE,payload}
}
export function approvedLeave(payload) {
    return{type:actionTypes.APPROVED_LEAVE,payload}
}

export const actionTypes = {
    CHECKIN: "CHECKIN",
    CHECKOUT:"CHECKOUT",
    FETCH_ALL_DATAS:"FETCH_ALL_DATAS",
    APPROVED_ATTENDANCE:"APPROVED_ATTENDANCE"
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

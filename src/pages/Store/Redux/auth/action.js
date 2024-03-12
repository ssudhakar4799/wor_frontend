
export const actionTypes = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    LOGINDETAILS:"LOGINDETAILS",
    PRACTICEDETAILS:"PRACTICEDETAILS",
    FAV:"FAV",
    TIMESHEETS:"TIMESHEETS"
}
export function login(payload) {
    return {type: actionTypes.LOGIN,payload}
}
export function logout (){
    return{
        type:actionTypes.LOGOUT}
}
export function loginData (payload){
    return{type:actionTypes.LOGINDETAILS,payload}
}
export function practiceStoreDetails(payload) {
    return{type:actionTypes.PRACTICEDETAILS,payload}
    
}
export function favorite(payload) {
    return{type:actionTypes.FAV,payload}
    
}
export function timeSheet(payload) {
    return{type:actionTypes.TIMESHEETS,payload}
    
}

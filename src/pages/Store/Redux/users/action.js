
export const actionTypes = {
    USERLIST: "USERLIST",
    TIMESHEETS:"TIMESHEETS"
}
export function userGetData(payload) {
    return {type: actionTypes.USERLIST,payload}
}
export function timeSheet(payload) {
    return{type:actionTypes.TIMESHEETS,payload}
    
}

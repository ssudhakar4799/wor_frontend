export const actionTypes ={
    GET_TIMESHEET : "GET_TIMESHEET",
    APPROVE_TIMESHEET : "APPROVE_TIMESHEET"
}
export function fetchTimesheets (payload){
    return {type:actionTypes.GET_TIMESHEET,payload}
}

export function approvedTimesheet (payload){
    console.log(payload);
    return {type:actionTypes.APPROVE_TIMESHEET,payload}
}
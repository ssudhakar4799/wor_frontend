
export const actionTypes = {
    USERLIST: "USERLIST"
}
export function userGetData(payload) {
    return {type: actionTypes.USERLIST,payload}
}


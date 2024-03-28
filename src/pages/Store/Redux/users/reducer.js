import { actionTypes } from "./action";


export const initialState = {
    userList:[],
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.USERLIST:
            return {
                ...state,
                ...{userList:action.payload
                 }
            }
            default:
            return state;
    };

}
export default reducer;
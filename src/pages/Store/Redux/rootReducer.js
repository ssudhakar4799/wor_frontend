import { combineReducers } from "redux";

import auth from "./auth/reducer"
import userSlice from "./users/reducer"
import attendanceSlice from "./attendance/reducer"
import timeSheetSlice from "./timeSheet/reducer"

export default combineReducers ({
    auth,
    userSlice,
    attendanceSlice,
    timeSheetSlice
});
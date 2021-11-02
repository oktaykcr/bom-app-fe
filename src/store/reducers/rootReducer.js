import { combineReducers } from "redux";
import authReducer from "./authReducer";
import bomRedcuer from "./bomReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    boms: bomRedcuer
})

export default rootReducer
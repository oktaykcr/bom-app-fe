import { combineReducers } from "redux";
import authReducer from "./authReducer";
import bomRedcuer from "./bomReducer";
import componentReducer from "./componentReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    boms: bomRedcuer,
    components:componentReducer
})

export default rootReducer
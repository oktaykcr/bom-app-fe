import { combineReducers } from "redux";
import authReducer from "./authReducer";
import bomRedcuer from "./bomReducer";
import componentReducer from "./componentReducer";
import componentUsedReducer from "./componentUsedReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    boms: bomRedcuer,
    components: componentReducer,
    componentsUsed: componentUsedReducer
})

export default rootReducer
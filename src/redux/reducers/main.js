import { combineReducers } from "redux";
import { cartReducer } from "./reducer";

const rootReducer = combineReducers({
 cartR: cartReducer,
});
export default rootReducer;

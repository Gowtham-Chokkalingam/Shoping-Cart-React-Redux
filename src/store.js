import { legacy_createStore } from "redux";
import rootReducer from "./redux/reducers/main";

const store = legacy_createStore(rootReducer);

export default store;

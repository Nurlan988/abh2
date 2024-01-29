import { createStore } from "redux";
import rootReduser from "./reducers";

export const store = createStore(rootReduser);

export default store;

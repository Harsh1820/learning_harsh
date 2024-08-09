import {createStore, combineReducers} from "redux";
import CountReducer from "../reducers/CountReducer"
import ToDoReducers from "../reducers/ToDoReducers";
let store=createStore(
    combineReducers({count:CountReducer, todos:ToDoReducers}),
);
export default store
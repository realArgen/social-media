import { applyMiddleware, combineReducers, createStore } from "redux";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./auth-reducer";
import thunk from "redux-thunk";
import appReducer from "./app-reducer";

let reducers = combineReducers(
    {
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        usersPage: usersReducer,
        auth: authReducer,
        app: appReducer
    }
);

let store = createStore(reducers, applyMiddleware(thunk));
window.store = store;

export default store;







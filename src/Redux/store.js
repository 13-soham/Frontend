import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./features/userSlice"
import feedReducer from "./features/feedSlice"
import connectionsReducer from "./features/connections"
import pendingReqReducer from "./features/pendingReq"

const store = configureStore({
    reducer : {
        user : userReducer,
        feed : feedReducer,
        connections : connectionsReducer,
        pendingReq : pendingReqReducer
    }
});

export default store;
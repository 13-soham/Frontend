import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./features/userSlice"
import feedReducer from "./features/feedSlice"
import connectionsReducer from "./features/connections"

const store = configureStore({
    reducer : {
        user : userReducer,
        feed : feedReducer,
        connections : connectionsReducer
    }
});

export default store;
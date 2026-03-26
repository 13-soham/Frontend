import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : "feed",
    initialState : null,
    reducers : {
        storeUser : (state, action)=>{
            return action.payload;
        },

        resetFeed : (state, action)=>{
            return null;
        }
    }
});

export const { storeUser, resetFeed } = feedSlice.actions;
export default feedSlice.reducer;
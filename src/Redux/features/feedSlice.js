import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : "feed",
    initialState : null,
    reducers : {
        storeUser : (state, action)=>{
            return action.payload;
        }
    }
});

export const { storeUser } = feedSlice.actions;
export default feedSlice.reducer;
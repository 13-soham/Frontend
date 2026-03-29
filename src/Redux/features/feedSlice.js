import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : "feed",
    initialState : null,
    reducers : {
        storeUser : (state, action)=>{
            return action.payload;
        },

        removeUserFeed : (state, action)=>{
            const newArr = state.filter((elem)=> elem._id != action.payload);
            return newArr;
        },

        resetFeed : (state, action)=>{
            return null;
        }
    }
});

export const { storeUser, resetFeed, removeUserFeed } = feedSlice.actions;
export default feedSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const pendingReqSlice = createSlice({
    name : "pendingReq",
    initialState : null,
    reducers : {
        addReq : (state, action)=>{
            return action.payload;
        },

        removeReq : (state, action)=>{
            const newArr = state.filter((elem)=> elem.senderId._id != action.payload);
            return newArr;
        },

        resetReq : (state, action)=>{
            return null;
        }
    }
});

export const { addReq, removeReq, resetReq } = pendingReqSlice.actions;
export default pendingReqSlice.reducer;
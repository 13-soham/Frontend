import { createSlice } from "@reduxjs/toolkit";

const pendingReqSlice = createSlice({
    name : "pendingReq",
    initialState : null,
    reducers : {
        addReq : (state, action)=>{
            return action.payload;
        }
    }
});

export const { addReq } = pendingReqSlice.actions;
export default pendingReqSlice.reducer;
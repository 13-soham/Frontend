import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name : "connections",
    initialState : [],
    reducers : {
        addConnections : (state, actions)=>{
            return actions.payload;
        },

        deleteConnections : (state, actions)=>{
            return state.filter((elem)=> elem.id !== actions.payload.id)
        },

        removeCollections : ()=>{
            return [];
        }
    }
});


export const { addConnections, deleteConnections, removeCollections } = connectionsSlice.actions;
export default connectionsSlice.reducer;
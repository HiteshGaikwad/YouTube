import { createSlice } from "@reduxjs/toolkit";

const searchQuerrySlice=createSlice({
    name: 'searchQuerry',
    initialState:["popular"],
    reducers:{
        addSearchQuerry:(state,action)=>{
            state.splice(0,1,action.payload);
        }
    }
})
export const {addSearchQuerry}= searchQuerrySlice.actions;

export default searchQuerrySlice.reducer;
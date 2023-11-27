import { createSlice } from "@reduxjs/toolkit";


const watchPageSlice= createSlice({
    name:"watchPage",
    initialState:{},
    reducers:{
        addInfo:(state,action)=>{
            state=Object.assign(state,action.payload);
        }
    }
})
export const {addInfo}= watchPageSlice.actions;

export default watchPageSlice.reducer;
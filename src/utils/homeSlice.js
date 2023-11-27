import { createSlice } from "@reduxjs/toolkit";


const homeSlice= createSlice({
    name: 'home',
    initialState:{
        isOpen:true,
    },
    reducers:{
        isHomeOpen:(state,action)=>{
            state.isOpen=action.payload ;
        }
    }
})
export const {isHomeOpen}= homeSlice.actions;

export default homeSlice.reducer;
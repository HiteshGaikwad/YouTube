import { createSlice } from "@reduxjs/toolkit";

const searchSlice= createSlice({
    name:'search',
    initialState:{
        
    },
    reducers:{
        cacheStore:(state,action)=>{
           state= Object.assign(state, action.payload);
        },

}
})
export  const {cacheStore} = searchSlice.actions;
export default searchSlice.reducer;
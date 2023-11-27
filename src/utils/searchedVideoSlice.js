import { createSlice } from "@reduxjs/toolkit"

const searchedVideoSlice= createSlice({
    name:'searchedVideos',
    initialState:{},
    reducers:{
        searchedVideosCache:(state,action)=>{
            state=Object.assign(state,action.payload);
        }
    }
})

export const {searchedVideosCache}= searchedVideoSlice.actions;
export default searchedVideoSlice.reducer;
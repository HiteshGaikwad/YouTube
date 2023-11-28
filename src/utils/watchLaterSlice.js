import { createSlice } from "@reduxjs/toolkit";

const watchLaterSlice= createSlice({
    name:'watchLater',
    initialState: {
        list:[]
    },
    reducers:{
        addVideos:(state,action)=>{
            for(let i=0; i<state.list.length; i++){
                if(state.list[i].id.videoId===action.payload.id.videoId){
                    state.list.splice(i,1);
                }
            }
            state.list.unshift(action.payload);
        },
        removeVideo:(state,action)=>{
            for(let i=0; i<state.list.length; i++){
                if(state.list[i].id.videoId===action.payload.id.videoId){
                    state.list.splice(i,1);
                }
            }
        }
    }
})
export const {addVideos,removeVideo}= watchLaterSlice.actions;

export default watchLaterSlice.reducer;
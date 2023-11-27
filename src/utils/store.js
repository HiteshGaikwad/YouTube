import { configureStore } from "@reduxjs/toolkit"
import sidebarSlice from "./sidebarSlice";
import searchSlice from "./searchSlice";
import videoSlice from "./videoSlice";
import searchedVideoSlice from "./searchedVideoSlice";
import watchPageSlice from "./watchPageSlice";
import searchQuerrySlice from "./searchQuerrySlice";
import chatSlice from "./chatSlice";
import homeSlice from "./homeSlice";

const store= configureStore({
    reducer:{
        sidebar: sidebarSlice,
        search: searchSlice,
        videos: videoSlice,
        searchedVideos: searchedVideoSlice,
        watchPage: watchPageSlice,
        searchQuerry: searchQuerrySlice,
        chat:chatSlice,
        home: homeSlice,
    },
})

export default store;
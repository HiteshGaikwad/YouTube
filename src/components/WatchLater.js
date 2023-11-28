import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { closeSidebar } from "../utils/sidebarSlice";
import WatchLaterCard from "./WatchLaterCard";


const WatchLater=()=>{

    const videosList= useSelector((store)=>store.watchLater.list);
    // console.log(videosList)
    const dispatch= useDispatch();

    useEffect(()=>{
        dispatch(closeSidebar());
    })


    // early return if watch list is empty
    if(videosList.length===0){
        return (
            <div className="mx-2 my-4 flex flex-col justify-center items-center w-[90vw] sm:absolute sm:left-36 gap-5  h-[89vh]">
                <h1 className="sm:text-3xl font-bold">There are no videos in yout watch list...</h1>
                <Link to={"/"}><button className="sm:text-2xl px-4 py-2 rounded-full bg-slate-300 hover:bg-slate-400 font bold shadow-md shadow-gray-600">Add videos</button></Link>
            </div>
        )
    }

    return (
        <div className="sm:mx-2 sm:my-4 py-2 mx-2 w-[96%] flex sm:w-[90vw]  h-full max-sm:flex-col max-sm:top-2 sm:absolute  sm:left-36 gap-2  sm:h-[89vh] ">

            {/* left container */}
            <div className=" sm:w-1/3 w-full sm:p-3 p-2 flex flex-col sm:gap-8 gap-4 rounded-xl shadow-md shadow-gray-600 bg-gradient-to-b from-slate-400 "> 
            <div className="flex flex-col gap-5">
            <img className="w-full rounded-xl" alt="thumbnail" src={videosList[0].snippet?.thumbnails?.medium?.url}/>
            <h2 className="sm:text-xl text-lg font-bold">Recently added video</h2>
            </div>

            <h1 className="sm:text-3xl text-2xl font-bold">Watch Later</h1>
            <h2 className="sm:text-xl text-lg font-bold">{videosList.length} videos</h2>

            <Link to={"/watch?v="+videosList[0]?.id?.videoId}><button   className="sm:w-2/3 w-40 mx-20 max-sm:mb-5 bg-gradient-to-b from-blue-300 hover:from-blue-500 sm:text-xl text-lg font-bold sm:h-12 h-9 rounded-full shadow-md shadow-blue-500 sm:mx-20 ">Play video</button></Link>
            </div>

              {/* right container */}
            <div className="  sm:w-2/3 w-full flex flex-col sm:gap-3 sm:overflow-y-auto ">
            {
                videosList.map((video)=>{
                    return <WatchLaterCard key={video?.etag} video={video}/>
                })
            }
            </div>
        </div>
    )
}

export default WatchLater;
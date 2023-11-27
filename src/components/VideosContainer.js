import React, { useEffect , useState} from 'react'
import { YOUTUBE_VIDEO_API } from '../utils/constants';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addInfo } from '../utils/watchPageSlice';
import ShimmerEffect from './ShimmerEffect';

function VideosContainer() {

  const [videos, setVideos]= useState([])

  const dispatch= useDispatch();

  const homeOpen= useSelector((store)=>store.home.isOpen);
  
const searchedVideos= useSelector((store)=>store.videos);
  
// console.log(searchedVideos)

  useEffect(()=>{
    loadVideos();
  },[])


  const loadVideos= async()=>{
    const data= await fetch(YOUTUBE_VIDEO_API);
    const json= await data.json();
    // console.log(json.items);
    setVideos(json?.items);
  }

  const dispatchInfo=(video)=>{
    dispatch(addInfo(video));
  }

  return (
    <div className='ml-3 mr-2 max-sm:mt-9 sm:my-12 pt-2 sm:pt-4 sm:grid grid-cols-4 gap-3 h-[80vh] overflow-x-hidden overflow-y-scroll'>
      {

        //searchedVideos not undefined and homeOpen is false thne display searchedVideos else display mostPopularVideos on home page
        searchedVideos[0]!==undefined && !homeOpen
         ?
         searchedVideos[0].map((video)=>{
          return(
             <Link key={video?.etag} to={"watch?v="+video?.id?.videoId} onClick={()=>dispatchInfo(video)} > <VideoCard  info={video}/></Link> 
          )
        }) 
        : 
        ( videos.length===0 ?<ShimmerEffect/>:

        videos.map((video)=>{
          return(
         <Link key={video?.id} to={"watch?v="+video?.id} onClick={()=>dispatchInfo(video)}> <VideoCard  info={video}/></Link>
          )
        })
        )


  }
    </div>
  )
}

export default VideosContainer
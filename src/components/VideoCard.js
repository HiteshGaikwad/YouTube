import React, { useEffect,useState } from 'react'
import {YOUTUBE_CHANNEL_LOGO_URL} from "../utils/constants.js"
import { getNumber } from '../utils/helper.js';

const VideoCard = ({info}) => {

    const [channel, setChannel]= useState(null);
    const videoViewCont= getNumber(info?.statistics?.viewCount);
    const channelViewCount= getNumber(channel?.statistics?.viewCount)


    useEffect(()=>{
        getChannelLogo();
    },[])

    const getChannelLogo= async()=>{
        const data = await fetch(YOUTUBE_CHANNEL_LOGO_URL+info?.snippet?.channelId);
        const json= await data.json();
        // console.log(json.items[0]);
        if(json?.items[0]!==undefined){
        setChannel(json?.items[0]);
        }
    }

  return (
    <div className="flex flex-col gap-1 ">
        <img className='rounded-2xl h-48' alt='thumbnails' src={info?.snippet?.thumbnails?.medium?.url!==undefined?info?.snippet?.thumbnails?.medium?.url:"https://ergonotes.com/wp-content/uploads/2022/11/Find-YouTube-Thumbnail-Source.jpg"}/>
        <div className='flex gap-2 m-2'>
            <div className=' w-12'><img className='w-full border border-black rounded-full' alt='channel logo' src={channel?.snippet?.thumbnails?.medium?.url}/></div>
            <div className='  w-5/6'>
        <div className='flex justify-between items-start'> 
        <h1 className='text-md font-bold overflow-hidden w-full line-clamp-2 '>{info?.snippet?.title }</h1>
        <img className='w-5 h-5 hover' alt='options icon' src='https://static.thenounproject.com/png/1409295-200.png'/></div>
        <h2 className='text-sm font-semibold flex items-center gap-1'>{info?.snippet?.channelTitle}<img className='w-4 h-4' src='https://cdn-icons-png.flaticon.com/512/60/60778.png' alt='verified icon'/></h2>
        <h2 className='text-sm font-semibold'>{!isNaN(videoViewCont)?videoViewCont:channelViewCount} views</h2>
           </div>
        </div>
    </div>
  )
}

export default VideoCard


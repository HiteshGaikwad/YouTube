import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { closeSidebar } from '../utils/sidebarSlice';
import { YOUTUBE_CHANNEL_LOGO_URL, YOUTUBE_COMMENTS_API } from '../utils/constants';
import SuggestionVideos from './SuggestionVideos';
import {getNumber,getMonth} from "../utils/helper";
import Comment from './Comment';
import { addVideos } from '../utils/watchLaterSlice';

export default function WatchPage() {

  const dispatch= useDispatch();

  const [videoId]= useSearchParams();
  const videoInfo= useSelector((store)=>store.watchPage);

  const [channelInfo, setChannelInfo]= useState(null);
  const [isDescriptionOpen, setIsDescriptionOpen]= useState(false);
  const [allComments, setAllComments]=useState([]);
  const [isCommentsOpen,setIsCommentsOpen]=useState(false);
  const [isOptionsOpen, setIsOptionsOpen]= useState(false);


  const views= getNumber(videoInfo?.statistics?.viewCount);
  const subscribers= getNumber(channelInfo?.statistics?.subscriberCount);
  const likeCount= getNumber(videoInfo?.statistics?.likeCount);

  const publishedDate= videoInfo?.snippet?.publishedAt.slice(0,10);
  const year=publishedDate!==undefined?publishedDate.split("-")[0]:"";
  const month=publishedDate!==undefined?getMonth(publishedDate.split("-")[1]):";"
  const day=publishedDate!==undefined?publishedDate.split("-")[2]:"";

  
    useEffect(()=>{
        getChannelInfo();
        getComments();
    },[videoId])

    const getChannelInfo= async()=>{
        const data = await fetch(YOUTUBE_CHANNEL_LOGO_URL+videoInfo?.snippet?.channelId);
        const json= await data.json();
        // console.log(json.items[0]);
        setChannelInfo(json?.items[0]);
    }


    const getComments =async()=>{
      const data= await fetch(YOUTUBE_COMMENTS_API+ videoId.get("v"));
      const json= await data.json();
      // console.log(json.items);
      setAllComments(json?.items);
    }


  // console.log(videoInfo)

  useEffect(()=>{
    dispatch(closeSidebar());
  },[])

    

  return (
    <div className='sm:my-3 max-sm:m-2 sm:mr-1 sm:ml-20 w-[96%] sm:w-[92vw] h-screen overflow-x-hidden sm:grid grid-flow-col max-sm:flex flex-col  sm:gap-4 sm:absolute sm:left-8 overflow-auto'>  
    <div className=' '>

      {/* video iframe and info */}
    <div className='flex  flex-col gap-3 '>
      {/* for small devices */}
    <iframe className=' rounded-md w-full sm:w-[950px] sm:h-[550px] h-60 ' src={"https://www.youtube.com/embed/"+videoId.get("v")+"?autoplay=1"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

    {/* video info and buttons*/}
    <div className='flex flex-col sm:w-[950px] w-full gap-2'>
      <h1 className='sm:text-xl text-lg font-bold'>{videoInfo?.snippet?.title===undefined?"Video title":videoInfo?.snippet?.title}</h1>
      <div className='flex max-sm:flex-col max-sm:gap-3 sm:justify-between'>

        {/* channel details */}
        <div className='flex items-center max-sm:justify-between gap-4'>
        <img className='border border-black sm:w-12 w-8 rounded-full' src={channelInfo?.snippet?.thumbnails?.high?.url===undefined?"https://cdn-icons-png.flaticon.com/512/552/552721.png":channelInfo?.snippet?.thumbnails?.high?.url} alt='channel logo'></img>
        
        <div className='flex sm:flex-col max-sm:gap-2 items-center'>
          <h2 className='sm:text-lg text-sm font-bold'>{videoInfo?.snippet?.channelTitle===undefined?"Channel Name":videoInfo?.snippet?.channelTitle}</h2>
          <h3 className='max-sm:text-xs'>{channelInfo?.statistics?.subscriberCount===undefined?"XX":subscribers} subscribers</h3>
        </div>
        <button className='border border-black w-20 h-8  sm:w-32 sm:h-12 bg-black text-white rounded-full text-sm sm:text-lg font-semibold'>Subscribe</button>
        </div>

        <div className='flex max-sm:mx-3 sm:gap-3 max-sm:justify-between items-center'>

          {/* like and dislike buttons */}
        <div className='flex  '>
          <button className='hover:bg-slate-300 flex items-center text-sm sm:text-lg font-semibold px-1 sm:px-2 rounded-l-full shadow-sm shadow-gray-600 w-fit h-8 sm:h-10'><img className='sm:w-10 w-7 h-7 mix-blend-darken sm:h-10 rounded-full' alt='like icon' src='https://i.pinimg.com/originals/57/f2/8c/57f28c11787da528c258cfcaef1ac2ee.png'/>{isNaN(likeCount)?"":likeCount}</button>

          <button className='hover:bg-slate-300 shadow-sm shadow-gray-600 px-2 rounded-r-full w-fit h-8 sm:h-10'><img className='sm:w-7 sm:h-7 w-5 h-5 mix-blend-darken' alt='dislike icon' src='https://png.pngtree.com/element_our/png/20181227/dislike-glyph-black-icon-png_291835.jpg'/></button>
        </div>

        <button className='hover:bg-slate-300 shadow-sm shadow-gray-600 flex items-center gap-1 sm:gap-2 text-xs sm:text-md font-bold h-8 sm:h-10 px-2 w-fit rounded-full'><img className='sm:w-5 w-3 h-3 sm:h-5' alt='share icon' src='https://cdn-icons-png.flaticon.com/512/6469/6469436.png'/> Share</button>

        <button className='hover:bg-slate-300 shadow-sm shadow-gray-600 flex items-center gap-1 sm:gap-2 text-xs sm:text-md font-bold h-8 sm:h-10 px-2 w-fit rounded-full'><img className='sm:w-5 w-3 h-3 sm:h-5 mix-blend-darken' alt='downloads icon' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFGYn5CXRz5AUcZXQUTMpWnRnGmW5egqz9rlJoHyvb6lAC1Zw0bU7gKDJOfXVZ0Kv9P08&usqp=CAU'/> Download</button>

        
        <div onClick={()=> setIsOptionsOpen(!isOptionsOpen)} className='relative'>
        <button className='hover:bg-slate-300 shadow-sm shadow-gray-600 h-9 px-1 w-fit rounded-full'>
          <img className='w-6 h-6' alt='menu icon' src='https://static.thenounproject.com/png/384290-200.png'/></button>
           {isOptionsOpen && <div className='absolute top-11 right-0 sm:w-60 w-44 h-28 sm:h-40 sm:p-2 p-1 bg-slate-300 shadow-md  shadow-gray-500 rounded-xl'> <span className='absolute -top-2 right-2 w-5 h-5 bg-slate-300 rotate-45 '></span>
              <ul className='sm:text-lg text-sm font-bold flex flex-col gap-1'>
                <li onClick={()=>dispatch(addVideos(videoInfo))} className='w-fit flex gap-2 hover:bg-slate-400 rounded-full sm:px-2 py-1'>
                    <img className='sm:w-6 w-5' alt='watch later icon' src='https://static.thenounproject.com/png/4970870-200.png'/>
                    Save to watch later</li>
              </ul>
            </div>}
            </div>
        </div>
      </div>
    </div>
    </div>

    {/* video details */}
    <div className='my-3 px-3 py-2 w-full sm:w-[950px] bg-slate-600 text-white border border-black rounded-lg sm:rounded-xl'>
      <div className='flex gap-5 my-1'>
        <h2 className='text-sm sm:text-lg font-semibold'>{videoInfo?.statistics?.viewCount===undefined?"XX":views} views</h2>
        <h2 className='text-sm sm:text-lg font-semibold'>{publishedDate===undefined?"":`${month} ${day} ${year}`}</h2>
      </div>
      <div>
        { (!isDescriptionOpen)? <><span className='w-full max-sm:text-sm line-clamp-2 overflow-hidden'>{videoInfo?.snippet?.description} </span><button className='mx-2 text-sm sm:text-lg font-bold text-black' onClick={()=>setIsDescriptionOpen(true)}>show more</button> </>:
        <span className='w-full max-sm:text-sm'>{videoInfo?.snippet?.description} <button className='mx-2 text-sm sm:text-lg font-bold text-black' onClick={()=>setIsDescriptionOpen(false)}>show less</button></span>
        } 
      </div>
    </div>

    {/* comments */}
    <div className='w-full sm:w-[950px]'>
      <h1 className='sm:text-2xl text-xl pb-3 font-bold border-b-2 border-b-black' onClick={()=>setIsCommentsOpen(!isCommentsOpen)}>{allComments?.length} Comments</h1>
      <div className={isCommentsOpen?'max-sm:block':'max-sm:hidden'}>
      {
        allComments?.map((comment)=>{
          return <Comment key={comment?.id} comment={comment}/>
        })
      }
      </div>
    </div>
    </div>

    <div className='sm:col-span-11'>
     <SuggestionVideos />
    </div>
    </div>
  )
}

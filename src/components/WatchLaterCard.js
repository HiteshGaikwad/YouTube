
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { removeVideo } from '../utils/watchLaterSlice';
import { Link } from 'react-router-dom';
import { addInfo } from '../utils/watchPageSlice';

const WatchLaterCard = ({video}) => {

  const [isOptionsOpen, setIsOptionsOpen]= useState(false);

  const dispatch= useDispatch();

  return (
    <div className='flex max-sm:pb-1 max-sm:my-2 gap-1 shadow-lg shadow-gray-300 rounded-xl'>
      <Link className="hover:bg-gradient-to-r from-slate-300 w-11/12 sm:w-10/12" key={video?.etag} onClick={()=>dispatch(addInfo(video))} to={"/watch?v="+video?.id?.videoId}>
      <div className=' w-full flex'>
            <img className='sm:w-80 w-40 h-28 sm:h-48 rounded-xl' alt='thumbnail' src={video?.snippet?.thumbnails?.high?.url}/>
           
             <div className='flex flex-col overflow-hidden w-full line-clamp-2 gap-2 m-1'>
            <h1 className='sm:text-xl text-md font-semibold sm:font-bold max-sm:overflow-hidden max-sm:w-full max-sm:line-clamp-2 '>{video?.snippet?.title===undefined?"Video title":video?.snippet?.title}</h1>
            <h2 className='sm:text-sm text-xs font-semibold flex items-center gap-1'>{video?.snippet?.channelTitle===undefined?"Channel name":video?.snippet?.channelTitle} <img className='w-4 h-4' src='https://cdn-icons-png.flaticon.com/512/60/60778.png' alt='verified icon'/></h2>
        </div>
        </div>
      </Link> 
        {/* options container */}
        <div onClick={()=> {setIsOptionsOpen(!isOptionsOpen)}}  className='relative'>
        <button className='hover:bg-slate-300 shadow-sm shadow-gray-600 rounded-xl h-9 px-1 w-fit'><img className='w-5 h-5 sm:pb-1 mt-2' alt='options icon' src='https://static.thenounproject.com/png/1409295-200.png'/></button>

           {isOptionsOpen && <div className='absolute top-11 z-50 right-0 sm:w-72 w-52 h-28 sm:h-40 p-2 bg-slate-300 shadow-md shadow-gray-500 sm:rounded-xl rounded-lg'> <span className='absolute -top-2 right-2 w-5 h-5 bg-slate-300 rotate-45 '></span>
              <ul className='sm:text-lg text-sm font-bold flex flex-col gap-1'>
                <li onClick={()=>dispatch(removeVideo(video))} className='w-fit flex gap-2 hover:bg-slate-400 rounded-full sm:px-2 py-1'>
                    <img className='sm:w-6 w-4' alt='watch later icon' src='https://static.thenounproject.com/png/4970870-200.png'/>
                    Remove from watch later</li>
              </ul>
            </div>}
            </div>
        
    </div>
  )
}

export default WatchLaterCard;
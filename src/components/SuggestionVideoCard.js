
import React from 'react'

const SuggestionVideoCard = ({video}) => {
  return (
    <div className='flex max-sm:pb-1 max-sm:my-2 gap-1 max-sm:flex-col  shadow-lg shadow-gray-300 rounded-xl'>
            <img className='sm:w-48 w-full h-48 sm:h-28 rounded-xl' alt='thumbnail' src={video?.snippet?.thumbnails?.medium?.url}/>
        <div className='flex flex-col gap-2 m-1'>
            <h1 className='text-md font-bold overflow-hidden w-full line-clamp-2'>{video?.snippet?.title===undefined?"Video title":video?.snippet?.title}</h1>
            <h2 className='text-sm font-semibold flex items-center gap-1'>{video?.snippet?.channelTitle===undefined?"Channel name":video?.snippet?.channelTitle} <img className='w-4 h-4' src='https://cdn-icons-png.flaticon.com/512/60/60778.png' alt='verified icon'/></h2>
        </div>
    </div>
  )
}

export default SuggestionVideoCard
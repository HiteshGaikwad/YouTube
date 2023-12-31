
import React,{useEffect, useState} from 'react'
import { YOUTUBE_VIDEOS_SEARCH_API } from '../utils/constants';
import SuggestionVideoCard from './SuggestionVideoCard';
import { useDispatch, useSelector } from 'react-redux';

const SuggestionVideos = () => {

    const dispatch= useDispatch();

    const tag= useSelector((store)=>store.searchQuerry);

    const [suggestions, setSuggestions] = useState([]);

    useEffect(()=>{
        getSuggestedVideos();
    },[])

    const getSuggestedVideos= async()=>{
        const data= await fetch(YOUTUBE_VIDEOS_SEARCH_API+tag[0]);
        const json= await data.json();
        // console.log(json.items);
        setSuggestions(json?.items);
    }

  return (
    <div className='flex flex-col max-sm:my-2 gap-2'>
        {
            suggestions?.map((video)=>{
                return <SuggestionVideoCard key={video?.id?.videoId}  video={video}/>
            })
        }
    </div>
  )
}

export default SuggestionVideos
 


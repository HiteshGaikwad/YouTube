import React,{useRef, useState} from 'react'
import Button from './Button';
import { Link } from 'react-router-dom';
import {BUTTONS, YOUTUBE_VIDEOS_SEARCH_API} from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux';
import { addSearchQuerry } from '../utils/searchQuerrySlice';
import { addVideos } from '../utils/videoSlice';
import { searchedVideosCache } from '../utils/searchedVideoSlice';
import { isHomeOpen } from '../utils/homeSlice';


function ButtonList() {

  const scrollContainerRef = useRef(null);
  const [selectedCategory,setSelectedCategory]= useState("");

  const scrollLeft = () => {
    scrollContainerRef.current.scrollLeft -= 100; // Adjust the scroll distance as needed
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollLeft += 100; // Adjust the scroll distance as needed
  };

  const dispatch= useDispatch();
  const searchedVideos= useSelector((store)=>store.searchedVideos);

  const handleButtons= async(querry)=>{
    dispatch(addSearchQuerry(querry));
    setSelectedCategory(querry);
  
    //if videos of this searchQuerry is already in cache then dispatch else make API call
    if(searchedVideos[querry]){
      dispatch(addVideos(searchedVideos[querry]));
    }else{
    const data= await fetch(YOUTUBE_VIDEOS_SEARCH_API+querry);
    const json= await data.json();
    // console.log(json.items)
    
    //dispatching an action to store the search videos
    dispatch(addVideos(json?.items));
  
    //dispatching an action to store the searched videos cache
    dispatch(searchedVideosCache({
      [querry]:json?.items
    }));
    }
    dispatch(isHomeOpen(false));
  }


  return (
    <div className='grid grid-flow-col gap-3 bg-slate-200 rounded-lg items-center sm:mx-3 my-5 absolute -top-6 pt-1'>
      <button className='hover:bg-gray-700 sm:h-fit sm:w-fit text-md  sm:text-2xl font-bold sm:mx-2 mx-1 sm:px-3 px-2 sm:py-1 max-sm:pb-1  rounded-full bg-gray-500 text-white cursor-pointer'  onClick={scrollLeft}> &lt; </button>

      <div className='flex w-[100%] px-2 overflow-x-hidden py-2 rounded-xl' ref={scrollContainerRef}>
        {BUTTONS.map((button) => (
          <Link to={"/"} key={button} onClick={()=> handleButtons(button)}><Button category={selectedCategory} name={button} /></Link>
        ))}
      </div>

      <button className='hover:bg-gray-700 sm:h-fit sm:w-fit text-md  sm:text-2xl font-bold sm:mx-2 mx-1 sm:px-3 px-2 sm:py-1 max-sm:pb-1  rounded-full bg-gray-500 text-white cursor-pointer'  onClick={scrollRight}> &gt; </button>
    </div>
  )
}

export default ButtonList
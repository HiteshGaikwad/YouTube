import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {toggleSidebar} from "../utils/sidebarSlice"
import { YOUTUBE_SEARCH_SUGGESTION_API,YOUTUBE_VIDEOS_SEARCH_API } from '../utils/constants';
import { cacheStore } from '../utils/searchSlice';
import { addVideos } from '../utils/videoSlice';
import { searchedVideosCache } from '../utils/searchedVideoSlice';
import { addSearchQuerry } from '../utils/searchQuerrySlice';
import { isHomeOpen } from '../utils/homeSlice';

function Header() {

  const [searchQuerry, setSearchQuerry]= useState("");
  const [searchSuggestions, setSearchSuggestions]= useState([]);
  const [isSuggesionsOpen, setIsSuggestionsOpen]= useState(false);

  const dispatch= useDispatch();

const toggleSideBar=()=>{
  dispatch(toggleSidebar());
}


const cache= useSelector((store)=>store.search);
const searchedVideos= useSelector((store)=>store.searchedVideos);
// const category= useSelector((store)=>store.category);

useEffect(()=>{

  //debouncing 
 const timer= setTimeout(()=>{
  if(cache[searchQuerry]){
    setSearchSuggestions(cache[searchQuerry]);
  }else{
  getSearchSuggestions();
 }
},200);
  
 return ()=>{
  clearTimeout(timer);
 }
},[searchQuerry]);



const getFilterVideos= async(searchQuerry)=>{
  dispatch(addSearchQuerry(searchQuerry));

  //if videos of this searchQuerry is already in cache then dispatch else make API call
  if(searchedVideos[searchQuerry]){
    dispatch(addVideos(searchedVideos[searchQuerry]));
  }else{
  const data= await fetch(YOUTUBE_VIDEOS_SEARCH_API+searchQuerry);
  const json= await data.json();
  // console.log(json.items)
  
  //dispatching an action to store the search videos
  dispatch(addVideos(json?.items));

  //dispatching an action to store the searched videos cache
  dispatch(searchedVideosCache({
    [searchQuerry]:json?.items
  }));
  }
  //once click on search button make isHomeOpen false so to display searched videos
  dispatch(isHomeOpen(false));
}

const getSearchSuggestions= async ()=>{
  const data= await fetch(YOUTUBE_SEARCH_SUGGESTION_API+searchQuerry);
  const json= await data.json();
  // console.log(json[1]);
  setSearchSuggestions(json[1]);

  dispatch(cacheStore({
    [searchQuerry]:json[1],
  }))
}
// console.log(searchQuerry);

  return (
    <div className='sticky top-0 z-50 border border-black bg-white grid grid-flow-col px-4 max-sm:pl-2 max-sm:pr-4 shadow-md shadow-gray-500 py-4  '>

      {/* menu icon & logo */}
      <div className='flex max-sm:w-fit sm:col-span-1 '>
        <img onClick={()=>{toggleSideBar()}} className='h-10 cursor-pointer max-sm:hidden' alt='menu logo' src='https://cdn.iconscout.com/icon/free/png-256/free-hamburger-menu-462145.png?f=webp'/>

        <img className='h-10 px-4 mix-blend-darken max-sm:h-8' alt='youtube logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/2560px-Logo_of_YouTube_%282015-2017%29.svg.png'/>
         </div>

         {/* search input button */}
      <div className=' sm:col-span-10  justify-center flex items-center relative'>

        <input value={searchQuerry} onChange={(e)=>setSearchQuerry(e.target.value)} onFocus={()=>setIsSuggestionsOpen(true)} className='w-2/4 max-sm:w-full max-sm:h-8 px-2 sm:px-4 py-2 max-sm:text-xs max-sm:font-bold font-semibold max-sm:placeholder:text-sm border border-black outline-blue-500 rounded-l-full' placeholder='Search'/> { searchQuerry!==""? <button onClick={()=>setSearchQuerry("")} className='absolute sm:right-80 right-12 sm:bg-slate-400 sm:p-1 rounded-full max-sm:text-[10px]'>❌</button>:""}

        <button onClick={()=>{getFilterVideos(searchQuerry);setIsSuggestionsOpen(false)}} className='w-12 max-sm:h-8 py-2 px-3 max-sm:px-2 max-sm:py-2 rounded-r-full border border-gray-500 bg-gray-200'><img className='h-6 max-sm:h-4 max-sm:w-4' alt='search icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png'/></button>

        {
          isSuggesionsOpen && <div className='bg-white w-full sm:w-2/4  rounded-xl shadow-lg shadow-gray-600 px-5 mx-1 absolute sm:left-64 top-8 sm:top-11'>
          <ul>
            {searchSuggestions.map((inputText)=>
              <li onClick={()=>{setSearchQuerry(inputText); setIsSuggestionsOpen(false) ;getFilterVideos(searchQuerry); }} key={inputText} className='hover:bg-gray-200 hover:rounded-lg p-1 sm:my-2 flex items-center text-sm sm:text-lg font-semibold gap-2'><img className='h-4 sm:h-5' alt='search icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png'/> {inputText}</li>
            )}
          </ul>
        </div>
        }
      </div>

      {/* user logo */}
      <div className=' sm:col-span-1 max-sm:hidden'>
      <img className='h-10' alt='user logo' src='https://cdn-icons-png.flaticon.com/512/552/552721.png'/>
      </div>
    </div>
  )
}

export default Header
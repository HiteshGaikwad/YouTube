import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import { addSearchQuerry } from '../utils/searchQuerrySlice';
import { isHomeOpen } from '../utils/homeSlice';
import { HOME_ICON_URL, LIVE_ICON_URL, SUBSCRIPTION_ICON_URL, TRENDING_ICON_URL,SHOPPING_ICON_URL, MUSIC_ICON_URL, MOVIES_ICON_URL, SHORTS_ICON_URL, GAMING_ICON_URL, NEWS_ICON_URL, SPORTS_ICON_URL, LEARNINGS_ICON_URL, FASHION_ICON_URL, PODCASTS_ICON_URL, CHANNEL_ICON_URL, HISTORY_ICON_URL, YOURVIDEOS_ICON_URL, WATCHLATER_ICON_URL } from '../utils/sidebarConstants';
import { searchedVideosCache } from '../utils/searchedVideoSlice';
import { addVideos } from '../utils/videoSlice';
import { YOUTUBE_VIDEOS_SEARCH_API } from '../utils/constants';


function Sidebar() {

  const dispatch= useDispatch();

  const [selectedCategory, setSelectedCategory]= useState("");
  const [isLive, setIsLive]= useState(false);

const isOpen= useSelector((store)=> store.sidebar.isSidebarOpen);
const searchedVideos= useSelector((store)=>store.searchedVideos);
const homeOpen= useSelector((store)=>store.home.isOpen);
const watchLaterCount= useSelector((store)=>store.watchLater.list);
// console.log(searchQuerry)


const handleHomeOpen=()=>{
  //dispatch isHomeOpen true so on click of Home tab it should display popularVideos as home page
  dispatch(isHomeOpen(true));
  setIsLive(false);
}

//displaying videos on the home page depending on the clicked category
const handleCategory= async(querry)=>{
  dispatch(addSearchQuerry(querry));
  setSelectedCategory(querry);
  setIsLive(false);
  // console.log(querry)

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
    <>{
      (!isOpen)?null:
      <div className='z-50 bg-white pl-2 mb-1 h-[90vh] col-span-1 max-sm:hidden  w-60 sm:overflow-y-auto'>
      <ul className=' border-b border-b-slate-700 py-1'>

      <Link to="/" onClick={()=>handleHomeOpen()}>
         <li className={ 'flex items-center hover:bg-gray-400 h-10 rounded-xl px-5 py-2 font-semibold text-lg gap-5 my-3 ' + (homeOpen && "bg-gray-400")}>
          <img className='h-8' alt='home icon' src={HOME_ICON_URL}/> Home</li>
          </Link>

       <Link onClick={()=>{dispatch(isHomeOpen(false)); setIsLive(true); setSelectedCategory("")}} to={"live"}> <li className={'flex items-center font-semibold hover:bg-gray-400 h-10 rounded-xl px-5 py-2 text-lg gap-5 my-3 ' + (isLive && "bg-gray-400")}><img className=' h-8' alt='home icon' src={LIVE_ICON_URL}/> Live</li></Link>

        <li className='flex items-center hover:bg-gray-400 h-10 rounded-xl px-5 py-2 font-semibold text-lg gap-5 my-3'><img className='h-8' alt='subscription icon' src={SUBSCRIPTION_ICON_URL}/>Subscriptions</li>

      </ul>

      <ul className=' border-b border-b-slate-700 py-5 '>You 

        <li className='flex items-center hover:bg-gray-400 h-10 rounded-xl px-5 py-2 font-semibold text-lg gap-5 my-3'><img className=' h-8' alt='home icon' src={CHANNEL_ICON_URL}/> Your channel</li>

        <li className='flex items-center hover:bg-gray-400 h-10 rounded-xl px-5 py-2 font-semibold text-lg gap-5 my-3'><img className='  h-8' alt='shorts icon' src={HISTORY_ICON_URL}/> History</li>

        <li className='flex items-center hover:bg-gray-400 h-10 rounded-xl px-5 py-2 font-semibold text-lg gap-5 my-3'><img className='mix-blend-darken h-8 ' alt='subscription icon' src={YOURVIDEOS_ICON_URL}/>Your videos</li>


      <Link to={'watchLater'}>
        <li className='flex items-center relative hover:bg-gray-400 h-10 rounded-xl px-5 py-2 font-semibold text-lg gap-5 my-3'><img className='h-8 ' alt='subscription icon' src={WATCHLATER_ICON_URL}/>Watch later <span className='absolute -top-2 left-11 px-2 py-1 w-fit h-fit text-sm text-white bg-red-500 rounded-full'>{watchLaterCount.length}</span></li>
      </Link>

      </ul>
      <ul className=' border-b border-b-slate-700 py-5 '>Explore 

        <Link to="/" onClick={(()=>handleCategory("trending"))}><li className={'flex items-center hover:bg-gray-400 h-10 rounded-xl px-5 py-2 font-semibold text-lg  gap-5 my-3 ' + (selectedCategory==='trending' && "bg-gray-400") }><img className=' h-8' alt='home icon' src={TRENDING_ICON_URL}/> Trending</li></Link>

        <Link to="/" onClick={(()=>handleCategory("shopping"))}><li className={'flex items-center font-semibold hover:bg-gray-400 h-10 rounded-xl px-5 py-2 text-lg gap-5 my-3 '+ (selectedCategory==='shopping' && "bg-gray-400")}><img className='  h-8' alt='shorts icon' src={SHOPPING_ICON_URL}/> Shopping</li></Link>

        <Link to="/" onClick={(()=>handleCategory("music"))}><li className={'flex items-center hover:bg-gray-400 h-10 rounded-xl px-5 py-2 font-semibold text-lg gap-5 my-3 '+ (selectedCategory==='music' && "bg-gray-400")}><img className='mix-blend-darken h-8 ' alt='subscription icon' src={MUSIC_ICON_URL}/>Music</li></Link>

        <Link to="/" onClick={(()=>handleCategory("movies"))}><li className={'flex items-center hover:bg-gray-400 h-10 rounded-xl px-5 py-2 font-semibold text-lg gap-5 my-3 '+(selectedCategory==='movies' && "bg-gray-400")}><img className='h-8 mix-blend-darken' alt='subscription icon' src={MOVIES_ICON_URL}/>Movies</li></Link>

        <Link to="/" onClick={(()=>handleCategory("shorts"))}><li className={'flex items-center hover:bg-gray-400 h-10 rounded-xl px-5 py-2 font-semibold text-lg gap-5 my-3 '+(selectedCategory==='shorts' && "bg-gray-400") }><img className=' mix-blend-darken h-9' alt='shorts icon' src={SHORTS_ICON_URL}/> Shorts</li></Link>

        <Link to="/" onClick={(()=>handleCategory("gaming"))}><li className={'flex items-center font-semibold hover:bg-gray-400 h-10 rounded-xl px-5 py-2 text-lg gap-5 my-3 '+(selectedCategory==='gaming' && "bg-gray-400")}><img className='mix-blend-darken h-7' alt='home icon' src={GAMING_ICON_URL}/> Gaming</li></Link>

        <Link to="/" onClick={(()=>handleCategory("news"))}><li className={'flex items-center font-semibold hover:bg-gray-400 h-10 rounded-xl px-5 py-2 text-lg gap-5 my-3 '+(selectedCategory==='news' && "bg-gray-400")}><img className='mix-blend-darken h-10' alt='home icon' src={NEWS_ICON_URL}/> News</li></Link>

        <Link to="/" onClick={(()=>handleCategory("sports"))}><li className={'flex items-center font-semibold hover:bg-gray-400 h-10 rounded-xl px-5 py-2 text-lg gap-5 my-3 '+(selectedCategory==='sports' && "bg-gray-400")}><img className=' h-10 mix-blend-darken' alt='home icon' src={SPORTS_ICON_URL}/> Sports</li></Link>

        <Link to="/" onClick={(()=>handleCategory("learnings"))}><li className={'flex items-center font-semibold hover:bg-gray-400 h-10 rounded-xl px-5 py-2 text-lg gap-5 my-3 '+(selectedCategory==='learnings' && "bg-gray-400")}><img className=' h-8' alt='home icon' src={LEARNINGS_ICON_URL}/> Learnings</li></Link>

        <Link to="/" onClick={(()=>handleCategory("fashion"))}><li className={'flex items-center font-semibold hover:bg-gray-400 h-10 rounded-xl px-5 py-2 text-lg gap-5 my-3 '+(selectedCategory==='fashion' && "bg-gray-400")}><img className=' h-8' alt='home icon' src={FASHION_ICON_URL}/> Fashion</li></Link>

        <Link to="/" onClick={(()=>handleCategory("podcasts"))}><li className={'flex items-center font-semibold hover:bg-gray-400 h-10 rounded-xl px-5 py-2 text-lg gap-5 my-3 '+(selectedCategory==='podcasts' && "bg-gray-400")}><img className='mix-blend-darken h-8' alt='home icon' src={PODCASTS_ICON_URL}/> Podcasts</li></Link>
      </ul>
    </div>
    }
   

    {/* navbar for small devices */}
    <div className='hidden max-sm:block z-50 fixed bottom-0 right-0 w-full rounded-t-xl bg-slate-400 px-3'>
    <ul className='flex items-center justify-between w-full'>
    <Link to="/" onClick={()=>handleHomeOpen()}>
         <li className={'flex flex-col items-center px-1 font-bold text-xs my-1 ' }>
          <img className={'h-8 hover:bg-gray-400 p-1 rounded-full '+ (homeOpen && "bg-gray-400")} alt='home icon' src={HOME_ICON_URL}/> Home</li>
     </Link>

    <Link onClick={()=>{dispatch(isHomeOpen(false)); setIsLive(true); setSelectedCategory("")}} to={"live"}> 
    <li className={'flex flex-col items-center px-1 font-bold text-xs my-1'}>
      <img className={' h-8 hover:bg-gray-400 p-1 rounded-full  '+ (isLive && "bg-gray-400")} alt='home icon' src={LIVE_ICON_URL}/>Live</li></Link>

      <Link to="/" onClick={(()=>handleCategory("trending"))}>
        <li className={'flex flex-col items-center px-1 font-bold text-xs my-1 '}>
        <img className={'h-8 hover:bg-gray-400 p-1 rounded-full '+ (selectedCategory==='trending' && "bg-gray-400")} alt='home icon' src={TRENDING_ICON_URL}/> Trending</li></Link>

        <Link to={'watchLater'}>
        <li className='flex flex-col items-center px-1 font-bold text-xs my-1'>
          <img className='h-8 hover:bg-gray-400 p-1 rounded-full ' alt='subscription icon' src={WATCHLATER_ICON_URL}/>Watch later<span className='absolute -top-1 right-20 px-2 py-1 w-fit h-fit text-sm text-white bg-red-500 rounded-full'>{watchLaterCount.length}</span>
          </li>
          </Link>
      <li className='flex flex-col items-center px-1 font-bold text-xs my-1'>
    <img className='h-8 hover:bg-gray-400 p-1 rounded-full' alt='user logo' src='https://cdn-icons-png.flaticon.com/512/552/552721.png'/>You</li>
    </ul>
    </div>
    </>
  )
}

export default Sidebar
import {useState, useEffect} from "react";
import LiveChat from "./LiveChat";
import { useDispatch } from "react-redux";
import { closeSidebar } from "../utils/sidebarSlice";

const Live=()=>{

    const dispatch= useDispatch();

    useEffect(()=>{
        dispatch(closeSidebar());
      },[])

    const [likeCount, setLikeCount]= useState(1210);
    const [watchCount, setWatchCount]= useState(21000);
    const [minute,setMinute]= useState(10)
    const [isDescriptionOpen,setIsDescriptionOpen ]=useState(false);

    useEffect(()=>{
        const likeCnt = setInterval(()=>{
            setLikeCount(likeCount+1);
        },800)
        return ()=>{
            clearInterval(likeCnt);
        }
    },[likeCount])

    useEffect(()=>{
        const watchCnt = setInterval(()=>{
            setWatchCount(watchCount+1);
        },500)
        return ()=>{
            clearInterval(watchCnt);
        }
    },[watchCount])

    useEffect(()=>{
         const minuteCnt = setInterval(()=>{
            setMinute(minute+1);
        },60000)
        return ()=>{
            clearInterval(minuteCnt);
        }
    },[minute])

    return (
        <div className='my-3 m-2 sm:mx-20 w-[96%] flex flex-col sm:w-[92vw] h-full sm:h-[89vh] overflow-x-hidden sm:grid grid-flow-col gap-5 sm:absolute sm:left-5 overflow-auto'>  
     <div className='sm:w-[900px] w-full'>
    <div className='flex flex-col gap-3 '>
    <iframe className='sm:rounded-xl rounded-md w-full sm:w-[950px] sm:h-[550px] h-60' src={"https://www.youtube.com/embed/AQBefatKs10?autoplay=1"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

    <div className='flex flex-col max-sm:w-full gap-2'>
      <h1 className='sm:text-xl text-lg  font-bold'>[Hindi] BMPS 2023 | Group Blue | League Stages</h1>
      <div className='flex max-sm:flex-col max-sm:gap-3 justify-between'>
        <div className='flex items-center max-sm:mx-3 max-sm:justify-between sm:gap-4'>
        <img className='border border-black w-8 h-8 sm:w-14 sm:h-14 rounded-full' src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/bgmi-sixteen_nine.jpeg?VersionId=zsLltclyY6uqeoWa_W7f7gVwerMYf5MZ" alt='channel logo'></img>
        <div className='flex sm:flex-col max-sm:gap-2 items-center'>
          <h2 className='sm:text-lg text-sm font-bold'>BGMI Live</h2>
          <h3 className="max-sm:text-xs">5M subscribers</h3>
        </div>
        <button className='border border-black w-20 h-8  sm:w-32 sm:h-12 bg-black text-white rounded-full text-sm sm:text-lg font-semibold'>Subscribe</button>
        </div>
        <div className='flex gap-3 items-center'>
        <div className='flex '>
          <button className='hover:bg-slate-300 flex items-center text-xs sm:text-lg font-semibold px-2 sm:px-2 rounded-l-full shadow-sm shadow-gray-600 w-fit h-8 sm:h-10'><img className='sm:w-10 w-7 h-7 mix-blend-darken sm:h-10 rounded-full' alt='like icon' src='https://i.pinimg.com/originals/57/f2/8c/57f28c11787da528c258cfcaef1ac2ee.png'/>{likeCount}</button>

          <button className='hover:bg-slate-300 shadow-sm shadow-gray-600 px-2 rounded-r-full w-fit h-8 sm:h-10'><img className='sm:w-7 sm:h-7 w-5 h-5 mix-blend-darken' alt='dislike icon' src='https://png.pngtree.com/element_our/png/20181227/dislike-glyph-black-icon-png_291835.jpg'/></button>
        </div>
        <button className='hover:bg-slate-300 shadow-sm shadow-gray-600 flex items-center gap-1 sm:gap-2 text-xs sm:text-md font-bold h-8 sm:h-10 px-2 w-fit rounded-full'><img className='sm:w-5 w-3 h-3 sm:h-5' alt='share icon' src='https://cdn-icons-png.flaticon.com/512/6469/6469436.png'/> Share</button>

        <button className='hover:bg-slate-300 shadow-sm shadow-gray-600 flex items-center gap-1 sm:gap-2 text-xs sm:text-md font-bold h-8 sm:h-10 px-2 w-fit rounded-full'><img className='sm:w-5 w-3 h-3 sm:h-5 mix-blend-darken' alt='downloads icon' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFGYn5CXRz5AUcZXQUTMpWnRnGmW5egqz9rlJoHyvb6lAC1Zw0bU7gKDJOfXVZ0Kv9P08&usqp=CAU'/> Download</button>

        <button className='hover:bg-slate-300 shadow-sm shadow-gray-600 h-9 px-1 w-fit rounded-full'><img className='w-6 h-6' alt='menu icon' src='https://static.thenounproject.com/png/384290-200.png'/></button>
        </div>
      </div>
    </div>
    </div>

    <div className='my-3 max-sm:w-full px-2 sm:px-3 py-2 bg-slate-600 text-white border border-black rounded-lg sm:rounded-xl'>
      <div className='flex gap-4 sm:gap-8 my-1'>
        <h2 className='text-xs sm:text-lg font-semibold'>{watchCount} watching now</h2>
        <h2 className='text-xs sm:text-lg font-semibold'>Started streaming {minute} minutes ago </h2>
      </div>
      <div>
        { (!isDescriptionOpen)? <><span className="w-full max-sm:text-sm overflow-hidden line-clamp-2">Unleash the excitement! Download BATTLEGROUNDS MOBILE INDIA now and dive into thrilling battles with your friends.</span> <button className='mx-2 text-sm sm:text-lg font-bold text-black' onClick={()=>setIsDescriptionOpen(true)}>show more</button></>:
        <div className="max-sm:text-sm"><p>Unleash the excitement! Download BATTLEGROUNDS MOBILE INDIA now and dive into thrilling battles with your friends. </p>
         <p className="my-3"> Get ready for the ultimate gaming extravaganza! The BATTLEGROUNDS MOBILE INDIA PRO SERIES 2023 is here, featuring 96 Pro Teams battling it out for supremacy.</p>
       <p> With a jaw-dropping Prize Pool of INR 1,00,00,000, the stakes are higher than ever!
        Only the best will make it to the Grand Finals, as the Top 16 teams vie for glory in an intense showdown. Don't miss a moment of the action – subscribe now for all the adrenaline-pumping highlights!</p> <button className='mx-2 text-sm sm:text-lg font-bold text-black' onClick={()=>setIsDescriptionOpen(false)}>show less</button></div>
        } 
      </div>
    </div>
    </div>
     <div className="sm:mr-5 sm:ml-10 shadow-xl shadow-gray-600 sm:col-span-11 rounded-lg h-96 sm:h-[550px]  sm:w-[430px]">
        <LiveChat/>
      </div>
      </div>
    )
}
export default Live;
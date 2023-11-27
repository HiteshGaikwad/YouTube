
import React, { useEffect,useState } from 'react'
import LiveComment from './LiveComment'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/chatSlice';
import { generateMessage, generateName } from '../utils/helper';

const LiveChat = () => {

  const [comment, setComment]=useState("");

  const dispatch= useDispatch();

  const messages= useSelector((store)=>store.chat.message);
    
  useEffect(()=>{
    const timer= setInterval(()=>{

      dispatch(addMessage({
        name:generateName(),
        message:generateMessage(25)
      }))
    },500)

    return ()=>{
      clearInterval(timer);
    }
  },[])

  const handleSendChat=()=>{
    if(comment!==""){
    dispatch(addMessage({name:"Developer",message:comment}))
    setComment("");
    }
  }

  return (
    <div className='w-full flex sm:pt-1  flex-col rounded-xl bg-gray-300 gap-2 h-full items-center font-bold'>
    Live Chat 
   
    <div className='w-full flex flex-col-reverse  border-b-2  border-black border-t-2 p-2 rounded-lg h-[90%] overflow-y-scroll'>
      {
        messages.map((chat,i)=>{
          return <LiveComment key={i} name={chat.name} message={chat.message}/>
        })
      }
    </div>
        <form className='h-[10%] px-1 w-full flex gap-3 items-center' onSubmit={(e)=>e.preventDefault() }>
            <input value={comment} onChange={(e)=>setComment(e.target.value)} className='border rounded-md px-2 border-black w-[80%] h-8 sm:h-[70%]' placeholder='Chat...'/>
            <button onClick={()=>{
              handleSendChat();
            }} className='shadow-md font-bold text-lg rounded-md shadow-blue-500 w-[20%] h-8 sm:h-[70%]'>Send</button>
        </form>
    </div>
  )
}

export default LiveChat
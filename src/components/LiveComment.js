
import React from 'react'

const LiveComment = ({name,message}) => {
  return (
    <div className='flex sm:mt-2 mt-1 bg-purple-100 rounded-lg px-2 sm:px-3 py-1 mx-2 sm:mx-3 gap-2 items-center'>
        <img className='sm:w-7 w-5' alt='user icon' src='https://cdn-icons-png.flaticon.com/512/552/552721.png'/>
        <h2 className='sm:text-sm text-xs font-bold'>{name}</h2>
        <h4 className='sm:text-xs text-[10px] w-full font-semibold'>{message} 🚀</h4>
    </div>
  )
}

export default LiveComment
import React from 'react'

const Button = ({name, category}) => {
  return (
      <button className={'hover:bg-gray-700 py-1 px-2 h-fit w-fit rounded-md sm:rounded-lg max-sm:text-xs font-bold sm:font-semibold mr-2 bg-gray-500 text-white cursor-pointer ' + (category===name?"bg-gray-800":"")}>{name}</button>
  )
}

export default Button


  


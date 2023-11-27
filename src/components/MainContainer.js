import React from 'react'
import ButtonList from "./ButtonList"
import VideosContainer from  "./VideosContainer"

function MainContainer() {
  return (
    <div className='flex flex-col relative'>
      <ButtonList/>
      <VideosContainer/>
    </div>
  )
}

export default MainContainer
import React from 'react'
import ButtonList from "./ButtonList"
import VideosContainer from  "./VideosContainer"

function MainContainer() {
  return (
    <div className='flex flex-col max-sm:fixed max-sm:top-1 max-sm:mt-24'>
      <ButtonList/>
      <VideosContainer/>
    </div>
  )
}

export default MainContainer
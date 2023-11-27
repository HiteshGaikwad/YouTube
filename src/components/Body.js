import React from 'react'
import Sidebar from "./Sidebar"
import { Outlet } from 'react-router-dom'

function Body() {
  return (
    <div className='sm:grid sm:grid-flow-col sm:fixed top-20 max-sm:flex max-sm:flex-col-reverse max-sm:h-[94vh]'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Body
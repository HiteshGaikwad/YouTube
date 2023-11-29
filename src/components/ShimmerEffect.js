
import React from 'react'

const ShimmerEffect = () => {
  return (
    <div className='sm:mx-4  sm:w-[85vw] w-[95vw] max-sm:flex flex-col max-sm:gap-5 sm:fixed left-44 sm:grid pt-1 sm:grid-cols-4 gap-3 h-[80vh] overflow-y-auto '>
        {
    Array(16)
        .fill("")
            .map((e,i)=>{
                return(
    <div key={i} className='flex w-full flex-col gap-2'>
        <div className='bg-gray-300 w-5/5 h-48 rounded-2xl'></div>
        <div className='flex gap-2 w-full '>
            <div className='w-16 h-14 bg-gray-300 rounded-full'> </div>
            <div className='flex flex-col gap-2 w-full'>
                <div className='w-4/5 h-6 rounded-lg bg-gray-300'> </div>
                <div className='w-3/5 h-6 rounded-lg bg-gray-300'> </div>
                </div>
        </div>
     </div>
     )
   })
  }
    </div>
  )
}

export default ShimmerEffect
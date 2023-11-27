
const Reply=({reply})=>{
    return(
        <div className="flex mt-3 sm:mt-5 gap-2 p-2 rounded-md sm:rounded-xl bg-slate-300">
        <img className="rounded-full sm:w-12 w-8 h-8 sm:h-12 border border-black" alt="user pic" src={reply?.snippet?.authorProfileImageUrl}></img>
        <div className="flex flex-col">
                <h2 className="text-sm sm:text-lg font-bold">{reply?.snippet?.authorDisplayName}</h2>
                <h2 className="max-sm:text-xs font-bold">{reply?.snippet?.textDisplay}</h2>
            <div className="flex items-center gap-4">
                    <h3 className="flex items-center max-sm:text-xs font-bold"><img className='w-7 sm:w-10 mix-blend-darken h-7 sm:h-10 rounded-full' alt='like icon' src='https://i.pinimg.com/originals/57/f2/8c/57f28c11787da528c258cfcaef1ac2ee.png'/> {reply?.snippet?.likeCount}</h3>
                    <h3 className="flex items-center"><img className='sm:w-8 w-6 h-6 pt-1 sm:h-8 mix-blend-darken' alt='dislike icon' src='https://png.pngtree.com/element_our/png/20181227/dislike-glyph-black-icon-png_291835.jpg'/></h3>
                    </div>
        </div>
       </div>
    )
}
export default Reply;
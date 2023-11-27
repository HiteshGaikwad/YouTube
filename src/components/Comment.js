import {useState} from "react";
import Reply from "./Reply";

const Comment=({comment})=>{

    const [isReplyOpen, setIsReplyOpen]= useState(false);

    return (
        <div className="flex mt-2 sm:mt-5 gap-2 p-2 rounded-xl bg-slate-200">
            <img className="rounded-full sm:w-12 w-10 h-10 sm:h-12 border border-black" alt="user pic" src={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}></img>
            <div>
                <div className="flex flex-col">
                    <h2 className="max-sm:text-ms sm:text-lg font-bold">{comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}</h2>
                    <h2 className=" max-sm:text-xs font-bold">{comment?.snippet?.topLevelComment?.snippet?.textDisplay}</h2>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <h3 className="flex items-center max-sm:text-xs font-bold"><img className='sm:w-10 w-8 h-8 mix-blend-darken sm:h-10 rounded-full' alt='like icon' src='https://i.pinimg.com/originals/57/f2/8c/57f28c11787da528c258cfcaef1ac2ee.png'/> {comment?.snippet?.topLevelComment?.snippet?.likeCount}</h3>
                    <h3 className="flex items-center"><img className='sm:w-8 w-6 h-6 pt-1 sm:h-8 mix-blend-darken' alt='dislike icon' src='https://png.pngtree.com/element_our/png/20181227/dislike-glyph-black-icon-png_291835.jpg'/></h3>
                </div>
                <div className="flex p-2 flex-col">
                    {
                      comment?.replies?.comments.length>0?
                      <button className="flex w-fit text-blue-700 hover:bg-slate-400 px-2 sm:px-4 py-1 mb-2 rounded-full items-center font-bold text-sm sm:text-lg" onClick={()=>setIsReplyOpen(!isReplyOpen)}>
                        {!isReplyOpen?<img className="w-8 sm:w-10" src="https://www.svgrepo.com/show/335062/dropdown.svg" alt="drop down icon"/> : <img className="w-8 sm:w-10" src="https://icons.veryicon.com/png/o/miscellaneous/thick-linear-icon-library/arrow-drop-up-1.png" alt="up arrow icon"/> }  {comment?.replies?.comments.length} replies</button>:""
                    }
                    <div className="ml-3 -mt-4">
                        {
                           isReplyOpen? comment?.replies?.comments.map((reply)=>{
                                return <Reply key={reply?.id} reply={reply}/>
                            }):""
                        }
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Comment;
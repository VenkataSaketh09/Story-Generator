import React from 'react'
import { IoMdArrowDroprightCircle } from "react-icons/io";


function StoryPages({storyChapter}:any) {
  const playSpeech=(text:string)=>{
    const synth=window.speechSynthesis;
    const textToSpeech=new SpeechSynthesisUtterance(text);
    synth.speak(textToSpeech);
  }
  return (
    <div>
        <h2 className='text-2xl font-bold text-primary flex justify-between'>{storyChapter?.title}
          <span className='cursor-pointer tex-3xl' onClick={()=>playSpeech(storyChapter?.description)}><IoMdArrowDroprightCircle /></span>
        </h2>
        <p className='text-xl p-10 mt-3 rounded-lg bg-slate-100'>{storyChapter?.description}</p>
    </div>
  )
}

export default StoryPages
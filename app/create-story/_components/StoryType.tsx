"use client"
import React, { useState } from 'react'
import Image from 'next/image'
export interface optionField{
    label:string
    imageUrl:string
    isFree:boolean
}
function StoryType({UserSelection}:any) {
    const optionList=[
        {
            label:'Story Book',
            imageUrl:'/story.png',
            isFree:true
        },
        {
            label:'Bed Story',
            imageUrl:'/bedstory.png',
            isFree:true
        },
        {
            label:'Educational Story',
            imageUrl:'/login.png',
            isFree:true
        },
    ]
    const [selectedOption,setSelectedOption]=useState<string>();
    const onUserSelection=(item:optionField)=>{
        setSelectedOption(item.label)
        UserSelection({
            fieldValue:item?.label,
            fieldName:'storyType'
        })
    }
  return (
    <div>
        <label className='text-4xl text-primary font-bold'>2. Story Type</label>
        <div className='grid grid-cols-3 gap-5 mt-3'>
            {
                optionList.map((item,index)=>(
                    <div key={index} className={`relative grayscale hover:grayscale-0 
                        cursor-pointer p-1 ${selectedOption===item.label?'grayscale-0 border-2 rounded-3xl border-primary':'grayscale'}`}
                    onClick={()=>onUserSelection(item)}>
                        <h2 className='absolute bottom-5 text-white text-center w-full text-2xl'>{item.label}</h2>
                        <Image src={item.imageUrl} alt={item.label} width={300} height={500} 
                        className='object-cover h-[260px] rounded-3xl'/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default StoryType
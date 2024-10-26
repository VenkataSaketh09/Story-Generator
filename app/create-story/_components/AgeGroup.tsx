"use client"
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { optionField } from './StoryType'
function AgeGroup({UserSelection}:any) {
        const optionList=[
        {
            label:'0-2 Years',
            imageUrl:'/02Years.png',
            isFree:true
        },
        {
            label:'3-5 Years',
            imageUrl:'/06Years.png',
            isFree:true
        },
        {
            label:'6-8 Years',
            imageUrl:'/08Years.png',
            isFree:true
        },
    ]
    const [selectedOption,setSelectedOption]=useState<string>();
    const onUserSelection=(item:optionField)=>{
        setSelectedOption(item.label)
        UserSelection({
            fieldValue:item?.label,
            fieldName:'AgeGroup'
        })
    }
  return (
    <div>
        <label className='text-4xl text-primary font-bold'>3. Age Group</label>
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

export default AgeGroup
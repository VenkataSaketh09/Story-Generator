'use client'
import React,{useState} from 'react'
import Image from 'next/image';
import { optionField } from './StoryType';
function ImageStyle({UserSelection}:any) {
    const optionList=[
        {
            label:'3D Cartoon',
            imageUrl:'/3D.png',
            isFree:true
        },
        {
            label:'Paper Cut',
            imageUrl:'/paperCut.png',
            isFree:true
        },
        {
            label:'Water Color',
            imageUrl:'/watercolor.png',
            isFree:true
        },
        {
            label:'Pixel Style',
            imageUrl:'/pixel.png',
            isFree:true
        },
    ]
    const [selectedOption,setSelectedOption]=useState<string>();
    const onUserSelection=(item:optionField)=>{
        setSelectedOption(item.label)
        UserSelection({
            fieldValue:item?.label,
            fieldName:'ImageType'
        })
    }
  return (
    <div>
        <label className='text-4xl text-primary font-bold'>4. Image Type</label>
        <div className='grid grid-cols-3 gap-5 mt-3'>
            {
                optionList.map((item,index)=>(
                    <div key={index} className={`relative grayscale hover:grayscale-0 
                        cursor-pointer p-1 ${selectedOption===item.label?'grayscale-0 border-2 rounded-3xl border-primary':'grayscale'}`}
                    onClick={()=>onUserSelection(item)}>
                        <h2 className='absolute bottom-5 text-white text-center w-full text-2xl'>{item.label}</h2>
                        <Image src={item.imageUrl} alt={item.label} width={300} height={500} 
                        className='object-cover h-[120px] rounded-3xl'/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ImageStyle
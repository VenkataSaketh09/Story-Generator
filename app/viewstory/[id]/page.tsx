'use client'
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import BookCoverPage from '../_components/BookCoverPage'
import StoryPages from '../_components/StoryPages'
import { Button } from '@nextui-org/button'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";


function ViewStory({ params }: any) {

    const [story, setStory] = useState<any>();
    const bookRef = useRef<any | null>(null);
    const [count,setCount]=useState<number>(0);
    
    useEffect(() => {
        console.log(params.id);
        getStory();
    }, []);

    const getStory = async () => {
        const result = await db.select().from(StoryData)
        .where(eq(StoryData.storyId, params.id));
        console.log(result[0]);
        setStory(result[0]);
    }
    const lastPageIndex = (story?.output?.story?.chapters?.length || 0);
    return (
        <div className='p-10 md:px-20 lg:px-40 '>
            <h2 className='font-bold text-4xl text-center p-10 bg-primary text-white'>
                {story?.output?.story?.title || "Loading..."}
            </h2>
            <div className='relative ml-12'>
            {/* @ts-ignore */}
            <HTMLFlipBook width={500} height={500} className='mt-10' showCover={true} useMouseEvents={false} ref={bookRef}>
                <div><BookCoverPage /></div>
                {[...Array(story?.output?.story?.chapters?.length)].map((_, index) => (
                    <div key={index} className='bg-white p-10 border'>
                        <StoryPages storyChapter={story?.output?.story?.chapters[index]} />
                    </div>
                ))}
                {/* <div>
                    <LastPage/>
                </div> */}
            </HTMLFlipBook>
            {count!=0&&<div className='absolute -left-5 top-[250px]'>
                <IoIosArrowDropleftCircle className='text-[40px] text-primary cursor-pointer'
                onClick={() => {
                    bookRef.current?.pageFlip().flipPrev()
                    setCount(count-1);
                } 
                } />
            </div>}
            
            {count!=(story?.output?.story?.chapters?.length-1)&&<div className='absolute -right-5 top-[250px]'>
                <IoIosArrowDroprightCircle className='text-[40px] text-primary cursor-pointer'
                onClick={() => {
                bookRef.current?.pageFlip().flipNext()
                setCount(count+1)
                }
                } />
            </div>}
            
            </div>
        </div>
    )
}

export default ViewStory;

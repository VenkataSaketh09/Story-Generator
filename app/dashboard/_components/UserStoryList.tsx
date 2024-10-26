"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import { desc, eq } from 'drizzle-orm';
import StoryItemCard from './StoryItemCard';
import CustomLoader from '@/app/create-story/_components/CustomLoader';
import { div } from 'framer-motion/client';

interface storyItemType{
    id: string;
    storySubject: string;
    storyType: string;
    ageGroup: string;
    imageStyle: string;
    output: {
        story: {
            title: string;
        };
    };
    coverimage: string;
    storyId: string;
}

function UserStoryList() {
    const [stories, setStories] = useState<storyItemType[]>([]);
    const {user}=useUser();
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        user&&getUserStory();
    },[user])

    const getUserStory=async()=>{
        setLoading(true);
        const result:any=await db.select().from(StoryData)
        .where(eq(StoryData.userEmail,user?.primaryEmailAddress?.emailAddress??''))
        .orderBy(desc(StoryData?.id))
        console.log(result);
        setStories(result);
        setLoading(false);
    }
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-5'>
            {stories&&stories.map((item:storyItemType,index:number)=>(
                <StoryItemCard story={item} key={index}/>
            ))}
        </div>
        {loading&&<CustomLoader isLoading={loading}/>}
    </div>
  )
}

export default UserStoryList
"use client"
import React, { useState,useEffect, useContext } from 'react'
import StorySubjectInput from './_components/StorySubjectInput'
import StoryType from './_components/StoryType'
import AgeGroup from './_components/AgeGroup'
import ImageStyle from './_components/ImageStyle'
import { Button } from '@nextui-org/button'
import { chatSession } from '@/config/GeminiAi'
import { StoryData, Users } from '@/config/schema'
import { db } from '@/config/db'
import uuid4 from 'uuid4'
import CustomLoader from './_components/CustomLoader'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { UserDetailContext } from '../_context/UserDetailContext'
import { eq } from 'drizzle-orm'
import { User } from '@nextui-org/react'

const CREATE_STORY_PROMPT=process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT

export interface fieldData{
  fieldName: string,
  fieldValue: string
}
export interface formDataType{
  storySubject:string,
  storyType:string,
  AgeGroup:string,
  ImageType:string
}

function CreateStory() {

  const [formData,setFormData]=useState<formDataType>();
  const[loading,setLoading]=useState(false);
  const {user}=useUser();
  const router = useRouter();
  const notify=(msg:string)=>toast(msg);
  const notifyError=(msg:string)=>toast.error(msg);
  const {userDetail,setUserDetail}=useContext(UserDetailContext);

  const onHandleUserSelection=(data:fieldData)=>{
    
    setFormData((prev:any)=>({
      ...prev,
      [data.fieldName]:data.fieldValue

    }))
    console.log(formData)
  }

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  const GenerateStory=async()=>{
    if(userDetail?.credit<=0){
      notifyError("You have Completed all your credits!");
      return ;  
    }
    setLoading(true)
    const FINAL_PROMPT=CREATE_STORY_PROMPT
    ?.replace('{ageGroup}',formData?.AgeGroup?? '')
    .replace('{storyType}',formData?.storyType?? '')
    .replace('{storySubject}',formData?.storySubject?? '')
    .replace('{imageStyle}',formData?.ImageType?? '')

    console.log(FINAL_PROMPT);

    //Generate AI story
    try{
      
      const result=await chatSession.sendMessage(FINAL_PROMPT);  
      // console.log(result?.response.text());
      const response=await SavInDB(result?.response.text());
      console.log(response);
      const storyId=response?.[0]?.storyId;
      notify('Story Generated');
      await UpdateUserCredits();
      router?.push(`/viewstory/${storyId}`);
      setLoading(false);
    }
    catch(e){
      console.log(e);
      notifyError('Server Error, Try Again');  
      setLoading(false);
    }
  }

  //save in DB 
  const SavInDB=async(output:string)=>{
    const recordId=uuid4();
    setLoading(true);
    try{
      const result= await db.insert(StoryData).values({
        storyId:recordId,
        ageGroup:formData?.AgeGroup,
        imageStyle:formData?.ImageType,
        storySubject:formData?.storySubject,
        storyType:formData?.storyType,
        output:JSON.parse(output),
        userEmail:user?.primaryEmailAddress?.emailAddress,
        userName:user?.fullName
      }).returning({storyId:StoryData?.storyId})
      setLoading(false);
      return result;
    }
    catch(e){
      setLoading(false);
      console.log(e);
    }
  }
  const UpdateUserCredits=async()=>{
    const result=await db.update(Users).set({
      credit:Number(userDetail?.credit-1)
    }).where(eq(Users?.userEmail,user?.primaryEmailAddress?.emailAddress??''))
    .returning({id:Users.id})
  }
  return (
    <div className='p-10 md:px-20 lg:px-40'>
      <h2 className='font-bold text-primary text-[70px] text-center'>CREATE YOUR STORY</h2>
      <p className='text-2xl text-primary text-center'>Unlock your creativity with AI: Craft stories like never before! let our AI bring your imagination to life, <br></br>one story at a time</p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-14'>
        {/* Story Subject */}
        <StorySubjectInput UserSelection={onHandleUserSelection}/>
        {/* Story Type */}
        <StoryType UserSelection={onHandleUserSelection}/>
        {/* Age Group */}
        <AgeGroup UserSelection={onHandleUserSelection}/>
        {/* Image Style */}
        <ImageStyle UserSelection={onHandleUserSelection}/>
      </div>
      <div className='flex justify-end my-10 flex-col items-end'>
        <Button color="primary" className='text-white p-10 text-2xl' 
        disabled={loading}
        onClick={GenerateStory}>Generate Story</Button>
        <span>1 Credit Will be Used</span>
      </div>
      <CustomLoader isLoading={loading}/>
    </div>
  )
}

export default CreateStory
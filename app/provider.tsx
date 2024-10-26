"use client"
import React, { useEffect, useState } from 'react'
import {NextUIProvider} from '@nextui-org/react'
import Header from "./_components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '@clerk/nextjs';
import { Users } from '@/config/schema';
import { db } from '@/config/db';
import { eq } from 'drizzle-orm';
import { UserDetailContext } from './_context/UserDetailContext';
function Provider({children}:{children:React.ReactNode}) {

  const [userDetail,setUserDetail]=useState<any>();
  const {user}=useUser();

  useEffect(()=>{
    user&&saveNewUserIfNotExist();
  },[user])

  const saveNewUserIfNotExist=async()=>{
    //check if user already exists
    const userResult=await db.select().from(Users)
    .where(eq(Users.userEmail,user?.primaryEmailAddress?.emailAddress??''))

    console.log("Existing User:",userResult);
    //if not will ad user to db
    if(!userResult[0]){
        const result=await db.insert(Users).values({
        userEmail:user?.primaryEmailAddress?.emailAddress,
        userName:user?.fullName
      }).returning({
        userEmail:Users.userEmail,
        userName:Users.userName,
        userCredit:Users.credit
      })
      console.log("new User:",result[0]);
      setUserDetail(result[0]);
    }else{
      setUserDetail(userResult[0]);
    }
  }

  return (
    <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
    <NextUIProvider>
        <Header/>
        {children}
        <ToastContainer/>
    </NextUIProvider>
    </UserDetailContext.Provider>
  )
}

export default Provider
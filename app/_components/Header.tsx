'use client'
import React, { useState } from 'react'
import {
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
  } from "@nextui-org/navbar";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { useUser } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs';
function Header() {
    const {user,isSignedIn}=useUser();
    const MenuList=[
        {
            name:'Home',
            path:'/'
        },
        {
            name:'Create Story',
            path:'/create-story'
        },
        {
            name:'Explore Stories',
            path:'/explore'
        },
        {
            name:'Contact Us',
            path:'/contact-us'
        },
    ]
    const [isMenuOpen,setIsMenuOpen]=useState(false)
  return (
    <Navbar maxWidth='full' onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
            <NavbarMenuToggle  aria-label={isMenuOpen?"Close Menu":"Open Menu"} className='sm:hidden'/>
            <NavbarBrand>
                <Image src={'./logo2.svg'} alt='logo' width={40} height={40 }/>
                <h2 className='text-2xl font-bold text-primary ml-3'>Kids Story</h2>
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify='center' className='hidden sm:flex'>
            {
                MenuList.map((item,index)=>(
                    <NavbarItem key={index} className='text-xl text-primary font-medium hover:underline mx-3'>
                        <Link href={item.path}>
                        {item.name}
                        </Link>
                    </NavbarItem>
                ))
            }
        </NavbarContent>
        <NavbarContent justify='end'>
            <Link href={'/dashboard'}>
                <Button className='bg-primary text-white'>
                    {
                        isSignedIn?
                        'Dashboard'
                        :
                        'Get Started'
                    }
                </Button>
            </Link>
            <UserButton/>
        </NavbarContent>
        <NavbarMenu>
            {MenuList.map((item,index)=>(
                <NavbarMenuItem key={index}>
                    <Link href={item.path}>
                        {item.name}
                    </Link>
                </NavbarMenuItem>
            ))}
        </NavbarMenu>
    </Navbar>
  )
}

export default Header
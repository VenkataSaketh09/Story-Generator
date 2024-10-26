import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@nextui-org/button'
function Hero() {
  return (
    <div className='px-10 md:px-28 lg:px-44 mt-10'>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>
                <h2 className='text-[70px] font-extrabold py-8 text-primary'>Craft Magical Stories for Kids in Minutes</h2>
                <p className='text-2xl text-primary '>Create fun and personalised stories that bring your child's adventures to life and spark their passion for reading.</p>
                <Link href={'/create-story'}>
                  <Button size='lg' color='primary' className='mt-9 font-bold text-[20px]'>Create Story</Button>
                </Link>
            </div>
            <div>
                <Image src={'/hero.png'} alt='image' width={700} height={400}/>
            </div>
        </div>
    </div>
  )
}

export default Hero
import React from 'react'
import Image from 'next/image'
function BookCoverPage() {
  return (
    <div>
        <Image src={'/storyCover.jpg'} alt='imageCover' width={500} height={500}/>
    </div>
  )
}

export default BookCoverPage
import React from 'react'
import DashBoardHeader from './_components/DashBoardHeader'
import UserStoryList from './_components/UserStoryList'

function Dashboard() {
  return (
    <div className='p-10 md:px-20 lg:px-40 min-h-screen'>
      <DashBoardHeader/>
      <UserStoryList/>
    </div>
  )
}

export default Dashboard
import React, { useEffect, useState } from 'react';
import {useSelector} from "react-redux"

function Dashboard() {


  const user = useSelector(state => state.authStore.authUser);


  return (
    <div className='min-h-dvh bg-accent-light text-white flex flex-row'>
      <div className='w-[30%] border-r-2 flex flex-col'>
        <div className='border-b-2 p-5 text-2xl flex flex-row gap-3 justify-center items-center'>
          <div><img src="/ledigaga.jpg" alt="logo" className='h-[50px] w-[50px] object-cover rounded-4xl ' /></div>
          <div className='flex justify-center items-center text-2xl font-semibold'>{user.fullname }</div>
        </div>
        <div className=''>lists of intracted users</div>
      </div>
      <div className='w-[70%] bg-emerald-400'>
        section2
      </div>
    </div>
  )
}

export default Dashboard;
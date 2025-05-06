
import React, { useState } from 'react'
import { API } from '../utils/Axios';

function Logout() {

    const [sms, setSms] = useState("");

    (async ()=>{
       
       try {
            const resp = await API.post('/auth/logout', {});
            const message = resp.data.sms;
            setSms(message);
            localStorage.setItem('isLogedIn', 'false');

       } catch (error) {
            console.log('logout error', error.message);
       }
    })

  return (
    <div className='h-dvh bg-amber-100 flex justify-center items-center'>
        <div className='h-[70%] w-[60%] bg-accent-light text-black flex justify-center items-center'>{sms}</div>
    </div>
  )
}

export default Logout;

//api/auth/logout
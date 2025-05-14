import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { API } from '../utils/Axios';
import Profile from './Profile';
import {RxCross2} from "react-icons/rx";


function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [buttonView, setButtonView] = useState('SignUp');
  const [viewProfile, setViewProfile] = useState(false);

  const navigate = useNavigate();

  const authUser = useSelector((state) => state.authStore.authUser);

  const profileImage = (e) => {
    e.preventDefault();

    setViewProfile(!viewProfile);
  }

  useEffect(() => {
    setIsLoggedIn(!!authUser.id)
  }, [authUser]);

  return (
    <div className='w-[90%] h-fit flex flex-row justify-between items-center fixed mt-3 rounded-4xl px-2 bg-[rgba(255, 255, 255, 0.2)] backdrop-blur-[10px]' >
        <div className='hover:cursor-pointer' onClick={() => navigate('/')}>
          <img src="/ChatGPT Logo.png" alt="logoImage" height={'50px'} width={'200px'} />
        </div>
        <div className='w-[40%] flex flex-row justify-around'>
          <NavLink to="about" className=' font-bold text-textStrong hover:text-accent text-2xl'>About</NavLink>
          <NavLink to="contact" className='font-bold text-textStrong hover:text-accent text-2xl'>Contact</NavLink>

          {isLoggedIn ? (<>

            {viewProfile ? (<>

            <div className='relative'>

              <div className='absolute top-5 backdrop-blur-sm right-0 z-20 border-2 p-5'>
                <div className="hover:cursor-pointer right-0" onClick={profileImage}>
                <RxCross2/>
                </div>
                < Profile/>
              </div>

              

            </div>
             
             </>) : (<>
             <div>
              <img src="http://test.dev.ldfkk" alt="img" className='h-fit w-fit border-2 border-accent-light hover:cursor-pointer ' onClick={(e) => {
                profileImage(e)
              }} />
            </div>

              </>)}
            
          </>) 

          : (<>

            <NavLink to="login" className='font-bold text-textStrong hover:text-accent text-2xl' 
            // i want to apply event listener here
            >Login</NavLink>
            
          </>)}
        
        </div>
    </div>
  )
}

export default Navbar;


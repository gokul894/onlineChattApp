import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const [toDestny, setToDestny] = useState("login");
  const navigate = useNavigate();

  const status = useSelector((state) => state.authStore.isLogedIn);

  useEffect(() => {
    if(status){
      setToDestny("logout")
    }else{
      setToDestny("login");
    }
  });

  return (
    <div className='w-[90%] h-fit flex flex-row justify-between items-center fixed mt-3 rounded-4xl px-2 bg-[rgba(255, 255, 255, 0.2)] backdrop-blur-[10px]' >
        <div className='hover:cursor-pointer' onClick={() => navigate('/')}>
          <img src="/ChatGPT Logo.png" alt="logoImage" height={'50px'} width={'200px'} />
        </div>
        <div className='w-[40%] flex flex-row justify-around'>
          <NavLink to="about" className='font-bold text-textStrong hover:text-accent text-2xl'>About</NavLink>
          <NavLink to="contact" className='font-bold text-textStrong hover:text-accent text-2xl'>Contact</NavLink>

          <NavLink to={toDestny} className="bg-[#A78BFA] hover:bg-[#8b5cf6] text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition">{toDestny}</NavLink>

        </div>
    </div>
  )
}

export default Navbar;


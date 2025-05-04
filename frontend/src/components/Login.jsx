import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addUser, setIsLogedIn } from '../context/auth.storage.js';
import { toast } from 'react-toastify';

function Login() {
    const [usernameOremail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', {
                usernameOremail,
                password
            });

            const AuthUser =await response.data.AuthUser;
            const sms = await response.data.sms;

            if(AuthUser?.id){

                dispatch(setIsLogedIn(true));
                dispatch(addUser({...AuthUser}));

                toast.success(sms);

                navigate('/dashboard');
            }else{
                // Tostify({sms:response.data.sms});
                toast.error('User not foud !!')
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className='h-dvh w-[100%] flex justify-center items-center '>
        <div className='w-[50%] h-[70%] bg-accent-light rounded-2xl flex flex-col gap-4 justify-around items-center'>
        <form onSubmit={onSubmitHandler} className='w-[50%] h-[70%] flex flex-col justify-around items-center' >

            <div>
                <h1 className='text-2xl font-bold'>Please login.</h1>
            </div>

            <input type="text" className='border-2 p-2 text-center outline-none  bg-white rounded-2xl' placeholder='Username or email' required onChange={(e) => {
                setUsernameOrEmail(e.target.value)
            }}/>
            <input type="text" className='border-2 p-2 text-center outline-none  bg-white rounded-2xl' placeholder='Password' required onChange={(e) => {
                setPassword(e.target.value)
            }}/>

            <button type="submit" className='border-2 border-amber-100 rounded-2xl p-2 font-semibold hover:text-amber-100 hover:cursor-pointer px-5'>submit</button>
        </form>
        <div>
            Create new User. <span><Link to='/ragister' className='text-white'>SignUp</Link></span>
        </div>
        </div>
    </div>
  )
}

export default Login;
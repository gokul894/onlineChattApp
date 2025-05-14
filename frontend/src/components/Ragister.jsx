import { useState } from 'react'
import { Link } from 'react-router-dom';
import { API } from '../utils/Axios';
import { toast } from 'react-toastify';

function Ragister() {

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [registrationDone, setRegistrationDone] = useState(false);
  
    const submitHandler = async (e) => {
      e.preventDefault();

      try {
        const response =  await API.post('/auth/ragister', {fullName, username, email, password, confirmPass});
        
        if(response.status === 200 && response.statusText === "OK"){
          toast.success(response.data.message)
          setRegistrationDone(true);
        }

      } catch (error) {
        console.log('there have some backend connection err', error)
      }
    };

    if(registrationDone){
      return (
        <div className='h-dvh w-[100%] flex justify-center items-center '>
          <div className='w-[50%] h-[70%] bg-accent-light rounded-2xl flex flex-col justify-center gap-3 items-center '>
            <h1 className='text-2xl font-bold'>Ragistration successfully done</h1><br></br>
            <h2 className='text-2xl font-semibold'>Please Login Now <span><Link to='/login' className='text-white'>Login</Link></span></h2>
          </div>
        </div>
      )
    }

  return (
    <div className='h-dvh w-[100%] flex justify-center items-center '>
      <div className='w-[50%] h-[70%] bg-accent-light rounded-2xl flex flex-col justify-around items-center '>
        <div>
          <h1 className='text-2xl font-bold'>Create New User.</h1>
        </div>
        <form onSubmit={submitHandler} className='w-[50%] h-[70%] flex flex-col justify-center items-center gap-2 font-semibold overflow-hidden' >

          <input name='fullname' className='border-2 p-2 text-center rounded-2xl bg-white outline-none shadow-2xl' placeholder='fullname' required onChange={(e) => {
        setFullName(e.target.value);
            }}></input>

          <input name='username' className='border-2 p-2 text-center outline-none  bg-white rounded-2xl' placeholder='username' required onChange={(e) =>{
        setUsername(e.target.value);
          }}></input>

          <input name='email' className='border-2 p-2 text-center outline-none rounded-2xl  bg-white' placeholder='email' required onChange={(e) =>{
        setEmail(e.target.value);
          }}></input>

          <input name='password' className='border-2 p-2 text-center outline-none  bg-white rounded-2xl' placeholder='password' required onChange={(e) =>{
        setPassword(e.target.value);
          }}></input>

          <input name='confirmPass' className='border-2 p-2 text-center outline-none  bg-white rounded-2xl' placeholder='confirmPass' required onChange={(e) =>{
        setConfirmPass(e.target.value);
          }}></input>

          <button type="submit" className='hover:cursor-pointer border-2 border-amber-100 rounded-2xl py-2 px-5 font-semibold hover:text-amber-100'>submit</button>
        </form>
        <div className='font-semibold'>
            Already have account. <span><Link to='/login' className='text-white'>Login</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Ragister;


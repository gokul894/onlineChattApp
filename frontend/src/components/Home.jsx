import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='w-[100%] h-dvh flex place-items-center justify-center]'>
      <div className='w-full h-full flex flex-col text-center place-items-center justify-center'>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Connect. Chat. Anywhere.
        </h1>
        <p className="w-[80%] text-lg md:text-xl text-[#94A3B8] mb-8">
          <span className="text-[#38BDF8] font-semibold">online</span>
          <span className="text-[#A78BFA] font-semibold">ChattApp</span> brings people together in real-time with smooth, secure, and modern messaging.
        </p>
        <div className="flex justify-center gap-4">
          <Link to='/dashboard' className="bg-[#38BDF8] hover:bg-[#0ea5e9] text-white px-6 py-3 rounded-2xl font-medium shadow-lg transition">
            Get Started
          </Link>
          <Link to='/about' className="bg-[#A78BFA] hover:bg-[#8b5cf6] text-white px-6 py-3 rounded-2xl font-medium shadow-lg transition">
            Learn More
          </Link>
        </div>
      </div>
      <div className='w-full h-full flex place-items-center justify-center'>
        <img src="/Chatgptimage.png" alt="image" />
      </div>
    </div>
  )
}

export default Home
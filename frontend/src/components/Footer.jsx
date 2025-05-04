import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="w-[100%] bg-[#1E293B] text-[#94A3B8] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-white text-xl font-bold">
            online<span className="text-[#A78BFA]">ChattApp</span>
          </h2>
          <p className="text-sm mt-1">Connecting conversations since 2025.</p>
        </div>
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
          <Link to="contact" className="hover:text-white transition">Contact</Link>
        </div>
      </div>
      <div className="text-center text-xs text-[#64748B] mt-6">
        © 2025 onlineChattApp. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
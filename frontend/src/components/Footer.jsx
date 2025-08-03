import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
   const navigate = useNavigate();

  return (
    <div className="bg-white mt-12 px-6 md:px-16 py-10 border-t border-[#22C55E]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-600">
        
        {/* Logo and Description */}
        <div>
          <div className='flex items-center space-x-3 cursor-pointer' onClick={() => navigate('/')}>
            <svg className="w-12 h-12" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="50" fill="#22C55E" />
              <path d="M40 40V65C40 75 50 80 60 80C70 80 80 75 80 65V40" stroke="white" strokeWidth="5" strokeLinecap="round" />
              <circle cx="60" cy="85" r="5" fill="white" />
              <path d="M55 25H65V35H75V45H65V55H55V45H45V35H55V25Z" fill="white" />
            </svg>
            <h1 className='text-2xl md:text-3xl font-bold text-[#22C55E]'>HealPoint</h1>
          </div>
          <p className="mt-4 text-gray-500">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque dolor amet architecto quos a autem distinctio in! Ex numquam dolorem autem tenetur nemo quaerat ipsa.
          </p>
        </div>

        {/* Company Links */}
        <div className=''>
          <h3 className="text-gray-800 font-semibold mb-4">COMPANY</h3>
          <ul className="space-y-2 text-gray-600 flex flex-col">
            <Link to={'/home'} className="hover:text-[#22C55E]">Home</Link>
            <Link to={'/about'} className="hover:text-[#22C55E]">About us</Link>
            <Link to={'/contact'} className="hover:text-[#22C55E]">Contact us</Link>
            <Link to={'/'} className="hover:text-[#22C55E]">Privacy policy</Link>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-4">GET IN TOUCH</h3>
          <ul className="space-y-2 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>healpoint@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 border-t border-[#22C55E] pt-6 text-center text-gray-500 text-sm">
        Copyright © 2024 Satish Sharma – All Rights Reserved.
      </div>
    </div>
  )
}

export default Footer

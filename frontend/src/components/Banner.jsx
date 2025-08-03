import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {

    const navigate = useNavigate()

  return (
    <div className="bg-[#22C55E] px-4 md:px-8 py-8 rounded-2xl relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative">
        
        {/* Left Content */}
        <div className="z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-medium leading-snug drop-shadow">
            Meet Expert Doctors
          </h1>
          <p className="mt-4 text-white/90 text-base md:text-lg max-w-md">
            100+ trusted professionals. Quality care at your convenience. Book anytime, anywhere.
          </p>
          <button onClick={() => {navigate('/login');scrollTo(0,0)}} className="mt-6 inline-block bg-white text-[#22C55E] px-6 py-3 rounded-full font-semibold shadow-md hover:bg-green-100 transition-all duration-300">
            Create account
          </button>
        </div>

        {/* Right Side Image (Hidden on small screens) */}
        <div className="hidden md:block absolute -top-10 -right-11 ">
          <div className="bg-white w-[280px] md:w-[320px] lg:w-[360px]">
            <img
              src={assets.appointment_img}
              alt="Doctor"
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
        </div>
      </div>

      {/* Decorative BG Shape */}
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl z-0" />
    </div>
  );
};

export default Banner;

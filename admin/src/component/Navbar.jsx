import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../contaxt/AdminContext";
import {useNavigate} from 'react-router-dom'
import { DoctorContext } from "../contaxt/DoctorContext";

const Navbar = () => {

    const {atoken,setAtoken} = useContext(AdminContext)
    const {dtoken,setDtoken,} = useContext(DoctorContext)
    const navigate = useNavigate()

    const logOut = () =>{
        navigate('/')
        atoken && setAtoken('')
        atoken && localStorage.removeItem('atoken')
        dtoken && setAtoken('')
        dtoken && localStorage.removeItem('dtoken')
    }

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b border-[#00ff5e] bg-white">
      <div className="flex gap-2 items-center text-sm">
        <div className="cursor-pointer">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00f83e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M6 20c0-4 12-4 12 0" />
          </svg>
        </div>
        <p className="px-2.5 py-0.5 rounded-full text-gray-600 border border-[#00ff5e]">{atoken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={logOut} className="cursor-pointer primary text-white text-sm px-10 py-2 rounded-full">Log Out</button>
    </div>
  );
};

export default Navbar;

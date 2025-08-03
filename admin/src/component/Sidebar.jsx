import React from "react";
import { useContext } from "react";
import { AdminContext } from "../contaxt/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../contaxt/DoctorContext";

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const {dtoken} = useContext(DoctorContext)

  return (
    <div className="min-h-screen bg-white border-r border-[#0bff3c]">
      {atoken && (
        <ul className="text-[#515151] mt-5">
          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive? 'bg-[#0bff3c0f] border-r-4 border-[#0bff3c]' : ''}`} to={'/admin-dashboard'}>
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00f83e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="6" y="10" width="12" height="10" />
              <path d="M3 10l9-7 9 7" />
              <rect x="10" y="14" width="4" height="6" />
            </svg>
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive? 'bg-[#0bff3c0f] border-r-4 border-[#0bff3c]' : ''}`} to={'/all-appointment'}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00f83e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <polyline points="9 16 12 19 17 14" />
            </svg>
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive? 'bg-[#0bff3c0f] border-r-4 border-[#0bff3c]' : ''}`} to={'/add-doctor'}>
            <svg
              width="50"
              height="50"
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
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="16" y1="11" x2="22" y2="11" />
            </svg>
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>

          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive? 'bg-[#0bff3c0f] border-r-4 border-[#0bff3c]' : ''}`} to={'/doctor-list'}>
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00f83e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="7" cy="8" r="4" />
              <path d="M3 20c0-4 8-4 8 0" />
              <line x1="13" y1="7" x2="21" y2="7" />
              <line x1="13" y1="12" x2="21" y2="12" />
              <line x1="13" y1="17" x2="21" y2="17" />
            </svg>
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}

      {dtoken && (
        <ul className="text-[#515151] mt-5">


          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive? 'bg-[#0bff3c0f] border-r-4 border-[#0bff3c]' : ''}`} to={'/doctor-appointment'}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00f83e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <polyline points="9 16 12 19 17 14" />
            </svg>
            <p className="hidden md:block">Appointments</p>
          </NavLink>


          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive? 'bg-[#0bff3c0f] border-r-4 border-[#0bff3c]' : ''}`} to={'/doctor-profile'}>
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00f83e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="7" cy="8" r="4" />
              <path d="M3 20c0-4 8-4 8 0" />
              <line x1="13" y1="7" x2="21" y2="7" />
              <line x1="13" y1="12" x2="21" y2="12" />
              <line x1="13" y1="17" x2="21" y2="17" />
            </svg>
            <p className="hidden md:block">Doctors Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;

import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken ,userData} = useContext(AppContext);




  const logOut = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 px-4 mb-5 border-b border-[#22C55E]">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
        <svg
          className="w-10 h-10"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="60" cy="60" r="50" fill="#22C55E" />
          <path d="M40 40V65C40 75 50 80 60 80C70 80 80 75 80 65V40" stroke="white" strokeWidth="5" strokeLinecap="round" />
          <circle cx="60" cy="85" r="5" fill="white" />
          <path d="M55 25H65V35H75V45H65V55H55V45H45V35H55V25Z" fill="white" />
        </svg>
        <h1 className="text-2xl font-bold text-[#22C55E]">HealPoint</h1>
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-6 font-medium">
        <NavLink to="/"><li className="uppercase">Home</li></NavLink>
        <NavLink to="/doctors"><li className="uppercase">All Doctors</li></NavLink>
        <NavLink to="/about"><li className="uppercase">About</li></NavLink>
        <NavLink to="/contact"><li className="uppercase">Contact</li></NavLink>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {!token ? (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#22C55E] text-white text-sm px-5 py-2 rounded-full hover:opacity-90 hidden md:block"
          >
            Create account
          </button>
        ) : (
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2">
              <img className="w-8 rounded-full" src={userData.image} alt="Profile" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            </div>
            <div className="absolute -right-9 top-8 bg-white border border-[#22C55E] shadow-lg rounded p-4 hidden group-hover:flex flex-col gap-2 text-sm z-50">
              <p onClick={() => navigate("/my-profile")} className="hover:text-black cursor-pointer">My Profile</p>
              <p onClick={() => navigate("/my-appointment")} className="hover:text-black cursor-pointer">My Appointment</p>
              <p onClick={logOut} className="hover:text-black cursor-pointer">Logout</p>
            </div>
          </div>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* Mobile Fullscreen Menu */}
      {showMenu && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col">
          <div className="flex items-center justify-between px-5 py-6 border-b border-[#22C55E]">
            <div className="flex items-center gap-2">
              <svg
                onClick={() => navigate("/")}
                className="w-10 h-10 cursor-pointer"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="60" cy="60" r="50" fill="#22C55E" />
                <path d="M40 40V65C40 75 50 80 60 80C70 80 80 75 80 65V40" stroke="white" strokeWidth="5" strokeLinecap="round" />
                <circle cx="60" cy="85" r="5" fill="white" />
                <path d="M55 25H65V35H75V45H65V55H55V45H45V35H55V25Z" fill="white" />
              </svg>
              <h1 className="text-xl font-bold text-[#22C55E]">HealPoint</h1>
            </div>
            <img
              onClick={() => setShowMenu(false)}
              className="w-7 cursor-pointer"
              src={assets.cross_icon}
              alt="Close"
            />
          </div>

          {/* Mobile Menu Items */}
          <ul className="flex flex-col items-center gap-6 mt-10 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">Home</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">All Doctors</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">About</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">Contact</NavLink>
            {!token && (
              <button
                onClick={() => {
                  navigate("/login");
                  setShowMenu(false);
                }}
                className="bg-[#22C55E] text-white px-6 py-2 rounded-full mt-4"
              >
                Create Account
              </button>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;

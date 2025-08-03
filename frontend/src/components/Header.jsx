import React from 'react'
import { Calendar, Clock, Star, CheckCircle, ArrowRight, Heart, Shield, Users } from 'lucide-react';
import {assets} from '../assets/assets'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className=" bg-gradient-to-br from-gray-50 via-white to-green-50 relative overflow-hidden">
      {/* Geometric background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-100 rounded-full opacity-30"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-green-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-green-300 rounded-full opacity-25"></div>
      </div>

      <div className="container mx-auto px-4  relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[85vh]">
          
          {/* Left Content - 7 columns */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header with badge */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#22C55E]/10 text-[#22C55E] px-4 py-2 rounded-full text-sm font-medium border border-[#02f95daf]">
                <CheckCircle className="w-4 h-4" />
                Trusted Healthcare Platform
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] text-gray-900">
                Book Your
                <br />
                <span className="relative">
                  <span className="text-[#22C55E]">Health</span>
                  <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 300 12" fill="none">
                    <path d="M5 6C50 2 100 2 150 6C200 10 250 10 295 6" stroke="#22C55E" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
                <br />
                Appointment
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Connect with verified doctors instantly. Schedule appointments, 
                get consultations, and manage your health journey seamlessly.
              </p>
            </div>


            {/* CTA Buttons */}
            <a href='#speciality' className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-[#22C55E] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#16A34A] transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                Book Appointment Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </a>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-[#02f95daf]">
                <Shield className="w-4 h-4 text-[#22C55E]" />
                <span className="text-sm font-medium text-gray-700">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-[#02f95daf]">
                <Clock className="w-4 h-4 text-[#22C55E]" />
                <span className="text-sm font-medium text-gray-700">24/7 Available</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-[#02f95daf]">
                <Heart className="w-4 h-4 text-[#22C55E]" />
                <span className="text-sm font-medium text-gray-700">Care Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Right Content - 5 columns */}
          <div className="lg:col-span-5 relative">
            {/* Main card */}
            <div className="relative">
              {/* Doctor appointment card */}
              <div className="relative z-10">
                <div className="">
                  <img src={assets.header_img} alt="" />
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 z-40 -left-6 bg-white rounded-2xl shadow-lg p-4 border border-[#02f95daf] transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#22C55E]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">50+</div>
                    <div className="text-xs text-gray-600">Specialists</div>
                  </div>
                </div>
              </div>

              <div className="absolute z-40 -bottom-6 -right-6 bg-white rounded-2xl shadow-lg p-4 border border-[#02f95daf] transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">100%</div>
                    <div className="text-xs text-gray-600">Verified</div>
                  </div>
                </div>
              </div>

              {/* Pulse animation */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#22C55E]/5 rounded-full animate-pulse -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#22C55E]/5 to-transparent"></div>
    </div>



  )
}

export default Header

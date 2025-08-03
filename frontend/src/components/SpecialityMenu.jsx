import React from 'react'
import {specialityData} from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
     <div id='speciality' className="py-16 ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Find by Specialty
          </h2>
          
          <div className="max-w-2xl mx-auto border-1 border-[#02f95daf] primary_b rounded-lg p-4 bg-white">
            <p className="text-gray-600">
              Simply browse through our extensive list of trusted doctors, 
              schedule your appointment hassle-free.
            </p>
          </div>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {specialityData.map((item, index) => (
            <Link onClick={()=>scrollTo(0,0)} to={`/doctors/${item.speciality}`} key={index} className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-blue-100">
                  <img 
                    src={item.image} 
                    alt={item.speciality}
                    className="w-full h-full mb-2 object-cover hover:scale-110 duration-300 transition-all"
                  />
              </div>
              <p className="text-sm font-medium text-gray-700">
                {item.speciality}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpecialityMenu

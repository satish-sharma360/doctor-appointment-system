import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const {speciality} = useParams()
  const {doctors} = useContext(AppContext)
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()

  const applyFilter = () =>{
    if (speciality) {
      setFilterDoc(doctors.filter((item) => item.speciality === speciality))
    }else{
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter()
  },[doctors,speciality])

  return (
     <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-8 py-6">
      
      {/* Left Filter Sidebar */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="lg:sticky lg:top-24">
          <h2 className="text-base md:text-lg font-medium text-gray-800 mb-4">
            Browse through the doctors specialist.
          </h2>

          <div className="flex ml-1 lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide">
            <button
              onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} 
              className={`whitespace-nowrap border border-[#02f95daf] text-sm px-4 py-2 rounded transition-all  text-[#22C55E] font-semibold ${speciality === 'General physician' ? 'bg-[#22C55E]/10' : ''}`}
            >
              General physician
            </button>
            <button
              onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} 
              className={`whitespace-nowrap border border-[#02f95daf] text-sm px-4 py-2 rounded transition-all ${speciality === 'Gynecologist' ? 'bg-[#22C55E]/10' : ''}  text-[#22C55E] font-semibold`}
            >
              Gynecologist
            </button>
            <button
              onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} 
              className={`whitespace-nowrap border border-[#02f95daf] text-sm px-4 py-2 rounded transition-all ${speciality === 'Dermatologist' ? 'bg-[#22C55E]/10' : ''}  text-[#22C55E] font-semibold`}
            >
              Dermatologist
            </button>
            <button
              onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} 
              className={`whitespace-nowrap border border-[#02f95daf] text-sm px-4 py-2 rounded transition-all ${speciality === 'Pediatricians' ? 'bg-[#22C55E]/10' : ''}  text-[#22C55E] font-semibold`}
            >
              Pediatricians
            </button>
            <button
              onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}
              className={`whitespace-nowrap border border-[#02f95daf] text-sm px-4 py-2 rounded transition-all ${speciality === 'Neurologist' ? 'bg-[#22C55E]/10' : ''}  text-[#22C55E] font-semibold`}
            >
              Neurologist
            </button>
            <button
              onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}
              className={`whitespace-nowrap border border-[#02f95daf] text-sm px-4 py-2 rounded-md transition-all ${speciality === 'Gastroenterologist' ? 'bg-[#22C55E]/10' : ''}   text-[#22C55E] font-semibold`}
            >
              Gastroenterologist
            </button>
          </div>
        </div>
      </div>

      {/* Right Doctor Grid (unchanged) */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-8">
          {
            filterDoc.map((item) => (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                key={item._id}
                className="bg-white rounded-lg overflow-hidden border border-[#02f95daf] cursor-pointer hover:scale-105 duration-300 transition-all"
              >
                {/* Doctor Image */}
                <div className="aspect-[4/5] bg-[#22C55E]/10 relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Available Badge */}
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow-sm">
                      <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
                      <span className="text-xs text-[#22C55E] font-medium">Available</span>
                    </div>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.speciality}
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors

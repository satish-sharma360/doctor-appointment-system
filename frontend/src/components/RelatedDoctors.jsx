import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality,docId}) => {

    const navigate = useNavigate()
    const {doctors} = useContext(AppContext)
    const [related , setRelated] = useState([])

    const fetchRelated = async () =>{
        const relatedDoc = doctors.filter((item) => item.speciality === speciality && docId !== item._id)
        setRelated(relatedDoc)
    }

    useEffect(()=>{
        fetchRelated()
    },[doctors,speciality,docId])

  return (
    <>
        <h1 className='text-3xl font-medium text-center'>Top Doctors to Book</h1>
        <p className='text-center text-sm text-gray-600 my-1.5'>Simply browsr through our extensive list of trusted doctors.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8 mt-8">
          {related.map((doctor, index) => (
            <div onClick={()=>{navigate(`/appointment/${doctor._id}`); scrollTo(0,0)}} key={doctor._id} className="bg-white rounded-lg overflow-hidden border border-[#02f95daf] cursor-pointer hover:scale-105 duration-300 transition-all">
              {/* Doctor Image */}
              <div className="aspect-[4/5] light relative">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
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
                  {doctor.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {doctor.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
        </>
  )
}

export default RelatedDoctors

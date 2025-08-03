import React, { useContext } from 'react'
import { AdminContext } from '../../contaxt/AdminContext'
import { useEffect } from 'react'

const DoctorsList = () => {

  const {getAllDoctors,doctors,atoken,changeAvailability} = useContext(AdminContext)

  useEffect(() => {
  if (atoken) {
    getAllDoctors();
  }
}, [atoken]);



  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item,index)=>(
            <div key={index} className='border hover:scale-105 transition-all duration-300 border-[#00f2006f] rounded-xl max-w-56 overflow-hidden cursor-pointer'>
              <img className='light ' src={item.image} alt="" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='m-2 flex items-center gap-1 text-sm'>
                  <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available}/>
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList

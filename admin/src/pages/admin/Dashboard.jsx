import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../contaxt/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../contaxt/AppContext'

const Dashboard = () => {
  const {atoken,dashBoard, getDashData,cancelAppointment} = useContext(AdminContext)
  const {formentDate} = useContext(AppContext)
  useEffect(()=>{
    if (atoken) {
      getDashData()

    }
  },[atoken])
  return dashBoard && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <p className='text-2xl'>🧑‍⚕️</p>
          <p className='text-xl font-semibold to-gray-600'>{dashBoard.doctors}</p>
          <p className='text-gray-400'>Doctors</p>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <p className='text-2xl'>📅</p>
          <p className='text-xl font-semibold to-gray-600'>{dashBoard.appointment}</p>
          <p className='text-gray-400'>Appointment</p>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <p className='text-2xl'>🧑</p>
          <p className='text-xl font-semibold to-gray-600'>{dashBoard.patients}</p>
          <p className='text-gray-400'>Patients</p>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 p-4 mt-10 rounded-t border border-gray-200'>
          <p className='text-3xl'>📅</p>
          <p className='font-semibold'>Latest Booking</p>
        </div>

        <div className='pt-4 border border-t-0 border-gray-200'>
          {
            dashBoard.latestAppointments.map((item,index)=>(
              <div className='flex items-center px-6 py-3 hover:bg-gray-100' key={index}>
                <img className='w-10 rounded-full' src={item.docData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-600'>{formentDate(item.slotDate)}</p>
                </div>
                 {
                  item.cancelled? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  :<p onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer'>X</p>
                  }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
          
export default Dashboard

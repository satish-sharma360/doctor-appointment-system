import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../contaxt/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../contaxt/AppContext'

const AllApointment = () => {

  const {getAllAppointment,appointment,atoken,cancelAppointment} = useContext(AdminContext)
  const {calculateAge,formentDate} = useContext(AppContext)
  useEffect(()=>{
    if(atoken){
      getAllAppointment()
    }
  },[atoken])
  

  return (
    <div className='w-full max-w-6xl m-5'>
      <h1 className='mb-3 text-lg font-medium'>AllApointment</h1>

      <div className='bg-white border border-[#00ff08] rounded min-h-[60vh] text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b light border-[#00ff08]'>
          <p className='text-black'>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & time</p>
          <p>Doctor</p>
          <p>Fees </p>
          <p>Action</p>
        </div>
        {
          appointment.map((item,index)=>(
            <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center px-6 py-3 border-b border-[#00ff08] hover:bg-[#00ff0814]'>
              <p className='max-sm:hidden'>{index+1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userData.image} alt="" />
                <p>{item.userData.name}</p>
              </div>
              <p>{calculateAge(item.userData.dob)}</p>
              <p>{formentDate(item.slotDate)} & {item.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.docData.image} alt="" />
                <p>{item.docData.name}</p>
              </div>
              <p>₹{item.amount}</p>
              {
              item.cancelled? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : item.isCompleted?<p className='text-gray-500 text-xs fonme '>Completed</p> :<img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cross_icon} alt="" />
              }
              
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AllApointment

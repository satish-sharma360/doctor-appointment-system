import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-[#02f95daf] font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>12345 South Delhi <br /> New Delhi 11003</p>
          <p className='text-gray-500'>Tel:(91) 111-222 <br />Email:abcd@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600'>CAREERS AT HEALPOINT</p>
          <p className='text-gray-500'>Learn more about out teams and job opening</p>
          <button className='px-8 py-4 text-sm border border-[#22C55E] hover:scale-105'>Explore Jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact

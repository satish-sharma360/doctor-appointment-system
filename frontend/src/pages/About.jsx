import React from 'react'
import { assets } from '../assets/assets'


const About = () => {
  return (
    <div>
      {/* Title */}
      <div className="text-center text-2xl pt-10 text-gray-500">
        <h2 className="text-3xl md:text-4xl font-medium text-gray-700">
          ABOUT <span className="font-bold">US</span>
        </h2>
      </div>

      {/* Main Content: Image and Text */}
      <div className="">
        {/* Image */}
        <div className="my-10 flex flex-col gap-12 md:flex-row">
          <img
            src={assets.about_image} // replace with your image
            alt="HealPoint Team"
            className="w-full md:max-w-[360px]"
          />
          <div className='flex flex-col justify-center gap-6  text-gray-600'>
            <p>
            Welcome to <strong>HealPoint</strong>, your trusted partner in managing your healthcare needs conveniently and efficiently.
            At HealPoint, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            HealPoint is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service.
            Whether you're booking your first appointment or managing ongoing care, HealPoint is here to support you every step of the way.
          </p>

          {/* Vision Section */}
          <div>
            <h4 className="font-semibold text-lg text-gray-800 mb-1">Our Vision</h4>
            <p>
              Our vision at HealPoint is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>
          </div>
        </div>

        </div>
        <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-800">Why Choose Us</h3>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div className=" borderr p-6 rounded text-center border border-[#22C55E]">
          <h4 className="text-xl font-semibold text-gray-500 mb-2">24/7 Availability</h4>
          <p className="text-gray-400 text-sm">
            Book appointments anytime, day or night. We’re always here for you.
          </p>
        </div>

        {/* Feature 2 */}
        <div className=" borderr p-6 rounded text-center border border-[#22C55E]">
          <h4 className="text-xl font-semibold text-gray-500 mb-2">Personalization</h4>
          <p className="text-gray-400 text-sm">
            Get matched with doctors based on your health needs and preferences.
          </p>
        </div>

        {/* Feature 3 */}
        <div className=" borderr p-6 rounded text-center border border-[#22C55E]">
          <h4 className="text-xl font-semibold text-gray-500 mb-2">Efficiency</h4>
          <p className="text-gray-400 text-sm">
            Skip long waits. Schedule and manage appointments in just a few taps.
          </p>
        </div>
          
        </div>
      </div>
  )
}

export default About

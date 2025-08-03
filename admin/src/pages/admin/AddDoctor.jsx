import React from "react";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../../contaxt/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {

    const [docImg,setDocImg] = useState(false)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [experience,setExperience] = useState('1 Year')
    const [fees,setFees] = useState('')
    const [about,setAbout] = useState('')
    const [speciality,setSpeciality] = useState('General physician')
    const [degree,setDegree] = useState('')
    const [address1,setAddress1] = useState('')
    const [address2,setAddress2] = useState('')

    const {atoken,backendUrl} = useContext(AdminContext)

    const onSubmitHandler = async (e) =>{
        e.preventDefault()

        try {
            if (!docImg) {
                return toast.error('Image not Selected')
            }
            const formData = new FormData()

            formData.append('image',docImg)
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('experience',experience)
            formData.append('fees',Number(fees))
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('degree',degree)
            formData.append('address',JSON.stringify({line1:address1,line2:address2}))

            // Console log formData
            formData.forEach((value,key)=>{
                console.log(`${key} : ${value}`)
            })

            const {data} = await axios.post(backendUrl + '/api/admin/add-doctor' , formData,{headers:{atoken}})

            if(data.success){
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setAbout('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setEmail('')
                setPassword('')
                setFees('')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
  <p className="mb-3 text-lg font-medium text-gray-800">Add Doctor</p>

  <div className="bg-white px-4 md:px-8 py-8 border border-[#00ff5e] rounded-md max-w-screen-lg mx-auto">
    {/* Upload Section */}
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 text-gray-700">
      <label htmlFor="doc-img" className="cursor-pointer">
        {
            docImg ? <img
      src={URL.createObjectURL(docImg)}
      alt="Doctor Preview"
      className="rounded-full w-20 h-20 object-cover"
    /> : <svg
          className="bg-[#00ff5e14] rounded-full w-20 h-20 p-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#A0A0A0"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 16V4" />
          <path d="M8 8l4-4 4 4" />
          <rect x="4" y="16" width="16" height="4" rx="1" />
        </svg>
        }
      </label>
      <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
      <p className="text-sm text-center sm:text-left">
        Upload doctor <br /> picture
      </p>
    </div>

    {/* Form Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-gray-700">
      {/* Column 1 */}
      <div className="space-y-4">
        <div>
          <p>Doctor name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" required className="border border-[#0cf400f4] rounded px-3 py-2" />
        </div>

        <div>
          <p>Doctor Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Your email" required className="border border-[#0cf400f4] rounded px-3 py-2" />
        </div>

        <div>
          <p>Doctor Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required className="border border-[#0cf400f4] rounded px-3 py-2" />
        </div>

        <div>
          <p>Experience</p>
          <select onChange={(e) => setExperience(e.target.value)} value={experience} className="border border-[#0cf40069] p-2">
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={`${i + 1} Year`}>{`${i + 1} Year`}</option>
            ))}
          </select>
        </div>

        <div>
          <p>Fees</p>
          <input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder="Your fees" required className="border border-[#0cf400f4] rounded px-3 py-2" />
        </div>
      </div>

      {/* Column 2 */}
      <div className="space-y-4">
        <div>
          <p>Speciality</p>
          <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="border border-[#0cf40069] p-2">
            <option>General physician</option>
            <option>Gynecologist</option>
            <option>Dermatologist</option>
            <option>Pediatricians</option>
            <option>Neurologist</option>
          </select>
        </div>

        <div>
          <p>Education</p>
          <input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" placeholder="Education" required className="border border-[#0cf400f4] rounded px-3 py-2" />
        </div>

        <div className="flex flex-col gap-4">
          <p>Address</p>
          <input onChange={(e) => setAddress1(e.target.value)} value={address1} type="text" placeholder="Address 1" required className="border border-[#0cf400f4] rounded px-3 py-2" />
          <input onChange={(e) => setAddress2(e.target.value)} value={address2} type="text" placeholder="Address 2" required className="border border-[#0cf400f4] rounded px-3 py-2" />
        </div>
      </div>
    </div>

    {/* About Section */}
    <div className="mt-6">
      <p>About me</p>
      <textarea onChange={(e) => setAbout(e.target.value)} value={about}
        rows={5}
        placeholder="Write about yourself"
        required
        className="input w-full p-2 border border-[#0cf40069]"
      />
    </div>

    {/* Submit Button */}
    <div className="mt-6">
      <button
        type="submit"
        className="cursor-pointer primary text-white text-sm px-10 py-2 rounded-full"
      >
        Add Doctor
      </button>
    </div>
  </div>
</form>

  );
};

export default AddDoctor;

import React from 'react'
import {assets} from '../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../contaxt/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../contaxt/DoctorContext'

const Login = () => {

    const [state,setState] = useState('Admin')

    const {setAtoken,backendUrl} =  useContext(AdminContext)
    const {dtoken,setDtoken} = useContext(DoctorContext)

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const onSubmitHnadler = async (e) =>{
        e.preventDefault()
        try {
            if (state === 'Admin') {
                const {data} = await axios.post(backendUrl + '/api/admin/login' ,{email,password})
                if (data.success) {
                    localStorage.setItem('atoken',data.token)
                    setAtoken(data.token)
                    
                }else{
                    toast.error(data.message)
                }
            }else{
                // Doctor Api Login
                const {data} = await axios.post(backendUrl + '/api/doctor/login' ,{email,password})
                if (data.success) {
                    localStorage.setItem('dtoken',data.token)
                    setDtoken(data.token)
                }else{
                    toast.error(data.message)
                }

            }
        } catch (error) {
            
        }
    }

  return (
    <form onSubmit={onSubmitHnadler} className='h-screen flex items-center justify-center'>
        <div className='flex flex-col gap-3 items-start rounded p-8  border border-[#00f83e] text-[#5E5E5E] text-sm shadow-lg'>
            <p className='text-2xl font-semibold mx-auto'>{state} <span className='text-[#00f83e]'>Login</span></p>
            <div>
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#00f83e] light rounded w-full p-2 mt1' type="email" required/>
            </div>
            <div>
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#00f83e] light rounded w-full p-2 mt1' type="password" required/>
            </div>
            <button className='bg-[#00f83e] text-white w-full py-2 rounded-md text-base'>Login</button>
            {
                state === 'Admin' ? <p>Doctor Login ? <span className='cursor-pointer text-[#00f83e] underline' onClick={() => setState('Doctor')}>Click here</span></p> 
                                    : <p>Admin Login ? <span className='cursor-pointer text-[#00f83e] underline' onClick={() => setState('Admin')}>Click here</span></p>
            }
        </div>
    </form>
  )
}

export default Login

import React, { useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate()

  const {backendUrl,token,setToken} = useContext(AppContext)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [state,setState] = useState('Sign Up')



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password } = formData;
    try {

      if(state === 'Sign Up'){
        const {data} = await axios.post(backendUrl + '/api/user/register' ,{name:fullName,email,password})
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }else{ // if state not 'Sign Up
        const {data} = await axios.post(backendUrl + '/api/user/login' ,{email,password})
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(()=>{
    if (token) {
      navigate('/');
    }
  },[token])


  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded max-w-md w-full border border-[#22C55E]">
        <h2 className="text-2xl font-bold text-center mb-2">
          {state === 'Sign Up' ? 'Create an Account' : 'Login to Your Account'}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please {state === 'Sign Up' ? 'Sign Up' : 'Login'} to book appointment
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {state === 'Sign Up' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border-1 border-[#22c55e92] rounded-md focus:outline-none focus:ring-1 focus:ring-[#22C55E]"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border-1 border-[#22c55e92] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#22C55E]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border-1 border-[#22c55e92] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#22C55E]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#22C55E] text-white py-2 rounded-md hover:bg-[#22C55E] transition"
          >
            {state}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {state === 'Sign Up'
            ? 'Already have an account? '
            : "Don't have an account? "}
          <button
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
            className="text-[#22C55E] font-medium hover:underline ml-1"
          >
            {state === 'Sign Up' ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login

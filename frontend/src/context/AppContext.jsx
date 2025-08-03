import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";


export const AppContext = createContext()

const AppContextProvider = (props) =>{

    const currency = '₹'
    const [doctors,setDoctors] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getDoctorsData = async () =>{
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getDoctorsData()
    },[])

    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const [userData ,setUserData] = useState(false)

    const loadUserProfileData = async () =>{
        try {
            const {data} = await axios.get(backendUrl+'/api/user/get-profile' ,{headers: {Authorization: `Bearer ${token}`}})
            if(data.success){
                setUserData(data.userData)
            }
        } catch (error) {
             console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if (token) {
            loadUserProfileData()
        }else{
            setUserData(false)
        }
    },[token])


    const value = {
        doctors,
        currency,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
        getDoctorsData
    }

    return (
        <AppContext.Provider value={ value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider

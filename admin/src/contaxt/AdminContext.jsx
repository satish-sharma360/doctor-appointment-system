import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) =>{

    const [atoken,setAtoken] = useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):"")
    const [doctors,setDoctors] = useState([])
    const [appointment,setAppointment] = useState([])
    const [dashBoard,setDashBoard] = useState(false)


    const backendUrl = import.meta.env.VITE_BACKEND_URL


    const getAllDoctors = async () =>{
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-doctors',{},{headers:{atoken}})
            if (data.success) {
                setDoctors(data.doctors)
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const changeAvailability = async (docId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/change-availability' , {docId} ,{headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(error.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointment = async () =>{
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/appointments' ,{headers:{atoken}})

            if(data.success){
                setAppointment(data.appointments)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) =>{
        try {
            const {data} = await axios.post(backendUrl +'/api/admin/cancel-appointment',{appointmentId}, {headers:{atoken}})
            if (data.success) {
                toast.success(data.message)
                getAllAppointment()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashData = async () =>{
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{atoken}})
            if (data.success) {
                setDashBoard(data.dashData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        atoken,
        setAtoken,
        backendUrl,
        getAllDoctors,
        doctors,
        setDoctors,
        changeAvailability,
        getAllAppointment,
        appointment,
        setAppointment,
        cancelAppointment,
        dashBoard,
        getDashData
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
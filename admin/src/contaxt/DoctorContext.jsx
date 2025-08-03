import axios from "axios";
import { createContext,useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) =>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL
   const [dtoken,setDtoken] = useState(localStorage.getItem('dtoken')?localStorage.getItem('dtoken'):"")
   const [appointments,setAppointments] = useState([])
   const [profileData,setProfileData] = useState(false)

   const getAppointments = async () =>{
    try {
        const {data} = await axios.get(backendUrl +'/api/doctor/appointments' ,{headers:{dtoken}})
        if(data.success){
            setAppointments(data.appointments.reverse())
            console.log(data.appointments.reverse())
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
   }
    
   const completeAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      backendUrl + '/api/doctor/complete-appointments',
      { appointmentId }, 
      { headers: { dtoken } }
    );

    if (data.success) {
      toast.success(data.message);
      getAppointments();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};



   const cancelAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      backendUrl + '/api/doctor/cancel-appointments',
      { appointmentId }, 
      { headers: { dtoken } }
    );

    if (data.success) {
      toast.success(data.message);
      getAppointments();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


const getProfileData = async () =>{
    try {
        const {data} = await axios.get(backendUrl +'/api/doctor/profile',{headers:{dtoken}})
    if (data.success) {
      setProfileData(data.profileData)
      console.log(data.profileData)
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
}

    const value = {
        backendUrl,
        dtoken,
        setDtoken,
        getAppointments,
        appointments,
        setAppointments,
        completeAppointment,
        cancelAppointment,


        getProfileData,
        profileData,
        setProfileData
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointment = () => {
  const { backendUrl, token ,getDoctorsData} = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const getUserAppointment = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/appointment`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointment();
      console.log(appointments)
    }
  }, [token]);

 const cancelAppointment = async (appointmentId) => {
  console.log("Sending cancel request for ID:", appointmentId);
  try {
    const { data } = await axios.post(
      backendUrl + '/api/user/cancel-appointment',
      { appointmentId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Backend responded with:", data); // Add this

    if (data.success) {
      toast.success(data.message);
      getUserAppointment();
      getDoctorsData()
    } else {
      toast.warn(data.message);
    }
  } catch (error) {
    console.log("Request error:", error);
    toast.error(error.message);
  }
};


  return (
    <div>
      <h2 className="pb-3 mt-12 font-medium text-zinc-700 border-b border-[#22C55E]">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500 mt-4">No appointments found.</p>
      ) : (
        appointments.map((item, index) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-[#22C55E]"
          >
            <div>
              <img
                className="w-32 light rounded border-1 border-[#22C55E]"
                src={item.docData.image}
                alt={item.docName}
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-bold">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-800 font-medium mt-1">Address</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-sm text-neutral-700 font-medium">
                Date & Time{" "}
                <span className="text-xs ml-1">
                  {item.slotDate} || {item.slotTime}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border border-[#22C55E] rounded cursor-pointer hover:text-white hover:bg-[#22C55E]">
                Pay Online
              </button>}
              {!item.cancelled  && !item.isCompleted &&
              <button onClick={()=>cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border border-[#22C55E] rounded cursor-pointer hover:bg-red-600 hover:border-0 hover:text-white">
                Cancel Appointment
              </button>}
              {item.cancelled && <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">Appointment Cancelled</button>}
              {item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Appointment Completed</button>}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAppointment;

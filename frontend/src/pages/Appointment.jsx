import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const navigate = useNavigate();
  const { docId } = useParams();
  const { doctors, currency, backendUrl, token } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  const daysWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docIslot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const doc = doctors.find((item) => item._id === docId);
    setDocInfo(doc);
  };

  const getAvailableSlot = async () => {
    const slotsPerDay = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0); // 9:00 PM

      if (i === 0) {
        const now = new Date();
        currentDate.setHours(now.getHours() >= 10 ? now.getHours() + 1 : 10);
        currentDate.setMinutes(now.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const slotArray = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

        const slotDateKey = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
        const isBooked = docInfo?.slotsBook?.[slotDateKey]?.includes(formattedTime);

        slotArray.push({
          datetime: new Date(currentDate),
          time: formattedTime,
          isBooked, // pass booking status here
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slotsPerDay.push(slotArray);
    }

    setDocSlot(slotsPerDay);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book appointment');
      return navigate('/login');
    }

    if (!slotTime) {
      toast.error('Please select a time slot before booking.');
      return;
    }

    const date = docIslot[slotIndex][0].datetime;
    const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        navigate('/my-appointment');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 400) {
        // Show user-friendly message for already booked slot
        toast.warning('This time slot is already booked. Please select another time.');
      } else {
        // Handle other errors
        toast.warning('Something went wrong. Please try again later.');
      }
    } else {
      // Non-Axios error
      toast.warning('An unexpected error occurred.');
    }
  }
    
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlot();
  }, [docInfo]);

  if (!docInfo) return null;

  return (
    <div className="flex flex-col">
      {/* ---------Doctor Details---------------- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="border border-[#02f95daf] rounded">
          <img className="light w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="" />
        </div>

        <div className="flex-1 border border-[#02f95daf] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img className="w-5 ml-2" src={assets.verified_icon} alt="" />
          </p>

          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="py-0.5 px-2 border border-[#02f95daf] text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>

          <div>
            <p className="flex items-center gap-1 text-sm mt-3 font-medium text-gray-900">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Appointment fee: {currency}{docInfo.fees}
          </p>
        </div>
      </div>

      {/* --------Booking Slots-------- */}
      <div className="sm:ml-72 sm:pl-4 mt-6 font-medium text-gray-700">
        <p>Booking Slots</p>

        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docIslot.map((item, index) => (
            <div
              onClick={() => setSlotIndex(index)}
              key={index}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer 
                ${slotIndex === index ? 'light text-black' : 'border border-[#02f95daf]'}`}
            >
              <p>{item[0] && daysWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docIslot[slotIndex]?.map((item, index) => (
            <p
              key={index}
              onClick={() => {
                if (!item.isBooked) setSlotTime(item.time);
              }}
              className={`text-sm font-light px-3 py-2 flex-shrink-0 rounded-full cursor-pointer 
                ${item.isBooked
                  ? 'bg-gray-300 text-white cursor-not-allowed'
                  : slotTime === item.time
                  ? 'bg-green-400 text-black'
                  : 'text-gray-600 border border-[#02f95daf]'
                }`}
            >
              {item.isBooked ? 'Slot Booked' : item.time}
            </p>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          disabled={!slotTime}
          className={`primary text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer transition-all duration-200 ${
            !slotTime ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
          }`}
        >
          Book an Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;

import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../contaxt/DoctorContext";
import { useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../../contaxt/AppContext";

const DoctorAppointment = () => {
  const {
    getAppointments,
    appointments,
    dtoken,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);
  const formatShortDate = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(Number(timestamp));

    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    getAppointments();
  }, [dtoken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <h1 className="mb-3 text-lg font-medium">Doctor Appointment</h1>
      <div className="bg-white border border-[#00ff08] rounded min-h-[50vh] text-sm max-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b light border-[#00ff08]">
          <p className="text-black">#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & time</p>
          <p>Fees </p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b border-[#26fd00] hover:bg-[#26fd0011]"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.nme}</p>
            </div>
            <div>
              <p className="text-xs inline border border-[#26fd00] px-2 rounded-full">
                {item.payment ? "ONLINE" : "CASH"}
              </p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>{formatShortDate(item.date)}</p>
            <p>₹{item.amount}</p>
            <div className="flex">
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500-400 text-xs font-medium">Completed</p>
              ) : (
                <div className="w-10 cursor-pointer flex">
                  <svg
                    onClick={() => cancelAppointment(item._id)}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="green"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <svg
                    onClick={() => completeAppointment(item._id)}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 6L18 18"
                      stroke="red"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M6 18L18 6"
                      stroke="red"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const { doctors } = useContext(AppContext);

  const navigate = useNavigate();
  const [visible, setVisible] = useState(10);

  const displayDoctor = doctors.slice(0, visible);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
            Top Doctors to Book
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          {displayDoctor.map((doctor, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${doctor._id}`);
                scrollTo(0, 0);
              }}
              key={doctor._id}
              className="bg-white rounded-lg overflow-hidden border border-[#02f95daf] cursor-pointer hover:scale-105 duration-300 transition-all"
            >
              {/* Doctor Image */}
              <div className="aspect-[4/5] light relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />

                {/* Available Badge */}
                <div className="absolute bottom-3 left-3">
                  <div className="flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow-sm">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        doctor.available ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></div>
                    <span
                      className={`text-xs font-medium ${
                        doctor.available ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {doctor.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {doctor.name}
                </h3>
                <p className="text-sm text-gray-600">{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>

        {/* More Button */}
        <div className="text-center">
          <button
            onClick={() => {
              navigate("/doctors");
              scrollTo(0, 0);
            }}
            className="bg-[#02f95d6b] text-black px-8 py-3 rounded-lg font-medium hover:bg-[#02f95d9a] transition-colors"
          >
            more
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopDoctors;

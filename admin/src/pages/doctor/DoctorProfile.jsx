import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../contaxt/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { backendUrl, getProfileData, profileData, setProfileData, dtoken } = useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
  try {
    const updateData = {
      address: profileData[0].address,
      fees: profileData[0].fees,
      available: profileData[0].available,
    };

    const { data } = await axios.post(
      backendUrl + "/api/doctor/update-profile",
      updateData, // <-- send data here!
      { headers: { dtoken } }
    );

    if (data.success) {
      toast.success(data.message);
      setIsEdit(false);
      getProfileData(); // refresh updated info
    } else {
      toast.error(data.message || "Update failed");
    }
  } catch (error) {
    toast.error(error.message || "Something went wrong");
    console.error(error);
  }
};


  useEffect(() => {
    getProfileData();
  }, [dtoken]);

  // Guard if profileData not loaded yet
  if (!profileData || profileData.length === 0) return null;

  // Helper to update nested value
  const updateField = (field, value) => {
    const updated = [...profileData];
    updated[0][field] = value;
    setProfileData(updated);
  };

  const updateAddress = (lineKey, value) => {
    const updated = [...profileData];
    updated[0].address[lineKey] = value;
    setProfileData(updated);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 items-start bg-white shadow-md rounded-lg p-6">
        {/* Profile Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={profileData[0].image}
            alt="Doctor"
            className="rounded-lg w-48 h-48 object-cover border border-gray-200"
          />
        </div>

        {/* Doctor Info */}
        <div className="w-full md:w-2/3 space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {profileData[0].name}
            </h2>
            <p className="text-gray-600">
              {profileData[0].degree} — {profileData[0].speciality}
            </p>
            <span className="inline-block mt-1 text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full">
              {profileData[0].experience}
            </span>
          </div>

          {/* About */}
          <div>
            <p className="font-semibold text-gray-700">About:</p>
            <p className="text-sm text-gray-600">{profileData[0].about}</p>
          </div>

          {/* Appointment Fee */}
          <div>
            <p className="font-semibold text-gray-700">Appointment Fee:</p>
            {isEdit ? (
              <input
                type="number"
                value={profileData[0].fees}
                onChange={(e) => updateField("fees", e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 w-32"
              />
            ) : (
              <p className="text-green-600 font-bold text-lg">₹{profileData[0].fees}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <p className="font-semibold text-gray-700">Address:</p>
            <p className="text-sm text-gray-600">
              {isEdit ? (
                <>
                  <input
                    type="text"
                    value={profileData[0].address.line1}
                    onChange={(e) => updateAddress("line1", e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 w-full mb-2"
                  />
                  <input
                    type="text"
                    value={profileData[0].address.line2}
                    onChange={(e) => updateAddress("line2", e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 w-full"
                  />
                </>
              ) : (
                <>
                  {profileData[0].address.line1} <br />
                  {profileData[0].address.line2}
                </>
              )}
            </p>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={profileData[0].available}
              onChange={(e) => isEdit && updateField("available", e.target.checked)}
              className="accent-green-500"
              disabled={!isEdit}
            />
            <label className="text-sm text-gray-700">Available</label>
          </div>

          {/* Edit / Save Buttons */}
          <div className="flex gap-3">
            {!isEdit ? (
              <button
                onClick={() => setIsEdit(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={updateProfile}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEdit(false);
                    getProfileData(); // reset to original data
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md transition"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;

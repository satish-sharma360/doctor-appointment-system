import React from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AdminContext } from "./contaxt/AdminContext";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import {Routes,Route} from 'react-router-dom'
import Dashboard from "./pages/admin/Dashboard";
import AllApointment from "./pages/admin/AllApointment";
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorsList from "./pages/admin/DoctorsList";
import { DoctorContext } from "./contaxt/DoctorContext";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorAppointment from "./pages/doctor/DoctorAppointment";

const App = () => {
  const { atoken } = useContext(AdminContext);
  const {dtoken} = useContext(DoctorContext)

  return atoken || dtoken ? (
    <div className="bg-[#00ff5e07]">
      <ToastContainer />
      <Navbar/>
      <div className="flex items-start">
        <Sidebar/>
        <Routes>
          {/* Admin Route */}
          <Route path="/" element={<></>}/>
          <Route path="/admin-dashboard" element={<Dashboard/>}/>
          <Route path="/all-appointment" element={<AllApointment/>}/>
          <Route path="/add-doctor" element={<AddDoctor/>}/>
          <Route path="/doctor-list" element={<DoctorsList/>}/>

          {/* Doctor Route */}
          <Route path="/doctor-profile" element={<DoctorProfile/>}/>
          <Route path="/doctor-appointment" element={<DoctorAppointment/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;

import express from 'express';
import { appointsDoctors, doctorList, loginDoctor,appointmentComplete,appointmentCancel, updateDoctorProfile, doctorProfile } from '../controllers/doctor.controller.js'
import authDoctor from '../middleware/authdoctor.js';


const doctorRouts = express.Router()

doctorRouts.get('/list',doctorList)
doctorRouts.post('/login',loginDoctor)
doctorRouts.get('/appointments',authDoctor,appointsDoctors)
doctorRouts.post('/complete-appointments',authDoctor,appointmentComplete)
doctorRouts.post('/cancel-appointments',authDoctor,appointmentCancel)
doctorRouts.post('/update-profile',authDoctor,updateDoctorProfile)
doctorRouts.get('/profile',authDoctor,doctorProfile)

export default doctorRouts
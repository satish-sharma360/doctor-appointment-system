import express from 'express'
import { addDoctor ,adminDashboard,allDoctor,appointmentAdmin,appointmentCancel,loginAdmin } from '../controllers/admin.controller.js'
import upload from '../middleware/multer.js'
import multer from 'multer'
import authAdmin from '../middleware/authadmin.js'
import { changeAvailability } from '../controllers/doctor.controller.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin ,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctor)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter

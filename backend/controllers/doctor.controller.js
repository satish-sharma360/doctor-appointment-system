import doctorModel from "../models/doctor.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointment.model.js"
import mongoose from "mongoose"


const changeAvailability = async (req,res) =>{
    try {

        const {docId} = req.body

        const docData = await doctorModel.findById(docId)

        await doctorModel.findByIdAndUpdate(docId,{available : !docData.available})
        res.json({success:true,message:'Availability Changed'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const doctorList = async (req,res) =>{
    try {
        const doctors = await doctorModel.find({}).select('-password,-email')
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Api for Doctor Login
const loginDoctor = async (req,res) =>{
    try {
        const {email,password} = req.body;

        const doctor  = await doctorModel.findOne({email})

        if (!doctor) {
            return res.json({success:false,message:'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)
        if (isMatch) {
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            return res.json({success:false,message:'Invalid credentials'})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Api for get ll Appointment for dontor panel

const appointsDoctors = async (req, res) => {
    try {
        const docId = req.user.id;

        const appointments = await appointmentModel.find({ doctorId: new mongoose.Types.ObjectId(docId) });

        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Api mark completed
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.user.id;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.doctorId.toString() === docId.toString()) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true
      });
      res.json({ success: true, message: 'Appointment marked as completed' });
    } else {
      res.json({ success: false, message: 'Mark failed: unauthorized or not found' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// Api mar cancel
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.user.id;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.doctorId.toString() === docId.toString()) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true
      });
      res.json({ success: true, message: 'Appointment cancelled' });
    } else {
      res.json({ success: false, message: 'Cancellation failed: unauthorized or not found' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//Get doctor profile
const doctorProfile = async (req,res) =>{
    try {
        const docId = req.user.id; 

        const profileData = await doctorModel.find({_id: docId}).select('-password')

        res.json({success:true,profileData})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Update doctor profile data
const updateDoctorProfile = async (req,res) =>{
    try {
        const docId = req.user.id; 

        const {fees,address,available} = req.body;

        await doctorModel.findByIdAndUpdate(docId,{fees,address,available})

        res.json({success:true,message:'Profile Updated'})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {changeAvailability,doctorList,loginDoctor,appointsDoctors,appointmentComplete,appointmentCancel,updateDoctorProfile,doctorProfile}
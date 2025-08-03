import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctor.model.js';
import appointmentModel from '../models/appointment.model.js';
import userModel from '../models/user.model.js';




// Api for adding doctor
const addDoctor = async (req,res) =>{
    try {
       const { name, email, password, speciality, degree, experience, fees, address,about} = req.body;
       const imageFile = req.file

       //Chicking for all data to add doctor
       if(!name || !email || !password || !imageFile || !speciality || !degree || !experience || !fees || !address){
            return res.json({success:false,message:"Missing Details"})
       }

       // Chick Email  Validator using Validator package    
       if (!validator.isEmail(email)) {
         return res.json({success:false,message:"Please Enter a valid Email"})
       }

       // Validating Strong Pasword   
       if (password.length < 8) {
         return res.json({success:false,message:"Please Enter a Strong Password"})
       }

    //    Password hashing
       const hashPassword = await bcrypt.hash(password , 10)

    //    upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
        name,
        email,
        image:imageUrl,
        password:hashPassword,
        speciality,
        degree,
        experience,
        about,
        fees,
        address:JSON.parse(address),
        date:Date.now()
    }

    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()

       res.status(200).json({ message: 'Doctor added', success:true });
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Api For admin Login

const loginAdmin = async (req,res) =>{
    try {
        const {email,password} = req.body
        console.log('Received:', email, password);
    console.log('Expected:', process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:'Invalid Credentials'})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Api for get all doctors
const allDoctor = async (req,res) =>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to get all appointment list

const appointmentAdmin = async (req,res) =>{
    try {

        const appointments = await appointmentModel.find({})

        res.json({success:true,appointments})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Api for appointment cancillation
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.json({ success: false, message: "Appointment ID is required" });
    }

    // 1. Find the appointment
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // 2. Cancel the appointment
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // 3. Extract doctor ID
    const docId = appointmentData.doctorId || appointmentData.docId || appointmentData.doctor;
    if (!docId) {
      return res.json({ success: false, message: "Doctor ID missing from appointment" });
    }

    // 4. Find the doctor
    const doctorData = await doctorModel.findById(docId);
    if (!doctorData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // 5. Parse the slotDate (e.g. "1_8_2025")
    const { slotDate, slotTime } = appointmentData;

    function parseCustomDate(dateStr) {
      const parts = dateStr.split('_');
      if (parts.length !== 3) return null;
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return isNaN(date.getTime()) ? null : date;
    }

    const parsedDate = parseCustomDate(slotDate);
    if (!parsedDate) {
      return res.json({ success: false, message: "Invalid slotDate format" });
    }

    const slotDateKey = parsedDate.getTime().toString();

    // 6. Safely access and modify slotsBooked
    let slotsBooked = doctorData.slotsBooked || {};

    console.log("Doctor slot keys:", Object.keys(slotsBooked));
    console.log("Looking for:", slotDateKey);

    if (!slotsBooked[slotDateKey]) {
      return res.json({ success: false, message: "Slot date not found for doctor" });
    }

    slotsBooked[slotDateKey] = slotsBooked[slotDateKey].filter(time => time !== slotTime);

    // Optional: if all times are removed for the day, delete the key
    if (slotsBooked[slotDateKey].length === 0) {
      delete slotsBooked[slotDateKey];
    }

    // 7. Update doctor's booked slots
    await doctorModel.findByIdAndUpdate(docId, { slotsBooked });

    return res.json({ success: true, message: "Appointment cancelled successfully" });

  } catch (error) {
    console.error("Error cancelling appointment:", error);
    return res.json({ success: false, message: error.message });
  }
};

// Api for get Dasgboard data for admin panel
const adminDashboard = async (req,res) =>{
    try {
        const doctors = await doctorModel.find({});
        const user = await userModel.find({})
        const appointment = await appointmentModel.find({})

        const dashData = {
            doctors : doctors.length,
            appointment : appointment.length,
            patients :  user.length,
            latestAppointments : appointment.reverse().slice(0,5)
        }
        res.json({success:true,dashData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export {addDoctor ,loginAdmin ,allDoctor,appointmentAdmin,appointmentCancel,adminDashboard}



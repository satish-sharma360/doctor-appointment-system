import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/user.model.js";
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctor.model.js";
import appointmentModel from "../models/appointment.model.js";


// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const hashedPassword = await bcrypt.hash(password, 10)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID not found" });
        }

        const userData = await userModel.findById(userId).select('-password');

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, userData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Api for update user profile
const updateProfile = async (req, res) => {

    try {

        const { name, phone, address, dob, gender } = req.body;
        const userId = req.user.userId; // from token

        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Api to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const userId = req.user.userId;

    if (!slotTime || !slotDate || !docId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Fetch doctor info
    const docData = await doctorModel.findById(docId).select('-password');
    if (!docData || !docData.available) {
      return res.status(400).json({ success: false, message: 'Doctor not available' });
    }

    // Helper to parse your custom slotDate format "1_8_2025"
    function parseCustomDate(dateStr) {
      if (!dateStr) return null;
      const parts = dateStr.split('_');
      if (parts.length !== 3) return null;

      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // JS months are zero-based
      const year = parseInt(parts[2], 10);

      const date = new Date(year, month, day);
      return isNaN(date.getTime()) ? null : date;
    }

    const parsedDate = parseCustomDate(slotDate);
    if (!parsedDate) {
      return res.status(400).json({ success: false, message: 'Invalid slotDate format' });
    }
    const slotDateKey = parsedDate.getTime().toString();

    // Check if the slot is already booked in appointment collection
    const existingAppointment = await appointmentModel.findOne({
      doctorId: docId,
      slotDate,
      slotTime,
      cancelled: false,
    });
    if (existingAppointment) {
      return res.status(400).json({ success: false, message: 'This slot is already booked' });
    }

    // Check slotsBooked on doctor document
    let slotsBooked = docData.slotsBooked || {};
    if (!slotsBooked[slotDateKey]) slotsBooked[slotDateKey] = [];

    if (slotsBooked[slotDateKey].includes(slotTime)) {
      return res.status(400).json({ success: false, message: 'This slot is already booked (doctor record)' });
    }

    // Add the slotTime to doctor's booked slots
    slotsBooked[slotDateKey].push(slotTime);

    // Fetch user info
    const userData = await userModel.findById(userId).select('-password');
    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Create new appointment document
    const appointmentData = {
      doctorId: docId,
      userId,
      userData,
      docData,
      slotTime,
      slotDate,
      date: Date.now(),
      amount: docData.fees,
    };

    await new appointmentModel(appointmentData).save();

    // Update doctor's slotsBooked
    await doctorModel.findByIdAndUpdate(docId, { slotsBooked });

    return res.status(200).json({ success: true, message: 'Appointment Booked' });
  } catch (error) {
    console.error('bookAppointment Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Api to get  appointment

const listAppointment = async (req, res) => {
  try {
    const userId = req.user.userId;

    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment

const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.user.userId;

    console.log("Cancel request for appointment:", appointmentId, "by user:", userId);

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      console.log("Appointment not found");
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.userId.toString() !== userId) {
      console.log("Unauthorized access by user:", userId);
      return res.json({ success: false, message: "Unauthorized action" });
    }

    // Mark appointment as cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Extract doctor ID (try multiple fields if needed)
    const docId = appointmentData.docId || appointmentData.doctorId || appointmentData.doctor;
    if (!docId) {
      console.log("Doctor ID missing in appointment");
      return res.json({ success: false, message: "Doctor ID missing from appointment" });
    }

    const doctorData = await doctorModel.findById(docId);
    if (!doctorData) {
      console.log("Doctor not found for ID:", docId);
      return res.json({ success: false, message: "Doctor not found" });
    }

    // Helper to parse your custom slotDate format
    function parseCustomDate(dateStr) {
      if (!dateStr) return null;
      const parts = dateStr.split('_');
      if (parts.length !== 3) return null;

      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);

      const date = new Date(year, month, day);
      return isNaN(date.getTime()) ? null : date;
    }

    const { slotTime, slotDate } = appointmentData;
    const parsedDate = parseCustomDate(slotDate);

    if (!parsedDate) {
      console.log("Invalid slotDate format:", slotDate);
      return res.json({ success: false, message: "Invalid slotDate format" });
    }

    const slotDateKey = parsedDate.getTime().toString();

    let slotsBooked = doctorData.slotsBooked;
    if (!slotsBooked || typeof slotsBooked !== 'object' || Array.isArray(slotsBooked)) {
      slotsBooked = {};
    }

    console.log("Doctor slot dates keys:", Object.keys(slotsBooked));
    console.log("Looking for slotDateKey:", slotDateKey);

    if (!slotsBooked[slotDateKey]) {
      return res.json({ success: false, message: "Slot date not found for doctor" });
    }

    // Remove the slotTime from booked slots
    slotsBooked[slotDateKey] = slotsBooked[slotDateKey].filter(e => e !== slotTime);

    await doctorModel.findByIdAndUpdate(docId, { slotsBooked });

    console.log("Slot released successfully");

    return res.json({ success: true, message: 'Appointment cancelled' });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    return res.json({ success: false, message: error.message });
  }
};



export {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment
}
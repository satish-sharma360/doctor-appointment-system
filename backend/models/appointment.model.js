import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
    userId: { 
        type: String,
        required: true 
    },
    doctorId: {
        type: String,
        required: true
    },
    slotTime: {
        type: String,
        required: true
    },
    slotDate: {
        type: String,
        required: true
    },  // Add this field!
    userData: {
        type: Object,
        required: true
    },
    docData: {
        type: Object,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    slotsBooked: {
        type: Object,
        default: {}
    },

    cancelled: {
        type: Boolean,
        default: false
    },
    payment: {
        type: Boolean,
        default: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    },

})

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema)
export default appointmentModel
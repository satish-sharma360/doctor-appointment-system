import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/admin.routes.js'
import doctorRouts from './routes/doctors.route.js'
import userRouter from './routes/user.routes.js'

// app Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Middleware
app.use(express.json())
app.use(cors())

// api endPoint
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouts)
app.use('/api/user',userRouter)

app.get('/api/admin/doctors', async (req, res) => {
  res.send('Welcome ')
});


app.get('/',(req,res) =>{
    res.send('hello HealPoint api')
})

app.listen(port,(req,res)=>{
    console.log(`Server running at port ${port} `)
})
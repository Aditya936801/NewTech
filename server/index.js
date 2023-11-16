import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import mongoose from "mongoose"
import morgan  from "morgan"
import adminRouter from "./routes/Admin.js"
import studentRouter from "./routes/Student.js"



/* Configuration */ 


dotenv.config()
const app = express()
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())


/* Routes */
app.use("/admin",adminRouter)
app.use("/student",studentRouter)



/* Moongose */
const PORT = process.env.PORT || 3001
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>{console.log(`Server Port : ${PORT}`)})
}).catch((err)=>console.log(err))
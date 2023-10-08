import express from "express"
import { createStudent,updateStudent,getStudents,deleteStudent } from "../controllers/studentCRUD.js"

const studentRouter = express.Router()


studentRouter.post("/createStudent",createStudent)
studentRouter.post("/updateStudent",updateStudent)
studentRouter.post("/deleteStudent",deleteStudent)
studentRouter.get("/getStudents",getStudents)


export default studentRouter
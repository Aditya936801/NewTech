import express from "express"
import { createStudent } from "../controllers/studentCRUD.js"

const studentRouter = express.Router()


studentRouter.post("/createStudent",createStudent)


export default studentRouter
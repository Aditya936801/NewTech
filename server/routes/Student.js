import express from "express"
import {verifyMasterToken} from "../middleware/auth.js"
import { createStudent } from "../controllers/studentCRUD.js"

const studentRouter = express.Router()


studentRouter.post("/createStudent",createStudent)


export default studentRouter
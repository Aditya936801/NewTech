import express from "express"
import {login,sendOtp} from "../controllers/auth.js"
import {createAdmin,getAdmin} from "../controllers/adminCRUD.js"

const adminRouter = express.Router()

adminRouter.post("/",login)
adminRouter.post("/sendOtp",sendOtp)
adminRouter.post("/login",login)
adminRouter.post("/createAdmin",createAdmin)
adminRouter.get("/getAdmin",getAdmin)

export default adminRouter
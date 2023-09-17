import express from "express"
import {login,sendOtp} from "../controllers/auth.js"
import {createAdmin,getAdmin,deleteAdmin,updateAdmin} from "../controllers/adminCRUD.js"
import {verifyMasterToken} from "../middleware/auth.js"

const adminRouter = express.Router()

adminRouter.post("/sendOtp",sendOtp)
adminRouter.post("/login",login)
adminRouter.post("/createAdmin",verifyMasterToken,createAdmin)
adminRouter.post("/updateAdmin",verifyMasterToken,updateAdmin)
adminRouter.post("/deleteAdmin",verifyMasterToken,deleteAdmin)
adminRouter.get("/getAdmin",verifyMasterToken,getAdmin)

export default adminRouter
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin:null,
    token:null,
    snackbar:{
        open:false,
        message:"",
        severity:"",
    },
    
    
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.admin = action.payload.admin
            state.token = action.payload.token
        },
        setLogut:(state)=>{
            state.admin = null
            state.token = null
        },
        setSnackbar:(state,action)=>{
            state.snackbar={...state.snackbar,...action.payload.snackbar}
        },
      
    }
   
})


export const {setLogin,setLogut,setSnackbar} = authSlice.actions
export default authSlice.reducer
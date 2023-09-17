import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin: {},
    token: '',
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.admin = action.payload.admin
            state.token = action.payload.token
        },
        setLogout:(state)=>{
            state.admin = {}
            state.token = ""
        },
      
    }
   
})


export const {setLogin,setLogout} = authSlice.actions
export default authSlice.reducer
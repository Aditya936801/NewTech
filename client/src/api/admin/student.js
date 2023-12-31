import {BASE_URL} from "../common/constant"
import axios from "axios"
import {store} from "../../store"
import { getToken } from "../../store/auth/authSelector"
const endpoints ={
    create:"/student/createStudent",
    get:"/student/getStudents",
    update:"/student/updateStudent",
    delete:"/student/deleteStudent",
}

export const get_students = async()=>{
    const state = store.getState()
    const token = getToken(state)
      const response = await axios.get(BASE_URL + endpoints.get,{headers:{Authorization:"Bearer "+token}});
      return response
  
  }

  export const create_student = async(newRow)=>{
    const state = store.getState()
    const token = getToken(state)
      const response = await axios.post(BASE_URL + endpoints.create,
      newRow,{headers:{Authorization:"Bearer "+token}}
    );
      return response
  
  }

  export const update_student = async(row)=>{
    const state = store.getState()
    const token = getToken(state)
      const response = await axios.post(BASE_URL + endpoints.update,
      row,{headers:{Authorization:"Bearer "+token}}
    );
      return response
  
  }

  export const delete_student = async(_id)=>{
    const state = store.getState()
    const token = getToken(state)
      const response = await axios.post(BASE_URL + endpoints.delete,
      {_id},{headers:{Authorization:"Bearer "+token}}
    );
      return response
  }
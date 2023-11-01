import {BASE_URL} from "../common/constant"
import axios from "axios"
import {store} from "../../store"
import { getToken } from "../../store/auth/authSelector"
const endpoints ={
    create:"/admin/createAdmin",
    get:"/admin/getAdmins",
    update:"/admin/updateAdmin",
    delete:"/admin/deleteAdmin",
}

export const get_admins = async()=>{
  const state = store.getState()
  const token = getToken(state)
    const response = await axios.get(BASE_URL + endpoints.get,{headers:{Authorization:"Bearer "+token}});
    return response

}
export const create_admin = async(newRow)=>{
  const state = store.getState()
  const token = getToken(state)
    const response = await axios.post(BASE_URL + endpoints.create,
    newRow,{headers:{Authorization:"Bearer "+token}}
  );
    return response

}
export const update_admin = async(row)=>{
  const state = store.getState()
  const token = getToken(state)
    const response = await axios.post(BASE_URL + endpoints.update,
    row,{headers:{Authorization:"Bearer "+token}}
  );
    return response

}
export const delete_admin = async(_id)=>{
  const state = store.getState()
  const token = getToken(state)
    const response = await axios.post(BASE_URL + endpoints.delete,
    {_id},{headers:{Authorization:"Bearer "+token}}
  );
    return response

}
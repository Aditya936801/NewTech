import {BASE_URL} from "../common/constant"
import axios from "axios"
const endpoints ={
    create:"/admin/createAdmin",
    get:"/admin/getAdmin",
    update:"/admin/updateAdmin",
    delete:"/admin/deleteAdmin",
}

export const get_admin = async()=>{
    const response = await axios.get(BASE_URL + endpoints.get);
    return response

}
export const create_admin = async(newRow)=>{
    const response = await axios.post(BASE_URL + endpoints.create,
    newRow
  );
    return response

}
export const update_admin = async(row)=>{
    const response = await axios.post(BASE_URL + endpoints.update,
    row
  );
    return response

}
export const delete_admin = async(row)=>{
    const response = await axios.post(BASE_URL + endpoints.delete,
    row
  );
    return response

}
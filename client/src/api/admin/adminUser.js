import {BASE_URL} from "../common/constant"
import axios from "axios"
const endpoints ={
    create:"/admin/createAdmin",
    get:"/admin/getAdmin"
}

export const adminGet = async()=>{
    const response = await axios.get(BASE_URL + endpoints.get);
    return response

}
export const adminCreate = async(newRow)=>{
    const response = await axios.post(BASE_URL + endpoints.create,
    newRow
  );
    return response

}
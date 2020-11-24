import axios from "axios";
import { API_URL } from "../constants/config";
import {authHeader} from "./helpers";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export default function callApi(url, method = 'GET', data = null){
    axios.interceptors.response.use((response) => {
        return response
    }, error => {
        if(error.response.status === 401 && error.response.data.name === "TokenExpiredError") {
            // axios.post(`${API_URL + '/auth/refreshToken'}`, {refreshToken: cookie.get("refreshToken")}).then(res => {
            //     console.log(res)
            // }).catch(error => {
            //     console.log(error)
            // })
        }
        return Promise.reject(error);;
    });

    return axios({
        url: `${API_URL}/${url}`,
        method: method,
        data: data,
        headers: authHeader()
    });
}
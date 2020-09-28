import axios from "axios";
import { API_URL } from "../constants/config";

export default function callApi(url, method = 'GET', data = null){
    return axios({
        url: `${API_URL}/${url}`,
        method: method,
        data: data
    }).catch((error) => {
        console.log(error);
    })
}
import axios from "axios";
import { API_URL } from "../constants/config";
import {authHeader} from "./helpers";

export default function callApi(url, method = 'GET', data = null){
    return axios({
        url: `${API_URL}/${url}`,
        method: method,
        data: data,
        headers: authHeader()
    });
}
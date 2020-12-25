import axios from "axios";
import { API_URL } from "../constants/config";
import {authHeader} from "./helpers";
import Cookie from "universal-cookie";
import Swal from 'sweetalert2';
import store from "../store";
import {actionToggleLoading} from "../actions/loading";
import {decode} from "jsonwebtoken";

const cookie = new Cookie();

function swal() {
    Swal.fire(
        'Phiên đăng nhập đã hết hạn!',
        'Làm mới phiên đăng nhập!',
        'error'
    ).then(() => {
        store.dispatch(actionToggleLoading(true));
        setTimeout(() => {
            axios.post(`${API_URL + '/auth/refreshToken'}`, {refreshToken: cookie.get("refreshToken")})
                .then(res => {
                    cookie.set("token", res.data)
                    window.location.reload()
                    store.dispatch(actionToggleLoading(false));
                    return Promise.resolve('Làm mới phiên thành công')
                }).catch(error => {
                store.dispatch(actionToggleLoading(false));
                console.log(error)
            })
        }, 1500);
    })
}

export default function callApi(url, method = 'GET', data = null){
    axios.interceptors.request.use(function (config) {
        const token = cookie.get("token");
        const decoded = decode(token, {complete: true});
        if(!token || (Date.now() < new Date(decoded.payload.exp))) swal();
        return config;
    });
    axios.interceptors.response.use((response) => {
        return response
    }, error => {
        if(error.response.status === 401 && error.response.data.name === "TokenExpiredError") swal();
        return Promise.reject(error);;
    });

    return axios({
        url: `${API_URL}/${url}`,
        method: method,
        data: data,
        headers: authHeader()
    });
}
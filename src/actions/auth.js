import callApi from "../utils/api";
import { decode } from "jsonwebtoken";
import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from "../constants/ActionTypes";
import Cookie from "universal-cookie";
const cookie = new Cookie();
export const actionLogin = (data) => {
    return (dispatch) => {
        return callApi('users/login', 'POST', data)
            .then(res => {
                const { user } = decode(res.data.token);
                localStorage.setItem("user", JSON.stringify(user));
                dispatch({type: LOGIN_SUCCESS, user:{isLoggedIn:true, user}})
                cookie.set("token", res.data.token);
                cookie.set("refreshToken", res.data.refreshToken);
                return Promise.resolve('Đăng nhập thành công');
            }).catch(error => {
                dispatch({
                    type: 'FAILURE'
                });
                return Promise.reject(error.response.data);
            });;
    }
};

export const actionLogout = () => {
    return (dispatch) => {
        cookie.remove("token");
        cookie.remove("refreshToken");
        localStorage.removeItem("user");
        dispatch({type: LOGOUT_SUCCESS, user: {user: null,isLoggedIn: false}});
        return Promise.resolve('Đăng xuất thành công');
    }
}
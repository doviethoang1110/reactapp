import callApi from "../utils/api";
import { decode } from "jsonwebtoken";
import {
    EDIT_PROFILE,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from "../constants/ActionTypes";
import Cookie from "universal-cookie";
import socket from "../utils/socket";
const cookie = new Cookie();

export const actionLogin = (data) => {
    return (dispatch) => {
        return callApi('auth/login', 'POST', data)
            .then(res => {
                const { user } = decode(res.data.token);
                localStorage.setItem("user", JSON.stringify(user));
                dispatch({type: LOGIN_SUCCESS, user:{user}});
                socket.emit("SET_USER_ID", user.id)
                // cookie.set("socket", socket.id);
                cookie.set("token", res.data.token, {maxAge: 3600});
                cookie.set("refreshToken", res.data.refreshToken, {maxAge: 86400});
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
        dispatch({type: LOGOUT_SUCCESS, user: {user: null}});
        return Promise.resolve('Đăng xuất thành công');
    }
}

export const actionEditProfile = (id, data) => {
    return (dispatch) => {
        return callApi(`users/${id}`, 'POST', data)
            .then(res => {
                const user = JSON.parse(localStorage.getItem("user"));
                user.userDetail = res.data;
                localStorage.setItem("user", JSON.stringify(user));
                dispatch({type: EDIT_PROFILE, user: {user}});
                return Promise.resolve('Cập nhật thành công');
            }).catch(error => {
                dispatch({
                    type: 'FAILURE'
                });
                return Promise.reject(error.response.data);
            })
    }
}
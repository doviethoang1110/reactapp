import {
    LOGIN_SUCCESS, LOGOUT_SUCCESS
} from '../constants/ActionTypes';
const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...action.user};
        case LOGOUT_SUCCESS:
            return {...action.user};
        default:
            return {...state};
    }
};


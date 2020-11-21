import {
    LOGIN_SUCCESS
} from '../constants/ActionTypes';
const initialState = {};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            state = action.brands;
            return [...state];
        default:
            return [...state];
    }
};


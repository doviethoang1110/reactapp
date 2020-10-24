import {ADD_BRAND_SUCCESS, GET_BRANDS, UPDATE_BRAND_SUCCESS} from '../constants/ActionTypes';
let initialState = [];

export const brands = (state = initialState, action) => {
    switch (action.type) {
        case GET_BRANDS:
            state = action.brands;
            return [...state];
        case ADD_BRAND_SUCCESS:
            state.push(action.brand);
            return [...state];
        case UPDATE_BRAND_SUCCESS:
            state[state.indexOf(state.find(s => s._id === action.brand._id))] = action.brand;
            return [...state];
        default:
            return [...state];
    }
};

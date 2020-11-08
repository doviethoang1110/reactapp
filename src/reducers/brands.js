import {
    ADD_BRAND_SUCCESS,
    DELETE_BRAND_SUCCESS,
    GET_BRANDS,
    RESTORE_BRAND_SUCCESS,
    UPDATE_BRAND_SUCCESS
} from '../constants/ActionTypes';
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
            state[state.indexOf(state.find(s => s.id === action.brand.id))] = action.brand;
            return [...state];
        case RESTORE_BRAND_SUCCESS:
            state.push(action.brand);
            return [...state];
        case DELETE_BRAND_SUCCESS:
            state.splice(state.find(s => s.id === action.brand),1);
            return [...state];
        default:
            return [...state];
    }
};

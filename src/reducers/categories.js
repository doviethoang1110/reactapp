import {
    ADD_CATEGORY_SUCCESS, DELETE_CATEGORY_SUCCESS,
    GET_CATEGORIES,
    RESTORE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_SUCCESS
} from '../constants/ActionTypes';
let initialState = [];

export const categories = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            state = action.categories;
            return [...state];
        case ADD_CATEGORY_SUCCESS:
            state.push(action.category);
            return [...state];
        case UPDATE_CATEGORY_SUCCESS:
            state[state.indexOf(state.find(s => s._id === action.category._id))] = action.category;
            return [...state];
        case RESTORE_CATEGORY_SUCCESS:
            state.push(action.category);
            return [...state];
        case DELETE_CATEGORY_SUCCESS:
            state.splice(state.indexOf(state.find(s => s.id === action.category)),1);
            return [...state];
        default:
            return [...state];
    }
};

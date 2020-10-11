import { ADD_CATEGORY_SUCCESS, GET_CATEGORIES, UPDATE_CATEGORY_SUCCESS } from '../constants/ActionTypes';
let initialState = [];

export const categories = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            state = action.categories;
            return [...state];
        case ADD_CATEGORY_SUCCESS:
            return [...state];
        case UPDATE_CATEGORY_SUCCESS:
            // state.push(action.category)
            return [...state];
        default:
            return [...state];
    }
};

import { ADD_CATEGORY_SUCCESS, GET_CATEGORIES } from '../constants/ActionTypes';
let initialState = [];

export const categories = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            state = action.categories;
            return [...state];
        case ADD_CATEGORY_SUCCESS:
            state = action.categories;
            state.push(action.category)
            return [...state];
        default:
            return [...state];
    }
};

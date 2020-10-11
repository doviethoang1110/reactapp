import { TOGGLE_LOADING } from '../constants/ActionTypes';
let initialState = false

export const loading = (state = initialState, action) => {
    if (action.type === TOGGLE_LOADING) {
        state = !state;
        return state;
    } else {
        return state;
    }
};

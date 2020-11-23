import {
    TOGGLE_GRANT
} from '../constants/ActionTypes';

const initialState = false;

export const grant = (state = initialState, action) => {
    if (action.type === TOGGLE_GRANT) {
        state = action.payload;
        return state;
    } else return state;
};


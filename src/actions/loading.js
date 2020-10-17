import { TOGGLE_LOADING } from "../constants/ActionTypes";

export const actionToggleLoading = (status) => ({
    type: TOGGLE_LOADING,
    payload: status
});
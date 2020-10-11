import { TOGGLE_LOADING } from "../constants/ActionTypes";

export const actionTurnOnLoading = () => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_LOADING,
            payload: true
        })
    }
}
export const actionTurnOffLoading = () => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_LOADING,
            payload: false
        })
    }
}
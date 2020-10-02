import { ADD_CATEGORY_SUCCESS, GET_CATEGORIES } from '../constants/ActionTypes';
import callApi from "../utils/api";

export const actionGetCategories =
    () =>
        (dispatch) => callApi('categories')
            .then(response => {
                dispatch({
                    type: GET_CATEGORIES,
                    categories: response.data
                })
            });

export const actionAddCategory =
    (category) =>
        (dispatch) =>
            callApi('categories', 'POST', category)
                .then(response => {
                    dispatch({
                        type: ADD_CATEGORY_SUCCESS,
                        category: response.data,
                    });
                    return Promise.resolve('Added successfully');
                })
                .catch(error => {
                    dispatch({
                        type: 'FAILURE'
                    });
                    return Promise.reject(error.response.data);
                });
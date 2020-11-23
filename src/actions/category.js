import {
    ADD_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_SUCCESS,
    GET_CATEGORIES,
    DELETE_CATEGORY_SUCCESS, RESTORE_CATEGORY_SUCCESS
} from '../constants/ActionTypes';
import callApi from "../utils/api";

export const actionGetCategories = () => {
    return (dispatch) => {
        return callApi('categories')
            .then(response => {
                dispatch({
                    type: GET_CATEGORIES,
                    categories: response.data
                })
            }).catch((error => {
            dispatch({
                type: 'FAILURE'
            });
            return Promise.reject(error);
        }));
    }
};

export const actionStoreCategory = (category) => {
    return (dispatch) => {
        return callApi('categories', 'POST', category)
            .then(response => {
                dispatch({
                    type: ADD_CATEGORY_SUCCESS,
                    category: response.data,
                });
                return Promise.resolve({message:'Added successfully',id:undefined});
            })
            .catch(error => {
                dispatch({
                    type: 'FAILURE'
                });
                return Promise.reject(error);
            });
    }
}

export const actionUpdateCategory = (id,category) => {
    return (dispatch) => {
        return callApi(`categories/${id}`, 'PUT', category)
            .then(response => {
                dispatch({
                    type: UPDATE_CATEGORY_SUCCESS,
                    category: response.data,
                });
                return Promise.resolve({message:'Update successfully',id:response.data.id});
            })
            .catch(error => {
                console.log(error)
                console.log(error.message)
                dispatch({
                    type: 'FAILURE'
                });
                return Promise.reject(error);
            });
    }
}
export const actionDeleteCategory = (id) => {
    return (dispatch) => {
        return callApi(`categories/${id}`, 'PATCH')
            .then(response => {
                dispatch({
                    type: DELETE_CATEGORY_SUCCESS,
                    category: id
                });
                return Promise.resolve("Delete successfully");
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: 'FAILURE'
                });
                return Promise.reject(error);
            });
    }
}
export const actionRestoreCategory = (id) => {
    return (dispatch) => {
        return callApi(`categories/restore/${id}`, 'PATCH')
            .then(response => {
                dispatch({
                    type: RESTORE_CATEGORY_SUCCESS,
                    category: response.data,
                });
                return Promise.resolve("Restore successfully");
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: 'FAILURE'
                });
                return Promise.reject(error);
            });
    }
}
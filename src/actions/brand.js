import callApi from "../utils/api";
import {
    ADD_BRAND_SUCCESS,
    DELETE_BRAND_SUCCESS,
    GET_BRANDS,
    RESTORE_BRAND_SUCCESS,
    UPDATE_BRAND_SUCCESS
} from "../constants/ActionTypes";

export const actionGetBrands = () => {
    return (dispatch) => {
         return callApi('brands')
            .then(response => {
                dispatch({
                    type: GET_BRANDS,
                    brands: response.data
                });
                return Promise.resolve();
            }).catch((error => {
                 dispatch({
                     type: 'FAILURE'
                 });
                 return Promise.reject(error);
             }));
    }
};

export const actionStoreBrand = (brand) => {
    return (dispatch) => {
        return callApi('brands', 'POST', brand)
            .then(response => {
                dispatch({
                    type: ADD_BRAND_SUCCESS,
                    brand: response.data,
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

export const actionUpdateBrand = (id,brand) => {
    return (dispatch) => {
        return callApi(`brands/${id}`, 'POST', brand,'multipart/form-data')
            .then(response => {
                dispatch({
                    type: UPDATE_BRAND_SUCCESS,
                    brand: response.data,
                });
                return Promise.resolve({message:'Update successfully',id:response.data.id});
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
export const actionDeleteBrand = (id) => {
    return (dispatch) => {
        return callApi(`brands/${id}`, 'PATCH')
            .then(response => {
                dispatch({
                    type: DELETE_BRAND_SUCCESS,
                    brand: id
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
export const actionRestoreBrand = (id) => {
    return (dispatch) => {
        return callApi(`brands/restore/${id}`, 'PATCH')
            .then(response => {
                dispatch({
                    type: RESTORE_BRAND_SUCCESS,
                    brand: response.data,
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
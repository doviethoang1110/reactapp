import callApi from "../utils/api";
import {ADD_BRAND_SUCCESS, GET_BRANDS, UPDATE_BRAND_SUCCESS} from "../constants/ActionTypes";

export const actionGetBrands = () => {
    return (dispatch) => {
         callApi('brands')
            .then(response => {
                dispatch({
                    type: GET_BRANDS,
                    brands: response.data
                })
            });
    }
};

export const actionStoreBrand = (brand) => {
    return (dispatch) => {
        return callApi('brands', 'POST', brand,'multipart/form-data')
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
                return Promise.reject(error.response.data);
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
                return Promise.resolve({message:'Update successfully',id:response.data._id});
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: 'FAILURE'
                });
                return Promise.reject(error.response.data);
            });
    }
}
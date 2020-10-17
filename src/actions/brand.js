import callApi from "../utils/api";
import {ADD_BRAND_SUCCESS, GET_BRANDS} from "../constants/ActionTypes";

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

// export const actionUpdateCategory = (id,category) => {
//     return (dispatch) => {
//         return callApi(`categories/${id}`, 'PUT', category)
//             .then(response => {
//                 dispatch({
//                     type: UPDATE_CATEGORY_SUCCESS,
//                     category: response.data,
//                 });
//                 return Promise.resolve({message:'Update successfully',id:response.data._id});
//             })
//             .catch(error => {
//                 console.log(error)
//                 console.log(error.message)
//                 dispatch({
//                     type: 'FAILURE'
//                 });
//                 return Promise.reject(error.response.data);
//             });
//     }
// }
import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import ProductList from "../components/product/ProductList";
import callApi from "../utils/api";
import store from "../store";
import {actionToggleLoading} from "../actions/loading";

const Products = (props) => {
    const getProducts = () => {
        store.dispatch(actionToggleLoading(true));
        setTimeout(() => {
            callApi('products')
                .then(response => {
                    store.dispatch(actionToggleLoading(false));
                    setProducts(response.data)
                })
                .catch(error => console.log(error));
        },1500)
    }
    const [products, setProducts] = useState([]);
    useEffect((props) => {
        getProducts();
    },[]);
    const refresh = (e) => {
        e.preventDefault();
        getProducts();
    }
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    <div className="card-header">
                        <NavLink to="/products/add" className="btn btn-success card-title">
                            <i className="fa fa-plus"></i> Add new
                        </NavLink>
                        <button onClick={(e) => refresh(e)} className="ml-2 btn btn-outline-primary card-title"><i className="fas fa-sync"></i> Refresh</button>
                        <div className="card-tools">
                            <div className="input-group input-group-sm" style={{ width: "150px" }}>
                                <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                                <div className="input-group-append">
                                    <button type="submit" className="btn btn-default">
                                        <i className="fas fa-search" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ProductList items={products}/>
            </div>
        </React.Fragment>
    );
}
export default Products;
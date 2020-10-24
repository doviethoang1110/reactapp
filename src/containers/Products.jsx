import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import ProductList from "../components/product/ProductList";
import callApi from "../utils/api";

const Products = (props) => {
    const [products, setProducts] = useState([]);
    useEffect((props) => {
        callApi('products')
            .then(response => setProducts(response.data))
            .catch(error => console.log(error));
    },[]);

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    <div className="card-header">
                        <NavLink to="/products/add" className="btn btn-success card-title">
                            <i className="fa fa-plus"></i> Add new
                        </NavLink>
                        <button className="ml-2 btn btn-outline-primary card-title"><i className="fas fa-sync"></i> Refresh</button>
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
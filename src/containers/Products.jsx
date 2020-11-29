import React, {useEffect, useState} from 'react';
import ProductList from "../components/product/ProductList";
import {actionToggleGrant} from "../actions/grant";
import {connect} from "react-redux";
import {calCurrentItems, getDatas, toastRoles} from "../utils/helpers";
import ProductFormAdd from "../components/product/ProductFormAdd";
import Product from "../models/Products";
import callApi from "../utils/api";
import {toast} from "../utils/alert";
import ProductRestore from "../components/product/ProductRestore";
import Pagination from "../components/Pagination";

const permissions = ['ADMIN_MANAGER','READ_PRODUCT'];

const Products = (props) => {

    const [products, setProducts] = useState([]);
    const [isForm, setIsForm] = useState(false);
    const [product, setProduct] = useState(new Product('',0,[],1,1,1,
        '<p>Đây là mô tả</p>',0,[],[]));
    const [isRestore, setIsRestore] = useState(false);
    const [productRestore, setProductRestore] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);

    const fetchDatas = () => {
        if(props.roles.some(r => permissions.includes(r))) {
            props.toggle(true)
            getDatas('products', setProducts);
        }else props.toggle(false)
    }

    const paginate = (e,page) => {
        e.preventDefault();
        setCurrentPage(page);
    }

    useEffect((props) => {
        fetchDatas();
    },[]);

    const refresh = (e) => fetchDatas();

    const restore = (id) => {
        if(window.confirm('Bạn có chắc không ?')) {
            callApi(`products/restore/${id}`, 'PATCH')
                .then(response => {
                    productRestore.splice(productRestore.indexOf(productRestore.find(b => b.id === id)),1);
                    products.push(response.data);
                    setProducts([...products]);
                    setProductRestore([...productRestore]);
                    toast('success','Restore successfully');
                })
                .catch(error => {
                    console.log(error)
                    toastRoles(error)
                    toast('error',error)
                });
        }
    }

    const remove = (id) => {
        if(window.confirm('Bạn có chắc không')) {
            callApi(`products/${id}`,'PATCH')
                .then(() => {
                    products.splice(products.indexOf(products.find(b => b.id === id)),1)
                    setProducts([...products]);
                    toast('success','Delete successfully');
                })
                .catch(error => {
                    console.log(error);
                    toast('error','Delete failure');
                    toastRoles(error)
                })
        }
    }

    const getRestore = () => {
        callApi('products/restore')
            .then(res => {
                setIsRestore(true);
                setProductRestore(res.data);
            })
            .catch(error => {
                toast('error', error);
                toastRoles(error)
            })
    }

    const back = () => {
        if(isForm) setIsForm(false);
        if(isRestore) setIsRestore(false);
    }

    const add = () => {
        setProduct(new Product('',0,[],1,1,1,
            '<p>Đây là mô tả</p>',0,[],[]));
        setIsForm(true);
    }

    return (
        <React.Fragment>
            {!props.grant ? (
                <div className='jumbotron'><h2>Bạn không có quyền</h2></div>
            ) : (
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-header">
                            {(!isForm) && (
                                <button onClick={add} className="btn btn-success card-title">
                                    <i className="fa fa-plus"></i> Add new
                                </button>
                            )}
                            <button onClick={refresh} className="ml-2 btn btn-outline-primary card-title"><i className="fas fa-sync"></i> Refresh</button>
                            <button onClick={getRestore} className="ml-2 btn btn-outline-warning card-title">
                                <i className="fa fa-trash-restore"></i> Restore
                            </button>
                            {(isForm || isRestore) && (
                                <button onClick={back} className="ml-2 btn btn-outline-dark card-title">
                                    <i className="fa fa-backward"></i> Back
                                </button>
                            )}
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
                    <div className={`card-body table-responsive p-0 col-md-12`}>
                        {
                            (isForm &&
                                (
                                    <ProductFormAdd item={product}/>
                                )
                            )
                            ||
                            (isRestore &&
                                (
                                    <ProductRestore items={productRestore} eventRestore={restore}/>
                                )
                            )
                            ||
                            (
                                <React.Fragment>
                                    <ProductList items={calCurrentItems(currentPage, products)} eventRemove={remove}/>
                                    <Pagination
                                        itemsPerPage={4}
                                        totalItems={products}
                                        currentPage={currentPage}
                                        changePage={paginate}
                                    />
                                </React.Fragment>
                            )
                        }
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

// redux map
const mapStateToProps = (state) => {
    return {
        roles: state.auth.user.roles,
        grant: state.grant
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggle:(grant) => {
            dispatch(actionToggleGrant(grant))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);

import React, { Component } from 'react';
import BrandList from "../components/brand/BrandList";
import { connect } from "react-redux";
import BrandForm from "../components/brand/BrandForm";
import {actionGetBrands, actionStoreBrand, actionUpdateBrand} from "../actions/brand";
import {actionToggleLoading} from "../actions/loading";
import store from '../store';
import Pagination from "../components/Pagination";

class Brands extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: { name: '', image: null, status: false },
            isOpened: false,
            currentPage: 1,
            itemsPerPage: 4
        }
    }
    componentDidMount() {
        this.props.getAllBrands();
    }
    addBrand = () => {
        this.setState({
            isOpened: true,
            brand: { name: '', image: null, status: false }
        })
    }

    editBrand = (id) => {
        this.setState({
            isOpened: true,
            brand: this.props.brands.find(b => b.id === id)
        })
    }

    refresh = () => {
        this.props.refresh();
    }

    closeForm = () => {
        this.setState({
            isOpened: false
        });
    }
    paginate = (e,page) => {
        e.preventDefault();
        this.setState({
            currentPage:page
        })
    }

    render() {
        let { brand, itemsPerPage, currentPage } = this.state;
        let { brands } = this.props;
        let lastItem = currentPage * itemsPerPage;
        let firstItem = lastItem - itemsPerPage;
        let currentItems = brands.slice(firstItem,lastItem);
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card-header">
                        <button className="btn btn-success card-title" onClick={this.addBrand}>
                            <i className="fa fa-plus"></i> Add new
                        </button>
                        <button onClick={this.refresh} className="ml-2 btn btn-outline-primary card-title">
                            <i className="fas fa-sync"></i> Refresh
                        </button>
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
                    {/* /.card */}
                </div>
                <div className={`card-body table-responsive p-0 ${this.state.isOpened ? 'col-md-7' : 'col-md-12'}`}>
                    <BrandList items={currentItems}
                                eventEdit={this.editBrand}
                    />
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={brands}
                        currentPage={currentPage}
                        changePage={this.paginate}
                    >
                    </Pagination>
                </div>
                {/* /.card-body */}
                {this.state.isOpened ? (
                    <div className='col-md-5 card-body'>
                        <BrandForm
                            closeForm={this.closeForm}
                            eventEdit={this.editBrand}
                            brand={brand}
                            submitHandle={this.props.storeBrand}
                        />
                    </div>
                ) : null}
            </div>
        );
    }
}
// Redux Map
const mapStateToProps = (state) => {
    return {
        brands: state.brands,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        refresh:() => {
            dispatch(actionToggleLoading(true))
            setTimeout(() => {
                dispatch(actionGetBrands());
                dispatch(actionToggleLoading(false))
            },1500);
        },
        getAllBrands: () => {
            if(store.getState().brands.length) {
                return;
            }else {
                dispatch(actionToggleLoading(true))
                setTimeout(() => {
                    dispatch(actionGetBrands());
                    dispatch(actionToggleLoading(false))
                },1500);
            }
        },
        storeBrand: (id,data) => {
            return dispatch(id ? actionUpdateBrand(id,data) : actionStoreBrand(data));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Brands);

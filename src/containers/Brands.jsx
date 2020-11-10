import React, { Component } from 'react';
import BrandList from "../components/brand/BrandList";
import { connect } from "react-redux";
import BrandForm from "../components/brand/BrandForm";
import {
    actionDeleteBrand,
    actionGetBrands,
    actionRestoreBrand,
    actionStoreBrand,
    actionUpdateBrand
} from "../actions/brand";
import {actionToggleLoading} from "../actions/loading";
import store from '../store';
import Pagination from "../components/Pagination";
import {toast} from "../utils/alert";
import BrandRestore from "../components/brand/BrandRestore";
import callApi from "../utils/api";

class Brands extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: { name: '', image: null, status: false },
            isOpened: false,
            currentPage: 1,
            itemsPerPage: 4,
            isRestore: false,
            brandRestore: []
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

    removeBrand = (id) => {
        if(window.confirm('Bạn có chắc không'))
            this.props.removeBrand(id)
            .then(res => toast('success',res))
            .catch(error => toast('error',error));
        else return;
    }

    refresh = () => {
        this.props.refresh();
    }
    getRestore = (status) => {
        callApi('brands/restore')
            .then(res => {
                this.setState({isRestore: status,brandRestore:res.data});
            })
            .catch(error => {
                console.log(error)
            })
    }
    hardRemove = (id) => {
        callApi(`brands/${id}`,'DELETE')
            .then(() => {
                let brands = [...this.state.brandRestore];
                brands.splice(brands.find(b => b.id === id),1);
                this.setState({brandRestore:brands});
                toast('success','Delete successfully');
            })
            .catch(error => {
                toast('error',error.response.data);
            })
    }
    restore = (e,status) => {
        e.preventDefault();
        if(this.state.isRestore || this.state.brandRestore.length) this.setState({isRestore:status});
        else this.getRestore(status);
    }
    restoreBrand = (id) => {
        this.props.restore(id)
            .then(res => {
                let brands = [...this.state.brandRestore];
                brands.splice(brands.find(b => b.id === id),1);
                this.setState({brandRestore:brands});
                toast('success',res);
            })
            .catch(error => toast('error',error));
    }
    remove = (id) => {
        if(window.confirm('Bạn có chắc không')) this.hardRemove(id);
        else return;
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
        let { brand, itemsPerPage, currentPage, isRestore, brandRestore } = this.state;
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
                        <button onClick={(e) => this.restore(e,true)} className="ml-2 btn btn-outline-warning card-title">
                            <i className="fa fa-trash-restore"></i> Restore
                        </button>
                        {isRestore && (
                            <button onClick={(e) => this.restore(e,false)} className="ml-2 btn btn-outline-dark card-title">
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
                    {/* /.card */}
                </div>
                <div className={`card-body table-responsive p-0 ${this.state.isOpened ? 'col-md-7' : 'col-md-12'}`}>
                    {isRestore ? (<BrandRestore
                        eventRestore={this.restoreBrand}
                        eventHardRemove={this.remove}
                        items={brandRestore}/>)
                        : (
                        <React.Fragment>
                            <BrandList items={currentItems}
                                       eventEdit={this.editBrand}
                                       eventRemove={this.removeBrand}
                            />
                            <Pagination
                                itemsPerPage={itemsPerPage}
                                totalItems={brands}
                                currentPage={currentPage}
                                changePage={this.paginate}
                            >
                            </Pagination>
                        </React.Fragment>
                    )}
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
        },
        removeBrand: (id) => {
            return dispatch(actionDeleteBrand(id));
        },
        restore: (id) => {
            return dispatch(actionRestoreBrand(id));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Brands);

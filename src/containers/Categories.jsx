import React, { Component } from 'react';
import CategoryList from '../components/category/CategoryList';
import CategoryForm from '../components/category/CategoryForm';
import "../components/category/Category.css";
import {
    actionDeleteCategory,
    actionGetCategories, actionRestoreCategory,
    actionStoreCategory,
    actionUpdateCategory
} from '../actions/category';
import { connect } from "react-redux";
import {actionToggleLoading} from "../actions/loading";
import store from "../store";
import {getCategories} from "../utils/helpers";
import callApi from "../utils/api";
import {toast} from "../utils/alert";
import CategoryRestore from "../components/category/CategoryRestore";

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: { name: '', parentId: 0, status: false },
            isOpened: false,
            isRestore: false,
            categoriesRestore: []
        }
    }
    componentDidMount() {
        this.props.getAllCategories();
    }
    addCategory = () => {
        this.setState({
            isOpened: true,
            category: { name: '', parentId: 0, status: false }
        })
    }

    editCategory = (id) => {
        this.setState({
            isOpened: true,
            category: this.props.categories.find(cat => cat.id === id)
        })
    }

    refresh = () => {
        this.props.refresh();
    }
    removeCategory = (id) => {
        if(window.confirm('Bạn có chắc không'))
            this.props.removeCategory(id)
                .then(res => toast('success',res))
                .catch(error => toast('error',error));
        else return;
    }

    getRestore = (status) => {
        callApi('categories/restore')
            .then(res => {
                this.setState({isRestore: status,categoriesRestore:res.data});
            })
            .catch(error => {
                console.log(error)
            })
    }
    restore = (e,status) => {
        e.preventDefault();
        if(this.state.isRestore || this.state.categoriesRestore.length) this.setState({isRestore:status});
        else this.getRestore(status);
    }
    restoreCategory = (id) => {
        this.props.restore(id)
            .then(res => {
                const categories = [...this.state.categoriesRestore];
                categories.splice(categories.find(c => c.id === id),1);
                this.setState({categoriesRestore:categories});
                toast('success',res);
            })
            .catch(error => toast('error',error));
    }

    closeForm = () => {
        this.setState({
            isOpened: false
        });
    }

    render() {
        let categories = getCategories(this.props.categories);
        let { category, isRestore, categoriesRestore } = this.state;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card-header">
                        <button className="btn btn-success card-title" onClick={this.addCategory}>
                            <i className="fa fa-plus"></i> Add new
                        </button>
                        <button onClick={this.refresh} className="ml-2 btn btn-outline-primary card-title"><i className="fas fa-sync"></i> Refresh</button>
                        <button onClick={(e) => this.restore(e,true)} className="ml-2 btn btn-outline-warning card-title"><i className="fa fa-trash-restore"></i> Restore</button>
                        {isRestore && (
                            <button onClick={(e) => this.restore(e,false)} className="ml-2 btn btn-outline-dark card-title"><i className="fa fa-backward"></i> Back</button>
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
                    {isRestore ? (<CategoryRestore
                            eventRestore={this.restoreCategory}
                            items={categoriesRestore}/>)
                        : (
                            <React.Fragment>
                                <div className="box">
                                    <div className="row">
                                        <div className="col-md-12 col-md-offset-1">
                                            <ul className="list-menu">
                                                <CategoryList items={categories} event={this.editCategory} eventRemove={this.removeCategory}/>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                </div>
                {/* /.card-body */}
                {this.state.isOpened ? (
                    <div className='col-md-5 card-body'>
                        <CategoryForm
                            treeData={categories}
                            eventEdit={this.editCategory}
                            category={category}
                            closeForm={this.closeForm}
                            submitHandle={this.props.storeCategory}/>
                    </div>
                ) : ('')}
            </div>
        );
    }
}
// Redux Map
const mapStateToProps = (state) => {
    return {
        categories: state.categories,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        refresh:() => {
            dispatch(actionToggleLoading(true))
            setTimeout(() => {
                dispatch(actionGetCategories());
                dispatch(actionToggleLoading(false))
            },2000);
        },
        getAllCategories: () => {
            if(store.getState().categories.length) {
                return;
            }else {
                dispatch(actionToggleLoading(true))
                setTimeout(() => {
                    dispatch(actionGetCategories());
                    dispatch(actionToggleLoading(false))
                },2000);
            }
        },
        storeCategory: (id,data) => {
            return dispatch(id ? actionUpdateCategory(id,data) : actionStoreCategory(data));
        },
        removeCategory: (id) => {
            return dispatch(actionDeleteCategory(id));
        },
        restore: (id) => {
            return dispatch(actionRestoreCategory(id));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
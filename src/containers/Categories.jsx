import React, { Component } from 'react';
import CategoryList from '../components/category/CategoryList';
import CategoryForm from '../components/category/CategoryForm';
import "../components/category/Category.css";
import {
    actionGetCategories,
    actionStoreCategory,
    actionUpdateCategory
} from '../actions/category';
import { connect } from "react-redux";
import {actionToggleLoading} from "../actions/loading";
import store from "../store";
import {getCategories} from "../utils/helpers";

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: { name: '', parentId: 0, status: false },
            isOpened: false
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

    closeForm = () => {
        this.setState({
            isOpened: false
        });
    }

    render() {
        let categories = getCategories(this.props.categories);
        let { category } = this.state;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card-header">
                        <button className="btn btn-success card-title" onClick={this.addCategory}>
                            <i className="fa fa-plus"></i> Add new
                        </button>
                        <button onClick={this.refresh} className="ml-2 btn btn-outline-primary card-title"><i className="fas fa-sync"></i> Refresh</button>
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
                    <div className="box">
                        <div className="row">
                            <div className="col-md-12 col-md-offset-1">
                                <ul className="list-menu">
                                    <CategoryList items={categories} event={this.editCategory} />
                                </ul>
                            </div>
                        </div>
                    </div>
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
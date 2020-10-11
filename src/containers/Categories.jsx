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
import {actionTurnOffLoading, actionTurnOnLoading} from "../actions/loading";
import store from "../store";

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
        let { categories } = this.props;
        const getCategoryById = function (categories, id) {
            if (categories && categories.length) {
                for (let cat of categories) {
                    if (cat.id === id) {
                        return cat;
                    }
                    let found = getCategoryById(cat.children, id);
                    if(found) return found;
                }
            };
        };
        let cat = getCategoryById(categories,id);
        this.setState({
            isOpened: true,
            category: cat
        })
    }
    closeForm = () => {
        this.setState({
            isOpened: false
        });
    }
    render() {
        let { categories } = this.props;
        let { category } = this.state;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card-header">
                        <button className="btn btn-success card-title" onClick={this.addCategory}>
                            <i className="fa fa-plus"></i> Add new
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
                        <CategoryForm treeData={categories} category={category} closeForm={this.closeForm} submitHandle={this.props.storeCategory}/>
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
        getAllCategories: () => {
            if(store.getState().categories.length) {
                return;
            }else {
                dispatch(actionTurnOnLoading())
                setTimeout(() => {
                    dispatch(actionGetCategories());
                    dispatch(actionTurnOffLoading())
                },2000);
            }
        },
        storeCategory: (id,data) => {
            return dispatch(id ? actionUpdateCategory(id,data) : actionStoreCategory(data));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
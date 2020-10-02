import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import "./Categories.css";
import CategoryForm from "./CategoryForm";
import { actionGetCategories } from '../actions/category';

// Parent Component
class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            value: undefined
        };
    }
    componentDidMount() {
        this.props.getAllCategories();
    }
    onChange = (value) => {
        console.log(value);
        this.setState({ value });
    };

    renderProducts = (categories) => {
        let results = null;
        if (categories.length > 0) {
            results = categories.map((category) => {
                return (
                    <tr>
                        <td>{category.id}</td>
                        <td>{category.label}</td>
                        <td>{category.slug}</td>
                        <td>
                            <span className="tag tag-success">Approved</span>
                        </td>
                        <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                    </tr>
                );
            });
        }
        return results;
    };
    render() {
        let { categories } = this.props;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card-header">
                        <button className="btn btn-success card-title">
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
                <div className="card-body table-responsive p-0 col-md-7">
                    <div className="box">
                        <div className="row">
                            <div className="col-md-12 col-md-offset-1">
                                <ul className="list-menu">
                                    <TreeComponent items={categories} />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /.card-body */}
                <div className="col-md-5 card-body">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Quick Example</h3>
                        </div>
                        <CategoryForm treeData={categories} />
                    </div>
                </div>
            </div>
        );
    }
}
class TreeComponent extends Component {

    toggle = (id, e) => {
        e.stopPropagation();
        let ele = document.getElementById(id);
        let style = e.target;
        if (ele) {
            if (ele.style.display === 'none') {
                style.className = 'fa fa-chevron-down'
                ele.style.display = 'block';
            } else {
                style.className = 'fa fa-chevron-right'
                ele.style.display = 'none';
            }
        } else {
            return false;
        }
    }
    render() {
        if (!this.props.items || !this.props.items.length) {
            return null;
        } else {
            return this.props.items.map((item, index) => (
                <li key={index}><i style={{ cursor: 'pointer' }} onClick={(e) => this.toggle(item.value, e)} className={item.children.length === 0 ? 'fa fa-minus' : 'fa fa-chevron-right'}></i> {item.title}
                    <div className={item.children.length === 0 ? 'button button1' : 'button'}>
                        <div><button style={{ marginRight: '5px' }} type="button" className="btn btn-warning"><i className="fa fa-pen"></i></button></div>
                        <div><button type="button" className="btn btn-danger"><i className="fa fa-trash"></i></button></div>
                    </div>
                    {item.children.length > 0 ? (<ul id={item.value} style={{ display: 'none', marginLeft: '50px' }}>
                        <TreeComponent items={item.children}></TreeComponent>
                    </ul>) : ''}
                </li>
            ));
        }
    }
}

// Redux Map
const mapStateToProps = (state) => {
    return {
        categories: state.categories,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        getAllCategories: () => {
            dispatch(actionGetCategories());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

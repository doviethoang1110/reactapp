import React, { Component } from "react";
import "antd/dist/antd.css";
import { TreeSelect } from "antd";
import { connect } from "react-redux";
import callApi from "../utils/api";
import "./Categories.css";

const mapStateToProps = (state) => {
    return {
        products: state.products,
    };
};
class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            value:undefined
        };
    }
    componentDidMount() {
        callApi("categories").then((response) => {
            this.setState({
                categories: response.data,
            });
        });
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
        // let { products } = this.state;
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
                                    <TreeComponent items={this.state.categories} />
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
                        <form>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputFile">Danh mục cha</label>
                                    <TreeSelect
                                        style={{ width: "100%" }}
                                        value={this.state.undefined}
                                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                                        treeData={this.state.categories}
                                        placeholder="Please select"
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">
                                        Check me out
                                    </label>
                                </div>
                            </div>
                            {/* /.card-body */}
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
class TreeComponent extends Component {
    render() {
        if (!this.props.items || !this.props.items.length) {
            return null;
        } else {
            return this.props.items.map((item, index) => (
                <li key={index}><span><i className={item.children.length === 0 ? 'fa fa-minus' : 'fa fa-chevron-right'}></i> {item.title}</span>
                    <div className={item.children.length === 0 ? 'button button1' : 'button'}>
                        <div><button type="button" className="btn btn-warning"><i className="fa fa-pen"></i></button></div>
                        <div><button type="button" className="btn btn-danger"><i className="fa fa-trash"></i></button></div>
                    </div>
                    {item.children.length > 0 ? (<ul id={item.title} className="myclass">
                        <TreeComponent items={item.children}></TreeComponent>
                    </ul>) : ''}
                </li>
            ));
        }
    }
}

export default connect(mapStateToProps, null)(Categories);

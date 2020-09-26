import React, { Component } from "react";
import "antd/dist/antd.css";
import { TreeSelect } from "antd";
import { connect } from "react-redux";
import axios from "axios";

const { TreeNode } = TreeSelect;
const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:4200/api/v1/categories')
      .then((response) => {
        this.setState({
          categories: response.data
        });
      })
      .catch((err) => console.log(err));
  }

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
            <td>
              Bacon ipsum dolor sit amet salami venison chicken flank fatback
              doner.
            </td>
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
              <div
                className="input-group input-group-sm"
                style={{ width: "150px" }}
              >
                <input
                  type="text"
                  name="table_search"
                  className="form-control float-right"
                  placeholder="Search"
                />
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
          <table className="table table-hover text-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Status</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>183</td>
                <td>John Doe</td>
                <td>11-7-2014</td>
                <td>
                  <span className="tag tag-success">Approved</span>
                </td>
                <td>
                  Bacon ipsum dolor sit amet salami venison chicken flank
                  fatback doner.
                </td>
              </tr>
              {this.renderProducts(this.state.categories)}
            </tbody>
          </table>
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
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputFile">Danh mục cha</label>
                  <TreeSelect
                    style={{ width: "100%" }}
                    value={undefined}
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    placeholder="Mời bạn chọn"
                    allowClear
                    treeDefaultExpandAll
                    onChange={this.onChange}
                  >
                    <TreeNode value="parent 1" title="parent 1">
                      <TreeNode value="parent 1-0" title="parent 1-0">
                        <TreeNode value="leaf1" title="my leaf" />
                        <TreeNode value="leaf2" title="your leaf" />
                      </TreeNode>
                      <TreeNode value="parent 1-1" title="parent 1-1">
                        <TreeNode
                          value="sss"
                          title={<b style={{ color: "#08c" }}>sss</b>}
                        />
                      </TreeNode>
                    </TreeNode>
                  </TreeSelect>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
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
export default connect(mapStateToProps, null)(Categories);

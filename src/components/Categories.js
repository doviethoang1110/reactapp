import React, {Component} from "react";
import 'antd/dist/antd.css';
import { TreeSelect } from 'antd';
const { TreeNode } = TreeSelect;

class Categories extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card-header">
                        <button className="btn btn-success card-title"><i className="fa fa-plus"></i> Add new
                        </button>
                        <div className="card-tools">
                            <div className="input-group input-group-sm" style={{width: '150px'}}>
                                <input type="text" name="table_search" className="form-control float-right"
                                       placeholder="Search"/>
                                <div className="input-group-append">
                                    <button type="submit" className="btn btn-default"><i className="fas fa-search"/>
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
                            <td><span className="tag tag-success">Approved</span></td>
                            <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                        </tr>
                        <tr>
                            <td>219</td>
                            <td>Alexander Pierce</td>
                            <td>11-7-2014</td>
                            <td><span className="tag tag-warning">Pending</span></td>
                            <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                        </tr>
                        <tr>
                            <td>657</td>
                            <td>Bob Doe</td>
                            <td>11-7-2014</td>
                            <td><span className="tag tag-primary">Approved</span></td>
                            <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                        </tr>
                        <tr>
                            <td>175</td>
                            <td>Mike Doe</td>
                            <td>11-7-2014</td>
                            <td><span className="tag tag-danger">Denied</span></td>
                            <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                        </tr>
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
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                           placeholder="Enter email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputFile">Danh mục cha</label>
                                    <TreeSelect
                                        style={{ width: '100%' }}
                                        value={undefined}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
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
                                                <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} />
                                            </TreeNode>
                                        </TreeNode>
                                    </TreeSelect>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                    <label className="form-check-label" htmlFor="exampleCheck1">Check me
                                        out</label>
                                </div>
                            </div>
                            {/* /.card-body */}
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Categories;
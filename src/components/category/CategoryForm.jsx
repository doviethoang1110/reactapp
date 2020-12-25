import React, { Component } from 'react';
import { toast } from '../../utils/alert';
import {actionToggleLoading} from "../../actions/loading";
import store from '../../store';
import SimpleReactValidator from "simple-react-validator";
import {toastRoles} from "../../utils/helpers";

class CategoryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            parentId: 0,
            status: false
        }
        this.validator = new SimpleReactValidator({
            messages: {
                required: ':attribute không được rỗng',
                numeric: ':attribute phải là số'
            },
            className: 'text-danger'
        });
    }
    componentDidMount() {
        if (this.props.category) {
            this.setState({
                name: this.props.category.name,
                parentId: this.props.category.parentId,
                status: this.props.category.status,
            })
        }
    }
    componentWillReceiveProps(props) {
        this.setState({
            name: props.category.name,
            parentId: props.category.parentId,
            status: props.category.status,
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        let {name,parentId,status} = this.state;
        if (this.validator.allValid()) {
            store.dispatch(actionToggleLoading(true))
            this.props.submitHandle(this.props.category.id,{name,parentId,status})
                .then(response => {
                    if(this.props.category.id) this.props.eventEdit(response.id);
                    store.dispatch(actionToggleLoading(false));
                    for(let a of document.getElementsByClassName('errorMsg')) a.innerText = '';
                    toast('success',response.message)
                })
                .catch(error => {
                    const data = error.response.data;
                    if(error.response.status !== 403) for(let e in data) document.getElementById('err_'+e).innerText = data[e];
                    toastRoles(error)
                    store.dispatch(actionToggleLoading(false));
                });
        } else {
            this.forceUpdate();
            this.validator.showMessages();
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    }
    formHasChanged = () => {
        let { category } = this.props;
        let { name, parentId, status } = this.state;
        return (name === category.name && parseInt(parentId) === category.parentId && status === category.status);
    }
    render() {
        let { category, closeForm } = this.props;
        let { name, parentId, status } = this.state;
        let { id } = category;
        return (
            <div className={id ? 'card card-warning' : 'card card-primary'}>
                <div className="card-header">
                    <h3 className="card-title">{id ? 'Cập nhật' : 'Thêm mới'} danh mục</h3>
                    <span onClick={closeForm} style={{ float: 'right', cursor: 'pointer' }}><i className="fa fa-times"></i></span>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="name">Tên danh mục</label>
                            <input
                                type="text" name="name"
                                className="form-control"
                                value={name}
                                onChange={this.handleChange}
                                id="name"
                                placeholder="Nhập tên danh mục" />
                            {this.validator.message('Tên', name, 'required|min:2|max:20')}
                            <span className="text-danger errorMsg" id="err_name"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="parentId">Danh mục cha</label>
                            <select onChange={this.handleChange} value={parentId} className="form-control" id="parentId" name="parentId">
                                <option value={'0'}>Not selected</option>
                                <Select treeData={this.props.treeData} space={''} />
                            </select>
                            {this.validator.message('Danh mục cha', parentId, 'required|numeric')}
                            <span className="text-danger errorMsg" id="err_parentId"></span>
                        </div>
                        <div className="form-check">
                            <input
                                onChange={this.handleChange}
                                name="status" type="checkbox"
                                checked={status === true ? 'checked' : ''}
                                value={status}
                                className="form-check-input" id="status" />
                            <label className="form-check-label" htmlFor="status">Hiển thị</label>
                            {this.validator.message('Trạng thái', status, 'required')}
                            <span className="text-danger errorMsg" id="err_status"></span>
                        </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit" disabled={this.formHasChanged()} className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
const Select = (props) => {
    if (props.treeData.length) {
        return props.treeData.map((c, index) => (
            <React.Fragment key={index}>
                <option value={c.id}>{props.space}{c.name}</option>
                { c.children.length > 0 ? (<Select treeData={c.children} space={props.space + '|---'} />) : ''}
            </React.Fragment>
        ));
    } else {
        return null;
    }
}

export default CategoryForm;
import React, { Component } from 'react';
import Validator from '../../utils/Validator';
import { toast } from '../../utils/alert';
import {actionToggleLoading} from "../../actions/loading";
import store from '../../store';

class CategoryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            parentId: 0,
            status: false,
            errors: {},
        }
        const rules = [
            {
                field: 'name',
                method: 'isEmpty',
                validWhen: false,
                message: 'Tên không được rỗng',
            },
            {
                field: 'name',
                method: 'isLength',
                args: [{min: 2}],
                validWhen: true,
                message: 'Tên ít nhất 2 ký tự',
            },
            {
                field: 'name',
                method: 'isLength',
                args: [{max: 20}],
                validWhen: true,
                message: 'Tên không vượt quá 20 ký tự',
            },
        ];
        this.validator = new Validator(rules);
    }
    componentDidMount() {
        if (this.props.category) {
            this.setState({
                name: this.props.category.name,
                parentId: this.props.category.parentId,
                status: this.props.category.status,
                errors: {}
            })
        }
    }
    componentWillReceiveProps(props) {
        this.setState({
            name: props.category.name,
            parentId: props.category.parentId,
            status: props.category.status,
            errors:{}
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        let {name,parentId,status} = this.state;
        let validateError = this.validator.validate(this.state);
        if(Object.keys(validateError).length) {
            this.setState({
                errors: this.validator.validate(this.state),
            });
        }else {
            store.dispatch(actionToggleLoading(true))
            setTimeout(() => {
                this.props.submitHandle(this.props.category._id,{name,parentId,status})
                    .then(response => {
                        if(this.props.category._id){
                            this.props.eventEdit(response.id);
                        }
                        store.dispatch(actionToggleLoading(false))
                        toast('success',response.message)
                    })
                    .catch(error => {
                        store.dispatch(actionToggleLoading(false));
                        console.log(error)
                        for(let e in error) {
                            document.getElementById('err_'+e).innerText = error[e];
                        }
                    });
            },1000);
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    }
    render() {
        let { category, closeForm } = this.props;
        let { name, parentId, status, errors } = this.state;
        let { _id } = category;
        return (
            <div className={_id ? 'card card-warning' : 'card card-primary'}>
                <div className="card-header">
                    <h3 className="card-title">{_id ? 'Cập nhật' : 'Thêm mới'} danh mục</h3>
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
                            {errors.name && <div className="text-danger" style={{display: 'block'}}>{errors.name}</div>}
                            <span className="text-danger" id="err_name"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="parentId">Danh mục cha</label>
                            <select onChange={this.handleChange} value={parentId} className="form-control" id="parentId" name="parentId">
                                <option value={'0'}>Not selected</option>
                                <Select treeData={this.props.treeData} space={''} />
                            </select>
                            {errors.parentId && <div className="text-danger" style={{display: 'block'}}>{errors.parentId}</div>}
                            <span className="text-danger" id="err_parentId"></span>
                        </div>
                        <div className="form-check">
                            <input
                                onChange={this.handleChange}
                                name="status" type="checkbox"
                                checked={status === true ? 'checked' : ''}
                                value={status}
                                className="form-check-input" id="status" />
                            <label className="form-check-label" htmlFor="status">Hiển thị</label>
                            <span className="text-danger" id="err_status"></span>
                        </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Submit</button>
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
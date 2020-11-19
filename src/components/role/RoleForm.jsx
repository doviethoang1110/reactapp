import React,{Component} from "react";
import SimpleReactValidator from "simple-react-validator";
import Role from "../../models/Role";
import { Multiselect } from 'multiselect-react-dropdown';
import callApi from "../../utils/api";
import {save} from "../../utils/helpers";

class RoleForm extends Component{
    constructor(props) {
        super(props);
        this.multiselectRef = React.createRef();
        this.state = {
            role: new Role('','',[]),
            permissions: []
        }
        this.validator = new SimpleReactValidator({
            messages: {
                required: ':attribute không được rỗng'
            },
            className: 'text-danger'
        });
    }

    getPermissions = () => {
        callApi('permissions/select')
            .then(res => this.setState({permissions: res.data}))
            .catch(error => console.log(error));
    }

    componentDidMount() {
        if (this.props.item) {this.setState({role: this.props.item})};
        this.getPermissions();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({role: nextProps.item});
    }

    submitForm = (e) => {
        e.preventDefault();
        const id = this.state.role.id;
        const data = this.state.role;
        data.permissions = data.permissions.map(p => p.id);
        save({
            data,
            id: id || null,
            url: `roles`,
            eventAdd: this.props.eventAdd,
            eventEdit: this.props.eventEdit
        },id ? 'PUT' : 'POST').then((res) => {
            this.multiselectRef.current.resetSelectedValues();
            this.setState({role: id ? res : new Role('','',[]),permissions:[]})
        })
        // if (this.validator.allValid()) {
        //     console.log(this.state.role)
        // } else {
        //     this.forceUpdate();
        //     this.validator.showMessages();
        // }
    }

    handleChange = (e) => {
        const role = {...this.state.role};
        role[e.target.name] = e.target.name === 'name' ? e.target.value.toUpperCase() : e.target.value;
        this.setState({role})
    }

    onSelect = (selectedList) => {
        if(this.state.role.id) this.setState({role: {...this.state.role,permissions: this.multiselectRef.current.getSelectedItems()}})
        else this.setState({role: {...this.state.role,permissions:selectedList}})
    }

    onRemove = (selectedList) => {
        if(this.state.role.id) this.setState({role: {...this.state.role,permissions: this.multiselectRef.current.getSelectedItems()}})
        else this.setState({role: {...this.state.role,permissions:selectedList}})
    }

    // form Change
    checkFormChange = () => {
        // let blog = this.props.item;
        // let { title, image, status, content} = this.state.blog;
        // return (blog.title === title && blog.image === image && blog.status === status && blog.content === content);
    }

    render() {
        let { role } = this.state;
        return (
            <form onSubmit={this.submitForm}>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="name">Tên</label>
                        <input type="text" className="form-control" id="name"
                               name='name'
                               value={role.name} onChange={this.handleChange}
                               placeholder="Tên"/>
                        {this.validator.message('Tiêu đề', role.name, 'required')}
                        <span className="text-danger errorMsg" id='err_name'></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="displayName">Tên thay thế</label>
                        <input type="text" className="form-control" id="displayName"
                               name='displayName'
                               value={role.displayName} onChange={this.handleChange}
                               placeholder="Tên thay thế"/>
                        {this.validator.message('Tiêu đề', role.displayName, 'required')}
                        <span className="text-danger errorMsg" id='err_displayName'></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="permissions">Trạng thái</label>
                        <Multiselect
                            closeIcon='cancel'
                            options={this.state.permissions}
                            selectedValues={!role.id ? [] : role.permissions}
                            onSelect={this.onSelect}
                            ref={this.multiselectRef}
                            onRemove={this.onRemove}
                            displayValue="displayName"
                            placeholder="Chọn quyền"
                        />
                        {this.validator.message('Trạng thái', role.permissions, 'required')}
                    </div>
                </div>
                <div className="card-footer">
                    <button disabled={this.checkFormChange()} type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }
}
export default RoleForm;
import React,{Component} from "react";
import SimpleReactValidator from "simple-react-validator";
import store from "../../store";
import {actionToggleLoading} from "../../actions/loading";
import callApi from "../../utils/api";
import Blog from "../../models/Blog";
import {toast} from "../../utils/alert";
import {save} from "../../utils/helpers";


class PermissionForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            permissions: [
                    {name:'READ_', slug: 'xem '},
                    {name:'CREATE_', slug: 'thêm mới '},
                    {name:'UPDATE_', slug: 'cập nhật '},
                    {name:'DELETE_', slug: 'xóa '}
                ],
            temp: {name: "", displayName: ""},
            request: []
        }
        this.validator = new SimpleReactValidator({
            messages: {
                required: ':attribute không được rỗng'
            },
            className: 'text-danger'
        });
    }

    componentDidMount() {
        if (this.props.item) this.setState({temp: this.props.item})
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({temp: nextProps.item});
    }

    handleChange = async (e) => {
        const temp = e.target.name === 'name'
            ? {...this.state.temp,name: e.target.value.toUpperCase()}
            : {...this.state.temp,displayName: e.target.value};
        this.setState({temp})
    }

    handleCheckbox = (e) => {
        let request = [...this.state.request];
        if(e.target.checked) {
            const permission = e.target.value.split("*").reduce((a, b,index,origin) => {
                return {...a,name: origin[0],displayName: origin[1]};
            },{id: e.target.id, name: '', displayName: ''});
            request.push(permission);
        }else request = request.filter(r => r.id !== e.target.id);
        request = request.map(r => ({name: r.name, displayName: r.displayName}));
        this.setState({request});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const id = this.state.temp.id;
        save({
            data: id ? this.state.temp : this.state.request,
            id: id || null,
            url: 'permissions',
            eventAdd: this.props.eventAdd,
            eventEdit: this.props.eventEdit
        },id ? 'PUT' : 'POST').then((res) => {
            document.getElementById("errMsg").innerText = "";
            this.setState({temp: id ? res : {name: '', displayName: ''},request: []})
        })
        // if (this.validator.allValid()) {
        //     if(!this.state.request.length) {
        //         document.getElementById('errMsg').innerText = "Chọn tối thiểu 1";
        //         return;
        //     }
        // } else {
        //     this.forceUpdate();
        //     this.validator.showMessages();
        // }
    }


    render() {
        const { permissions, temp } = this.state;
        return (
            <div className={`card ${temp.id ? 'card-warning' : 'card-primary'}`}>
                <div className="card-header">
                    <h3 className="card-title">{temp.id ? 'Cập nhật' : 'Thêm mới'} quyền</h3>
                    <span onClick={this.props.closeForm} style={{ float: 'right', cursor: 'pointer' }}><i className="fa fa-times"></i></span>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="name">Tên quyền</label>
                            <input
                                type="text" name="name"
                                className="form-control"
                                value={temp.name}
                                onChange={this.handleChange}
                                id="name"
                                placeholder="Nhập tên danh mục" />
                            {this.validator.message('Tên', temp.name, 'required')}
                            <span className="text-danger errorMsg" id="err_name"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="displayName">Tên thay thế</label>
                            <input
                                type="text" name="displayName"
                                className="form-control"
                                value={temp.displayName}
                                id="displayName"
                                onChange={this.handleChange}
                                placeholder="Nhập tên danh mục" />
                            {this.validator.message('Tên thay thế', temp.displayName, 'required')}
                            <span className="text-danger errorMsg" id="err_name"></span>
                        </div>
                        {!temp.id && (temp.name && temp.displayName) && permissions.length && (permissions.map((p,index) => (
                            <div className="form-check" key={index}>
                                <input value={p.name + temp.name+"*"+p.slug + temp.displayName}
                                       onChange={this.handleCheckbox}
                                       type="checkbox" className="form-check-input" id={p.name}/>
                                <label className="form-check-label" htmlFor={p.name}>{p.name + temp.name} / {p.slug + temp.displayName}</label>
                            </div>
                        )))}
                        <span className='text-danger' id='errMsg'></span>
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
export default PermissionForm;
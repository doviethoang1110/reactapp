import React,{Component} from "react";
import Validator from "../../utils/Validator";
import store from "../../store";
import {actionToggleLoading} from "../../actions/loading";
import {toast} from "../../utils/alert";

class BrandForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: null,
            status: false,
            errors: {},
            url:null,
            image_name:''
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
        if (this.props.brand) {
            this.setState({
                ...this.state,
                name: this.props.brand.name,
                image: this.props.brand.image,
                status: this.props.brand.status,
            })
        }
    }
    componentWillReceiveProps(props) {
        this.setState({
            ...this.state,
            name: props.brand.name,
            image: props.brand.image,
            status: props.brand.status,
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        let {name,image,status} = this.state;
        if(!image) {
            document.getElementById('err_image').innerText = 'Ảnh không được rỗng';
            return;
        }
        let validateError = this.validator.validate(this.state);
        if(Object.keys(validateError).length) {
            this.setState({
                errors: this.validator.validate(this.state),
            });
        }else {
            let em = {name,image,status};
            let data = new FormData();
            for (let d of Object.keys(em)) {
                data.append(d,em[d]);
            }
            store.dispatch(actionToggleLoading(true));
            setTimeout(() => {
                this.props.submitHandle(data)
                    .then(response => {
                        this.refreshForm();
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
    refreshForm = () => {
        this.setState({
            image: null,
            status: false,
            url:null,
            image_name:''
        })
    }
    handleChange = (e) => {
        if(e.target.type === 'file') {
            let file = e.target.files[[0]];
            this.setState({
                ...this.state,
                image_name:file.name,
                image: file,
                url:URL.createObjectURL(file)
            })
        }
        this.setState({
            [e.target.name] : e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    }

    render() {
        let {name,image,status,errors,url,image_name} = this.state;
        return (
            <div className='card card-primary'>
                <div className="card-header">
                    <h3 className="card-title">Thêm mới nhãn hiệu</h3>
                    <span onClick={this.props.closeForm} style={{ float: 'right', cursor: 'pointer' }}><i className="fa fa-times"></i></span>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="name">Tên nhãn hiệu</label>
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
                            <label htmlFor="parentId">Ảnh</label>
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file"
                                           onChange={this.handleChange}
                                           className="custom-file-input" id="image"/>
                                        <label className="custom-file-label" htmlFor="image">{image_name ? image_name : 'Choose file'}</label>
                                </div>
                            </div>
                            { url ? (
                                <div className='mt-2'>
                                    <img src={url} width={'200px'}/>
                                </div>
                            ) : null}
                            {errors.image && <div className="text-danger" style={{display: 'block'}}>{errors.image}</div>}
                            <span className="text-danger" id="err_image"></span>
                        </div>
                        <div className="icheck-primary">
                            <input
                                onChange={this.handleChange}
                                name="status" type="checkbox"
                                checked={status === true ? 'checked' : ''}
                                value={status}
                                className="form-check-input" id="status" />
                            <label className="form-check-label" htmlFor="status">Active</label>
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
export default BrandForm;
import React,{Component} from "react";
import store from "../../store";
import {actionToggleLoading} from "../../actions/loading";
import {toast} from "../../utils/alert";
import {IMAGE_URL} from "../../constants/config";
import SimpleReactValidator from "simple-react-validator";

class BrandForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: null,
            status: false,
            url:null,
            image_name:''
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
        if (this.props.brand) {
            this.setState({
                name: this.props.brand.name,
                image: this.props.brand.image,
                status: this.props.brand.status,
                url: null,
                image_name: ''
            })
        }
    }
    componentWillReceiveProps(props) {
        this.setState({
            name: props.brand.name,
            image: props.brand.image,
            status: props.brand.status,
            url: null,
            image_name: ''
        });
        let dom = document.getElementById('img_show');
        if(dom) dom.hidden = false;
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let {name,image,status} = this.state;
        if(!this.props.brand.id && !image) {
            document.getElementById('err_image').innerText = 'Ảnh không được rỗng';
            return;
        }
        let em = {name,image,status};
        let data = new FormData();
        for (let d of Object.keys(em)) {
            data.append(d,em[d]);
        }
        if(this.validator.allValid()) {
            store.dispatch(actionToggleLoading(true));
            setTimeout(() => {
                this.props.submitHandle(this.props.brand.id,data)
                    .then(response => {
                        this.props.brand.id ? this.props.eventEdit(response.id) : this.refreshForm();
                        store.dispatch(actionToggleLoading(false))
                        for(let a of document.getElementsByClassName('errorMsg')) a.innerText = '';
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
        } else {
            this.forceUpdate();
            this.validator.showMessages();
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
            let dom = document.getElementById('img_show');
            if(dom) dom.hidden = true;
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

    // form Change
    checkFormChange = () => {
        let { brand } = this.props;
        let { name, image, status} = this.state;
        return (brand.name === name && brand.image === image && brand.status === status);
    }

    render() {
        let {name,status,url,image_name} = this.state;
        let { id,image } = this.props.brand;
        return (
            <div className={`card ${id ? 'card-warning' : 'card-primary'}`}>
                <div className="card-header">
                    <h3 className="card-title">{id ? 'Cập nhật' : 'Thêm mới'} nhãn hiệu</h3>
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
                            {this.validator.message('Tên', name, 'required|min:2|max:20')}
                            <span className="text-danger errorMsg" id="err_name"></span>
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
                            { image && (
                                <div className='mt-2' id="img_show">
                                    <img alt='' src={IMAGE_URL+image} width={'200px'}/>
                                </div>
                            )}
                            { url && (
                                <div className='mt-2'>
                                    <img alt='' src={url} width={'200px'}/>
                                </div>
                            )}
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
                            <span className="text-danger errorMsg" id="err_status"></span>
                            {this.validator.message('Trạng thái', status, 'required')}
                        </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit" disabled={this.checkFormChange()} className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default BrandForm;
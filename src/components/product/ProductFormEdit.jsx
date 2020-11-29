import React,{Component} from "react";
import {Editor} from "@tinymce/tinymce-react";
import {connect} from "react-redux";
import store from "../../store";
import {actionToggleLoading} from "../../actions/loading";
import {actionGetBrands} from "../../actions/brand";
import {actionGetCategories} from "../../actions/category";
import callApi from "../../utils/api";
import {toast} from "../../utils/alert";
import {NavLink} from "react-router-dom";
import Edit from "../../models/Edit";
import {IMAGE_URL} from "../../constants/config";
import SkuComponent from "./SkuComponent";
import SimpleReactValidator from "simple-react-validator";

class ProductFormEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image_name:'',
            url:null,
            edit: new Edit
            (this.props.match.params.id,'',0,[],1,1,1,'',false,'',[])
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
        this.props.getDatas();
        this.getProductEdit();
    }
    // get product edit
    getProductEdit() {
        callApi(`products/${this.props.match.params.id}`)
            .then(response => {
                let categories = response.data.categories.map(c => c.id);
                let brand = response.data.brand.id;
                let edit = {...response.data,categories,brand};
                this.setState({edit});
            })
            .catch(error => {
                toast('error',error.response.data);
            });
    }
    // handle input
    handleChange = (e) => {
        e.preventDefault();
        if(e.target.type === 'file') {
            let file = e.target.files[[0]];
            let dom = document.getElementById('img_show');
            if(dom) dom.hidden = true;
            let edit = {...this.state.edit};
            edit.image = file;
            this.setState({
                image_name:file.name,
                edit,
                url:URL.createObjectURL(file)
            })
        }else {
            let field = e.target.name;
            let value = e.target.value;
            let edit = {...this.state.edit};
            edit[field] = value;
            this.setState({edit});
        }
    }
    // handleMultiImg = (e) => {
    //     e.preventDefault();
    //     if (e.target.files) {
    //         const files = Array.from(e.target.files);
    //         Promise.all(files.map(file => {
    //             return (new Promise((resolve,reject) => {
    //                 const reader = new FileReader();
    //                 reader.addEventListener('load', (ev) => {
    //                     resolve(ev.target.result);
    //                 });
    //                 reader.addEventListener('error', reject);
    //                 reader.readAsDataURL(file);
    //             }));
    //         }))
    //             .then(images => {
    //                 let edit = {...this.state.edit};
    //                 edit.imageList = images;
    //                 this.setState({ edit })
    //             }, error => {
    //                 console.error(error);
    //             });
    //     }
    // }
    handleSelect = (e) => {
        e.preventDefault();
        const options = e.target.options;
        const values = [];
        let length = options.length;
        for (let i = 0; i < length; i++)
            if (options[i].selected) values.push(+options[i].value);
        this.setState(prevState => ({
            edit: {...prevState.edit,categories:values}
        }));
    }
    submitForm = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            const edit = this.state.edit;
            const data = new FormData();
            for (let d of Object.keys(edit)) data.append(d,edit[d]);
            callApi('products/edit','POST',data)
                .then(res => {
                    toast('success','Cập nhật thành công')
                    const categories = res.data.categories.map(c => c.id);
                    const brand = res.data.brand.id;
                    const edit = {...res.data,categories,brand};
                    const dom = document.getElementById('img_show');
                    if(dom) dom.hidden = false;
                    this.setState({edit,url :null, image_name: ''})
                })
                .catch(error => {
                    toast('error','Có lỗi xảy ra')
                    document.getElementById('err_img').innerText = error.response.data;
                });
        } else {
            this.forceUpdate();
            this.validator.showMessages();
        }
    }

    render() {
        let listBrands;
        let listCategories;
        let {edit,image_name,url} = this.state;
        let skus = edit.skus;
        if(Array.isArray(skus)) skus = skus.map(s => ({...s,status:null,quantity:1}));
        const { brands, categories } = this.props;
        if(brands.length) {
            listBrands = brands.map((b,index) => (
                <option key={index} value={+b.id}>{b.name}</option>
            ));
        }
        if(categories.length) {
            listCategories = categories.map((c,index) => (
                <option key={index} value={+c.id}>{c.name}</option>
            ));
        }

        return (
            <React.Fragment>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="product-tab" data-toggle="tab" href="#product" role="tab"
                           aria-controls="home" aria-selected="true">Product</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="sku-tab" data-toggle="tab" href="#sku" role="tab"
                           aria-controls="profile" aria-selected="false">Sku</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="product" role="tabpanel"
                         aria-labelledby="product-tab">
                        <div className='row'>
                            <div className='col-md-12'>
                                <NavLink to="/products" className='btn btn-outline-info'><i className='fa fa-step-backward'></i> Back</NavLink>
                                <form method='post' onSubmit={this.submitForm}>
                                    <div className='container-fluid'>
                                        <div className='row'>
                                            <div className='col-md-8'>
                                                <div className="form-group">
                                                    <label htmlFor="name">Tên sản phẩm</label>
                                                    <input value={edit.name} onChange={this.handleChange}
                                                        className='form-control' type="text" name="name" id='name'/>
                                                    {this.validator.message('Tên', edit.name, 'required')}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="discount">Giảm giá</label>
                                                    <input value={edit.discount} onChange={this.handleChange}
                                                        name='discount'
                                                        className='form-control'
                                                        type="number" id='discount'/>
                                                    {this.validator.message('Giảm giá', edit.discount, 'required|numeric')}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="description">Mô tả</label>
                                                    <Editor
                                                        apiKey={'gsy092012zjj2ycmtt1hjy0efuj1rn7mvzsqbg6ixo5yji74'}
                                                        initialValue={edit.description}
                                                        init={{
                                                            height: 350,
                                                            menubar: true,
                                                            plugins: [
                                                                'advlist autolink lists link image',
                                                                'charmap print preview anchor help',
                                                                'searchreplace visualblocks code',
                                                                'insertdatetime media table paste wordcount'
                                                            ],
                                                            toolbar:
                                                                `undo redo | formatselect | bold italic |
                                                    alignleft aligncenter alignright |
                                                    bullist numlist outdent indent | help`
                                                        }}
                                                    />
                                                    {this.validator.message('Mô tả', edit.description, 'required|max:2000')}
                                                </div>
                                                {/*<div className="form-group">*/}
                                                {/*    <label htmlFor="imageList">Ảnh mô tả</label>*/}
                                                {/*    <div className="input-group">*/}
                                                {/*        <div className="custom-file">*/}
                                                {/*            <input type="file" multiple onChange={this.handleMultiImg}*/}
                                                {/*                   name="imageList"*/}
                                                {/*                   className="custom-file-input" id="imageList"/>*/}
                                                {/*            <label className="custom-file-label" htmlFor="imageList">Choose file</label>*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                                {/*<div className='row'>*/}
                                                {/*    {edit.imageList && (this.state.edit.imageList.map((imageURI,index) =>*/}
                                                {/*        (*/}
                                                {/*            <div key={index} className={`col-md-${12/edit.imageList.length}`}>*/}
                                                {/*                <img alt='imageList' width={'200px'} src={imageURI}/>*/}
                                                {/*            </div>*/}
                                                {/*        )))}*/}
                                                {/*</div>*/}
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="categories">Danh mục</label>
                                                    <select value={edit.categories} onChange={this.handleSelect}
                                                        multiple
                                                        name='categories' id='categories' className='form-control'>
                                                        {listCategories}
                                                    </select>
                                                    {this.validator.message('Danh mục', edit.categories, 'required')}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="brand">Nhãn hiệu</label>
                                                    <select value={edit.brand} onChange={this.handleChange}
                                                        name='brand' id='brand' className='form-control'
                                                    >
                                                        {listBrands}
                                                    </select>
                                                    {this.validator.message('Nhãn hiệu', edit.brand, 'required')}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="priority">Độ ưu tiên</label>
                                                    <select value={edit.priority} onChange={this.handleChange} name='priority' className='form-control' id="priority">
                                                        <option value={1}>Mới</option>
                                                        <option value={2}>Bán chạy</option>
                                                        <option value={3}>Nổi bật</option>
                                                    </select>
                                                    {this.validator.message('Độ ưu tiên', edit.priority, 'required')}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="vision">Chế độ</label>
                                                    <select onChange={this.handleChange} value={edit.vision}
                                                        name='vision' className='form-control' id="vision"
                                                    >
                                                        <option value={1}>Được mua</option>
                                                        <option value={2}>Chỉ được xem</option>
                                                    </select>
                                                    {this.validator.message('Chế độ', edit.vision, 'required')}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="status">Trạng thái</label>
                                                    <select onChange={this.handleChange} value={edit.status}
                                                        name='status' className='form-control' id="status"
                                                    >
                                                        <option value={false}>Disable</option>
                                                        <option value={true}>Active</option>
                                                    </select>
                                                    {this.validator.message('Trạng thái', edit.status, 'required')}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="image">Ảnh</label>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                            <input type="file" onChange={this.handleChange}
                                                                   name="image"
                                                                   className="custom-file-input" id="image"/>
                                                            <label className="custom-file-label" htmlFor="image">{image_name ? image_name : 'Choose file'}</label>
                                                        </div>
                                                    </div>
                                                    { edit.image && (
                                                        <div className='mt-2' id="img_show">
                                                            <img alt='' src={IMAGE_URL+edit.image} width={'200px'}/>
                                                        </div>
                                                    )}
                                                    { url && (
                                                        <div className='mt-2'>
                                                            <img alt='' src={url} width={'200px'}/>
                                                        </div>
                                                    )}
                                                    <div className='text-danger' id='err_img'></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <button type="submit" className="btn btn-primary">
                                                <span>Submit</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade show" id="sku" role="tabpanel" aria-labelledby="sku-tab">
                        <SkuComponent items={skus} id={this.props.match.params.id}/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
// Redux Map
const mapStateToProps = (state) => {
    return {
        brands: state.brands,
        categories: state.categories
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDatas: () => {
            let brands =  store.getState().brands.length;
            let categories = store.getState().categories.length;
            if(!brands && !categories) {
                dispatch(actionToggleLoading( true))
                dispatch(actionGetBrands());
                dispatch(actionGetCategories());
                dispatch(actionToggleLoading(false))
            }else if(!brands || !categories) {
                dispatch(actionToggleLoading(true))
                dispatch(brands ? actionGetCategories() : actionGetBrands());
                dispatch(actionToggleLoading(false))
            }else return;
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductFormEdit);
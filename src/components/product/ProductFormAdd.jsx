import React,{Component} from "react";
import {Editor} from "@tinymce/tinymce-react";
import Options from "../../models/Options";
import InputTag from "../InputTag";
import Products from "../../models/Products";
import {connect} from "react-redux";
import store from "../../store";
import {actionToggleLoading} from "../../actions/loading";
import {actionGetBrands} from "../../actions/brand";
import {actionGetCategories} from "../../actions/category";
import InputNumber from "../InputNumber";
import {resetState} from "../../utils/helpers";
import SimpleReactValidator from "simple-react-validator";
import callApi from "../../utils/api";
import { createBrowserHistory } from "history";
import {toast} from "../../utils/alert";

class ProductFormAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content:'',
            options: [new Options("",[])],
            skus: [],
            count: 1,
            product: new Products('',0,[],1,1,1,
                '<p>Đây là mô tả</p>',0,[],[])
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
        if (this.props.item) {
            this.setState({
                product: this.props.item
            })
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            product: nextProps.item
        });
    }

    // Input options function
    addTag = (e,index) => {
        const val = e.target.value;
        if (e.key === 'Enter' && e.keyCode === 13 && val) {
            e.preventDefault();
            if (this.state.options[index].values.find(tag => tag.toLowerCase() === val.toLowerCase())) return;
            const {options,skus} = resetState([...this.state.options],index,val);
            this.setState({options,skus});
            e.target.value = '';
        } else if (e.key === 'Backspace' && !val) this.removeTag(index,this.state.options[index].values.length - 1);
    }

    removeTag = (indexOptions,indexValues) => {
        let array = [...this.state.options];
        array[indexOptions].values.splice(indexValues, 1);
        let {options,skus} = resetState(array,indexOptions);
        this.setState( {options,skus});
    }

    removeSku = (e,index) => {
        e.preventDefault();
        if(this.state.skus.length < 2) {
            window.alert('Tối thiểu 1 mã sku');
        }else {
            if(window.confirm('Bạn có chắc không')) {
                let skus = [...this.state.skus];
                skus.splice(index,1);
                this.setState({skus});
            }
        }
    }

    handleInputOptions = (e,index) => {
        e.preventDefault();
        let options = [...this.state.options];
        options[index].name =  e.target.value;
        this.setState({options});
    }
    handleInputNumber = (index,value) => {
        let skus = [...this.state.skus];
        skus[index].stock = value;
        this.setState({skus});
    }
    handleSkuInput = (e,index) => {
        let skus = [...this.state.skus];
        skus[index][e.target.name] = e.target.value.toUpperCase();
        this.setState({skus});
    }

    // text editor function
    handleEditorChange = (content) => {
        this.setState(prevState => ({
            product: {...prevState.product,description:content}
        }));
    }

    // product inputs
    handleChange = (e) => {
        e.preventDefault();
        const product = {...this.state.product};
        product[e.target.name] = e.target.value;
        this.setState(prevState => ({
            product
        }));
    }
    handleSelect = (e) => {
        const options = e.target.options;
        const values = [];
        let length = options.length;
        for (let i = 0; i < length; i++)
            if (options[i].selected) values.push(+options[i].value);
        this.setState(prevState => ({
            product: {...prevState.product,categories:values}
        }));
    }

    // options function
    addMoreOptions = (e) => {
        e.preventDefault();
        if(this.state.count > 2) return;
        else {
            this.setState(prevState => ({
                count: prevState.count + 1,
                options: [...prevState.options,new Options("",[])]
            }));
        }
    }

    showOptions = (options) => {
        let output = options.map((o,index) => {
            return (
                <div key={index} className='row' style={{marginBottom:'10px'}}>
                    <div className='row mb-5'>
                        <div className="col-md-5">
                            <input name='option'
                                   value={o.name}
                                   onChange={(e) => this.handleInputOptions(e,index)}
                                   type="text" className="form-control"/>
                            {this.validator.message('Tùy chọn', o.name, 'required')}
                        </div>
                        <div className="col-md-6">
                            <InputTag value={o.values} removeTag={this.removeTag} index={index} items={o.values} addTag={this.addTag}/>
                            {this.validator.message('Giá trị', o.values, 'required')}
                        </div>
                        <div className="col-md-1">
                            { index > 0 && (
                                <button onClick={(e) => this.remove(e,index)}
                                        className="btn btn-outline-danger mybtn">
                                    <i className="fa fa-trash"></i>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )
        });
        return output;
    }

    remove = (e,index) => {
        e.preventDefault();
        if(this.state.count === 1) return;
        let array = [...this.state.options];
        array.splice(index,1);
        let { options, skus } = resetState(array,index,)
        this.setState(prevState => ({
            count: prevState.count - 1,
            options,
            skus
        }));
    }

    validateSku = (array) => {
        let map = new Map();
        for (let u of array) {
            if(!map.get(u)) {
                map.set(u,1);
            }else {
                map.set(u,map.get(u) + 1);
            }
        }
        let text = '';
        map.forEach((v,k) => {
            if(v > 1) {
                text += `${k} `
            }
        });
        document.getElementById('error_sku').innerText = text ? text + 'đã tồn tại' : text;
        return text;
    }

    submitForm = (e) => {
        e.preventDefault();
        let { options, skus } = this.state;
        let uniqueOptions = new Set(options.map(o => o.name.trim().toLowerCase()));
        let uniqueSkus = skus.map(s => s.code.trim().toUpperCase());
        if(uniqueOptions.size !== options.length) {
            document.getElementById('error_option').innerText = uniqueOptions.size !== options.length ? 'Tên options là duy nhất' : '';
            return;
        }
        if(document.getElementById('error_sku')) if(this.validateSku(uniqueSkus)) return;
        if (this.validator.allValid()) {
            let data = {...this.state.product};
            data.options = options;
            data.skus = skus;
            callApi('products','POST',data).then(res => {
                createBrowserHistory().goBack()
                toast('success',res.data)
            }).catch(error => {
                document.getElementById('error_sku').innerText = error.response.data
            })
        } else {
            this.forceUpdate();
            this.validator.showMessages();
        }
    }

    render() {
        let { options, product, skus } = this.state;
        const { brands, categories } = this.props;
        let listBrands;
        let listCategories;
        let listSkus;
        if(brands.length) {
            listBrands = brands.map((b,index) => (
                <option key={index} value={+b.id}>{b.name}</option>
            ));
        }else listBrands = null;
        if(categories.length) {
            listCategories = categories.map((c,index) => (
                <option key={index} value={+c.id}>{c.name}</option>
            ));
        }else listCategories = null;
        if(skus.length) {
            listSkus = skus.map((s,index) => (
                <tr key={index}>
                    <td>
                        <button onClick={(e) => this.removeSku(e,index)}
                                className="btn btn-outline-danger">
                            <i className="fa fa-times"></i>
                        </button>
                    </td>
                    <td>
                        <ul style={{listStyle: 'none'}}>
                            {s.values.map((p,i) => {
                                let className;
                                switch (i) {
                                    case 0:
                                        className = 'text-success';
                                        break;
                                    case 1:
                                        className = 'text-primary';
                                        break;
                                    case 2:
                                        className = 'text-danger';
                                        break;
                                    default:
                                        className = '';
                                }
                                return (
                                    <li key={i}><span
                                        className={className}
                                        style={{fontSize: '18px'}}>{p}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </td>
                    <td>
                        <div className="form-group">
                            <input
                                name='code' value={s.code}
                                onChange={(e) => this.handleSkuInput(e,index)}
                                type="text" className="form-control" placeholder="Mã kho"/>
                            {this.validator.message('mã sku', s.code, 'required')}
                        </div>
                    </td>
                    <td>
                        <div className="form-group">
                            <input
                                name='importPrice'
                                value={s.importPrice}
                                onChange={(e) => this.handleSkuInput(e,index)}
                                type="number" className="form-control" placeholder="Giá nhập"/>
                            {this.validator.message('Giá nhập', s.importPrice, 'required|numeric')}
                        </div>
                    </td>
                    <td>
                        <div className="form-group">
                            <input
                                value={s.exportPrice}
                                onChange={(e) => this.handleSkuInput(e,index)}
                                name='exportPrice'
                                type="number" className="form-control" placeholder="Giá bán"/>
                            {this.validator.message('Giá bán', s.exportPrice, 'required|numeric')}
                        </div>
                    </td>
                    <td>
                        <InputNumber value={s.stock} event={this.handleInputNumber} index={index}/>
                        {this.validator.message('Số lượng nhập', s.stock, 'required|numeric')}
                    </td>
                </tr>
            ))
        }
        return (
            <div className='row'>
                <div className='col-md-12'>
                    <h2 style={{color: 'red'}}>Product</h2>
                    <form onSubmit={this.submitForm}>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-md-8'>
                                    <div className="form-group">
                                        <label htmlFor="name">Tên sản phẩm</label>
                                        <input
                                            onChange={this.handleChange}
                                            value={product.name}
                                            className='form-control' type="text" name="name" id='name'/>
                                        {this.validator.message('Tên', product.name, 'required|min:2|max:20')}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="discount">Giảm giá</label>
                                        <input
                                            name='discount'
                                            onChange={this.handleChange}
                                            defaultValue={product.discount}
                                            className='form-control'
                                            type="number" id='discount'/>
                                        {this.validator.message('% giảm giá', product.discount, 'required|numeric')}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Mô tả</label>
                                        <Editor
                                            apiKey={'gsy092012zjj2ycmtt1hjy0efuj1rn7mvzsqbg6ixo5yji74'}
                                            initialValue={`<p>${product.description}</p>`}
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
                                            onEditorChange={this.handleEditorChange}
                                        />
                                        {this.validator.message('Mô tả', product.description, 'required|max:2000')}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="categories">Danh mục</label>
                                        <select
                                            multiple value={product.categories} onChange={this.handleSelect}
                                            name='categories' id='categories' className='form-control'>
                                            { listCategories }
                                        </select>
                                        {this.validator.message('Danh mục', product.categories, 'required')}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="brand">Nhãn hiệu</label>
                                        <select onChange={this.handleChange}
                                                name='brand' id='brand' className='form-control'
                                                value={product.brand}
                                        >
                                            { listBrands }
                                        </select>
                                        {this.validator.message('Nhãn hiệu', product.brand, 'required')}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="priority">Độ ưu tiên</label>
                                        <select value={product.priority} onChange={this.handleChange} name='priority' className='form-control' id="priority">
                                            <option value={1}>Mới</option>
                                            <option value={2}>Bán chạy</option>
                                            <option value={3}>Nổi bật</option>
                                        </select>
                                        {this.validator.message('Độ ưu tiên', product.priority, 'required')}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="vision">Chế độ</label>
                                        <select value={product.vision}
                                                onChange={this.handleChange}
                                                name='vision' className='form-control' id="vision"
                                        >
                                            <option value={1}>Được mua</option>
                                            <option value={2}>Chỉ được xem</option>
                                        </select>
                                        {this.validator.message('Chế độ', product.vision, 'required')}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="status">Trạng thái</label>
                                        <select value={product.status}
                                                onChange={this.handleChange}
                                                name='status' className='form-control' id="status"
                                        >
                                            <option value={false}>Disable</option>
                                            <option value={true}>Active</option>
                                        </select>
                                        {this.validator.message('Trạng thái', product.status, 'required')}
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <h2 style={{color: 'coral'}}>Options</h2>
                            <div className='row' style={{width: '600px',margin: '0 auto'}}>
                                <span className='text-danger' id='error_option'></span>
                                { this.showOptions(options) }
                            </div>
                            <button onClick={this.addMoreOptions} className="btn btn-outline-warning">Add more</button>
                            <hr/>
                            { listSkus && (
                                <React.Fragment>
                                    <h2 style={{color: 'coral'}}>Sku</h2>
                                    <span className='text-danger' id='error_sku'></span>
                                    <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{height:'400px',overflowY:'auto'}}>
                                        <table className="table" >
                                            <thead>
                                            <tr>
                                                <th>Bỏ</th>
                                                <th>Variants</th>
                                                <th>Sku</th>
                                                <th>Giá nhập</th>
                                                <th>Giá bán</th>
                                                <th>Số lượng nhập</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            { listSkus }
                                            </tbody>
                                        </table>
                                    </div>
                                </React.Fragment>
                            )}
                            <div className="row">
                                <button type="submit" className="btn btn-primary">
                                    <span>Submit</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
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
            const brands =  store.getState().brands.length;
            const categories = store.getState().categories.length;
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
export default connect(mapStateToProps,mapDispatchToProps)(ProductFormAdd);
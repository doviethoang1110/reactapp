import React,{Component} from "react";
import {IMAGE_URL} from "../../constants/config";
import SimpleReactValidator from "simple-react-validator";
import Banner from "../../models/Banner";
import {save, toastRoles} from "../../utils/helpers";

class BannerForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            banner: new Banner('','',false,null,'',1),
            url:null,
            image: null,
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
        if (this.props.item) {
            this.setState({
                image_name:this.props.item.image,
                image: this.props.item.image,
                banner: this.props.item
            })
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            image_name: nextProps.item.image,
            image: nextProps.item.image,
            banner: nextProps.item
        });
        let dom = document.getElementById('img_show');
        if(dom) dom.hidden = false;
    }

    handleChange = (e) => {
        e.preventDefault();
        const banner = {...this.state.banner};
        if(e.target.type === 'file') {
            const file = e.target.files[[0]];
            const dom = document.getElementById('img_show');
            if(dom) dom.hidden = true;
            banner.image = file;
            this.setState({
                image_name:file.name,
                banner,
                url:URL.createObjectURL(file)
            })
        }
        banner[e.target.name] = e.target.value;
        this.setState({banner});
    }

    submitForm = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            const id = this.state.banner.id;
            const data = new FormData();
            const banner = this.state.banner;
            for (let d of Object.keys(banner)) data.append(d,banner[d]);
            save({
                data,
                id,
                url: 'banners',
                eventAdd: this.props.eventAdd,
                eventEdit: this.props.eventEdit
            },'POST').then((res) => {
                for(let a of document.getElementsByClassName('errorMsg')) a.innerText = '';
                this.setState({
                    banner: id ? res : new Banner('','',false,null,'',1),
                    url: null
                })
            }).catch(error => {
                toastRoles(error);
                this.setState({
                    banner: id ? this.state.banner : new Banner('','',false,null,'',1),
                    url: null
                })
            })
        } else {
            this.forceUpdate();
            this.validator.showMessages();
        }
    }

    // form Change
    checkFormChange = () => {
        // let blog = this.props.item;
        // let { title, image, status, content} = this.state.blog;
        // return (blog.title === title && blog.image === image && blog.status === status && blog.content === content);
    }

    render() {
        let { banner,url,image_name,image } = this.state;
        return (
            <form onSubmit={this.submitForm} style={{margin: '0 auto',width: '800px'}}>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name"
                               name='name'
                               value={banner.name} onChange={this.handleChange}
                               placeholder="Tên"/>
                        {this.validator.message('Tên', banner.name, 'required')}
                        <span className="text-danger errorMsg" id='err_name'></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Nội dung</label>
                        <input type="text" className="form-control" id="content"
                               name='content'
                               value={banner.content} onChange={this.handleChange}
                               placeholder="Nội dung"/>
                        {this.validator.message('Nội dung', banner.content, 'required')}
                        <span className="text-danger errorMsg" id='err_content'></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Loại</label>
                        <select className="form-control" value={banner.type} onChange={this.handleChange} name="type" id="type">
                            <option value={1}>Banner chính</option>
                            <option value={2}>Banner SEO</option>
                            <option value={3}>Banner quảng cáo</option>
                        </select>
                        {this.validator.message('Loại', banner.type, 'required')}
                    </div>
                    <div className="form-group">
                        <label htmlFor="links">Đường dẫn</label>
                        <input type="text" className="form-control" id="links"
                               name='links'
                               value={banner.links} onChange={this.handleChange}
                               placeholder="Đường dẫn"/>
                        {this.validator.message('Đường dẫn', banner.links, 'required')}
                        <span className="text-danger errorMsg" id='err_links'></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <div className="input-group">
                            <div className="custom-file">
                                <input type="file" onChange={this.handleChange} className="custom-file-input" id="image"/>
                                <label className="custom-file-label" htmlFor="image">{image_name ? image_name : 'Choose file'}</label>
                            </div>
                        </div>
                        <span className="text-danger" id="error_image"></span>
                        { image && (
                            <div className='mt-2' id="img_show">
                                <img alt='' src={IMAGE_URL+banner.image} width={'200px'}/>
                            </div>
                        )}
                        { url && (
                            <div className='mt-2'>
                                <img alt='' src={url} width={'200px'}/>
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Trạng thái</label>
                        <select className="form-control" style={{width:'200px'}} value={banner.status} onChange={this.handleChange} name="status" id="status">
                            <option value={false}>Disable</option>
                            <option value={true}>Active</option>
                        </select>
                        {this.validator.message('Trạng thái', banner.status, 'required')}
                    </div>
                </div>
                <div className="card-footer">
                    <button disabled={this.checkFormChange()} type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }
}
export default BannerForm;
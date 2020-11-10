import React,{Component} from "react";
import store from "../../store";
import {actionToggleLoading} from "../../actions/loading";
import {toast} from "../../utils/alert";
import {IMAGE_URL} from "../../constants/config";
import SimpleReactValidator from "simple-react-validator";
import {Editor} from "@tinymce/tinymce-react";
import Blog from "../../models/Blog";
import callApi from "../../utils/api";

class BlogForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            blog: new Blog('','<p>Đây là mô tả</p>',false,null),
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
    // handle input
    handleEditorChange = (content) => {
        this.setState(prevState => ({
            blog: {...prevState.blog,content}
        }));
    }
    handleChange = (e) => {
        e.preventDefault();
        const blog = {...this.state.blog};
        if(e.target.type === 'file') {
            const file = e.target.files[[0]];
            const dom = document.getElementById('img_show');
            if(dom) dom.hidden = true;
            blog.image = file;
            this.setState({
                image_name:file.name,
                blog,
                url:URL.createObjectURL(file)
            })
        }
        blog[e.target.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({blog});
    }
    submitForm = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            const blog = this.state.blog;
            if(!blog.image) {
                document.getElementById('error_image').innerText = 'Ảnh không được rỗng';
                return;
            }
            const data = new FormData();
            for (let d in blog) data.append(d,blog[d]);
            store.dispatch(actionToggleLoading(true))
            callApi('blogs','POST',data,'multipart/form-data')
                .then(res => {
                    setTimeout(() => {
                        store.dispatch(actionToggleLoading(false))
                        for(let a of document.getElementsByClassName('errorMsg')) a.innerText = '';
                        this.props.eventAdd(res.data);
                        this.setState({
                            blog:new Blog('','<p>Đây là mô tả</p>',false,null),
                            image_name: '',
                            url: null
                        })
                        toast('success', 'Added successfully')
                    },1500)
                })
                .catch(error => {
                    store.dispatch(actionToggleLoading(false))
                    for(let e in error.response.data) {
                        document.getElementById('err_'+e).innerText = error.response.data[e];
                    }
                    toast('error','Add failure')
                })
        } else {
            this.forceUpdate();
            this.validator.showMessages();
        }
    }

    // form Change
    checkFormChange = () => {
        // let { brand } = this.props;
        // let { name, image, status} = this.state;
        // return (brand.name === name && brand.image === image && brand.status === status);
    }

    render() {
        let { blog,url,image_name,image } = this.state;
        return (
            <form role="form" onSubmit={this.submitForm}>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title"
                               name='title'
                               value={blog.title} onChange={this.handleChange}
                               placeholder="Tiêu đề"/>
                        {this.validator.message('Tiêu đề', blog.title, 'required')}
                        <span className="text-danger errorMsg" id='err_title'></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Mô tả</label>
                        <Editor
                            apiKey={'gsy092012zjj2ycmtt1hjy0efuj1rn7mvzsqbg6ixo5yji74'}
                            initialValue={blog.content}
                            init={{
                                height: 500,
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
                        {this.validator.message('Nội dung', blog.content, 'required|max:20000')}
                        <span className="text-danger errorMsg" id='err_content'></span>
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
                                <img alt='' src={IMAGE_URL+blog.image} width={'200px'}/>
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
                        <select className="form-control" style={{width:'200px'}} value={blog.status} onChange={this.handleChange} name="status" id="status">
                            <option value={false}>Disable</option>
                            <option value={true}>Active</option>
                        </select>
                        {this.validator.message('Trạng thái', blog.status, 'required')}
                    </div>
                </div>
                <div className="card-footer">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }
}
export default BlogForm;
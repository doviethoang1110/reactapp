import React,{Component} from "react";
import SimpleReactValidator from "simple-react-validator";
import {IMAGE_URL} from "../../constants/config";
import {toast} from "../../utils/alert";
import store from "../../store";
import {actionToggleLoading} from "../../actions/loading";

class UserDetailForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userDetail: {
                displayName: "",
                image: "",
                job: "",
                skill: "",
                location: "",
                education: "",
                notes: ""
            },
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
        if (this.props.item) this.setState({userDetail: this.props.item})
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({userDetail: nextProps.item});
        let dom = document.getElementById('img_show');
        if(dom) dom.hidden = false;
    }

    handleChange = (e) => {
        e.preventDefault();
        const userDetail = {...this.state.userDetail};
        if(e.target.type === 'file') {
            const file = e.target.files[[0]];
            const dom = document.getElementById('img_show');
            if(dom) dom.hidden = true;
            userDetail.image = file;
            this.setState({
                image_name:file.name,
                userDetail,
                url:URL.createObjectURL(file)
            })
        }
        userDetail[e.target.name] = e.target.value;
        this.setState({userDetail});
    }

    submitForm = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            const userDetail = this.state.userDetail;
            const id = this.props.id;
            const data = new FormData();
            for (let d in userDetail) data.append(d,userDetail[d]);
            store.dispatch(actionToggleLoading(true));
            this.props.eventEdit(id, data).then(res => {
                store.dispatch(actionToggleLoading(false));
                toast('success', res)
            }).catch(error => {
                store.dispatch(actionToggleLoading(false));
                console.log(error)
                toast('error', error);
            })
        } else {
            this.forceUpdate();
            this.validator.showMessages();
        }
    }

    // form Change
    checkFormChange = () => {
        const detail = this.props.item;
        let { displayName, job, location, notes, image, education, skill} = this.state.userDetail;
        return (detail.displayName === displayName &&
            detail.job === job && detail.location === location && detail.notes === notes
            && detail.image === image && detail.education === education && detail.skill === skill
        );
    }

    render() {
        let { userDetail,url,image_name } = this.state;
        return (
            <div className="card">
                <div className="card-header p-2">
                    <ul className="nav nav-pills">
                        <li className="nav-item"><a className="nav-link active" href="#settings"
                                                    data-toggle="tab">Chỉnh sửa</a></li>
                    </ul>
                    <span onClick={this.props.back} style={{float: 'right', cursor: 'pointer', marginTop: '-35px'}}><i className="fa fa-times"></i></span>
                </div>
                <div className="card-body">
                    <div className="tab-content">
                        <div className="tab-pane active" id="settings">
                            <form className="form-horizontal" onSubmit={this.submitForm}>
                                <div className="form-group row">
                                    <label htmlFor="displayName" className="col-sm-2 col-form-label">Tên thay thế</label>
                                    <div className="col-sm-10">
                                        <input type="text"
                                               className="form-control" id="displayName"
                                               onChange={this.handleChange} value={userDetail.displayName}
                                               name="displayName"
                                               placeholder="Tên thay thế"/>
                                    </div>
                                </div>
                                {this.validator.message('Tên thay thế', userDetail.displayName, 'required')}
                                <div className="form-group row">
                                    <label htmlFor="job"
                                           className="col-sm-2 col-form-label">Job</label>
                                    <div className="col-sm-10">
                                        <input type="text" value={userDetail.job} onChange={this.handleChange}
                                               className="form-control" id="job" name="job"
                                               placeholder="Job"/>
                                    </div>
                                </div>
                                {this.validator.message('Công việc', userDetail.job, 'required')}
                                <div className="form-group row">
                                    <label htmlFor="education"
                                           className="col-sm-2 col-form-label">Education</label>
                                    <div className="col-sm-10">
                                        <input type="text" value={userDetail.education} onChange={this.handleChange}
                                               name="education" className="form-control" id="education" placeholder="Education"/>
                                    </div>
                                </div>
                                {this.validator.message('Education', userDetail.education, 'required')}
                                <div className="form-group row">
                                    <label htmlFor="skill"
                                           className="col-sm-2 col-form-label">Skills</label>
                                    <div className="col-sm-10">
                                        <input type="text" value={userDetail.skill} onChange={this.handleChange}
                                               name="skill" className="form-control" id="skill"
                                               placeholder="Skills"/>
                                    </div>
                                </div>
                                {this.validator.message('Kỹ năng', userDetail.skill, 'required')}
                                <div className="form-group row">
                                    <label htmlFor="location"
                                           className="col-sm-2 col-form-label">Location</label>
                                    <div className="col-sm-10">
                                        <input type="text" value={userDetail.location} onChange={this.handleChange}
                                               name="location" className="form-control" id="location"
                                               placeholder="Location"/>
                                    </div>
                                </div>
                                {this.validator.message('Địa chỉ', userDetail.location, 'required')}
                                <div className="form-group row">
                                    <label htmlFor="notes"
                                           className="col-sm-2 col-form-label">Notes</label>
                                    <div className="col-sm-10">
                                        <textarea placeholder="Notes" value={userDetail.notes} onChange={this.handleChange}
                                                  name="notes" id="notes" className="form-control"></textarea>
                                    </div>
                                </div>
                                {this.validator.message('Ghi chú', userDetail.notes, 'required')}
                                <div className="form-group row">
                                    <label htmlFor="image" className="col-sm-2 col-form-label">Avatar</label>
                                    <div className="col-sm-10">
                                        <div className="custom-file">
                                            <input type="file" onChange={this.handleChange} className="form-control" id="image"/>
                                            <label className="custom-file-label" htmlFor="image">{image_name ? image_name : 'Choose file'}</label>
                                        </div>
                                    </div>
                                    <span className="text-danger" id="error_image"></span>
                                    { userDetail.image && (
                                        <div className='mt-2' id="img_show">
                                            <img alt='' src={IMAGE_URL+userDetail.image} width={'200px'}/>
                                        </div>
                                    )}
                                    { url && (
                                        <div className='mt-2'>
                                            <img alt='' src={url} width={'200px'}/>
                                        </div>
                                    )}
                                </div>
                                <div className="form-group row">
                                    <div className="offset-sm-2 col-sm-10">
                                        <button disabled={this.checkFormChange()} type="submit" className="btn btn-danger">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserDetailForm;
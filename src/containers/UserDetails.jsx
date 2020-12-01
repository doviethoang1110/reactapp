import React, {useState} from "react";
import {connect} from "react-redux";
import UserDetailForm from "../components/userDetail/UserDetailForm";
import {IMAGE_URL} from "../constants/config";
import {actionEditProfile} from "../actions/auth";

const UserDetails = (props) => {

    const [isForm, setIsForm] = useState(false);

    const edit = () => setIsForm(true);

    const back = () => setIsForm(false);

    return (
        <React.Fragment>
            <div className="row">
                <div style={{margin: '0 auto'}} className={`col-md-${isForm ? '4' : '8'}`}>
                    <div className="card card-primary card-outline">
                        <div className="card-body box-profile">
                            <div className="text-center">
                                <img className="profile-user-img img-fluid img-circle"
                                     src={props.userDetail.image ? IMAGE_URL+props.userDetail.image : 'https://cloudcone.com/wp-content/uploads/2019/03/blank-avatar.jpg'}
                                     alt=" "/>
                            </div>
                            <h3 className="profile-username text-center">{props.userDetail.displayName ? props.userDetail.displayName : props.name}</h3>

                            <p className="text-muted text-center">Job : {props.userDetail.job ? props.userDetail.job : 'No data'}</p>

                            <ul className="list-group list-group-unbordered mb-3">
                                <li className="list-group-item">
                                    <b>Friends</b> <a href="# " className="float-right">13,287</a>
                                </li>
                            </ul>

                            <button onClick={edit} className="btn btn-warning btn-block"><b>Edit</b></button>
                        </div>
                    </div>
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">About Me</h3>
                        </div>
                        <div className="card-body">
                            <strong><i className="fas fa-book mr-1"></i> Education</strong>
                            <p className="text-muted">{props.userDetail.education ? props.userDetail.education : 'No data'}</p>
                            <strong><i className="fas fa-map-marker-alt mr-1"></i> Location</strong>
                            <p className="text-muted">{props.userDetail.location ? props.userDetail.location : 'No data'}</p>
                            <strong><i className="fas fa-pencil-alt mr-1"></i> Skills</strong>
                            <p className="text-muted">{props.userDetail.skill ? props.userDetail.skill : 'No data'}</p>
                            <strong><i className="far fa-file-alt mr-1"></i> Notes</strong>
                            <p className="text-muted">{props.userDetail.notes ? props.userDetail.notes : 'No data'}</p>
                        </div>
                    </div>
                </div>
                {isForm && (
                    <div className={`col-md-8`}>
                        <UserDetailForm id={props.id} item={props.userDetail} back={back} eventEdit={props.editProfile}/>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    return {
        isLoading: state.loading,
        name: state.auth.user.name,
        id: state.auth.user.id,
        userDetail: state.auth.user.userDetail
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editProfile: (id, data) => {
            return dispatch(actionEditProfile(id, data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
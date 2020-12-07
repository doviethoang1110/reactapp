import React from "react";
import {IMAGE_URL} from "../../constants/config";

const Modal = (props) => {

    const list = !props.onlineFriends.length ? (<h3>Không ai online</h3>) : props.onlineFriends.map((f,index) => (
        <div className="row mb-3" key={index}>
            <div className="col-md-6">
                <div className="post">
                    <div className="media">
                        <div className="chat-user-img online align-self-center mr-3">
                            <img className="rounded-circle avatar-xs" src={
                                f.image ? IMAGE_URL+f.image : 'https://cloudcone.com/wp-content/uploads/2019/03/blank-avatar.jpg'
                            } alt=""/>
                            <span className="user-status"></span>
                        </div>
                        <div className="media-body overflow-hidden">
                            <span className="username">{f.displayName ? f.displayName : f.name}</span><br/>
                            <span className="description">{f.email}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <button className="btn btn-primary mr-2"><i className="fa fa-comment"></i> Trò chuyện</button>
            </div>
        </div>
    ));

    return (
        <React.Fragment>
            <div className="modal fade" id="audiocallModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-center p-4">
                                <div className="avatar-lg mx-auto mb-4">
                                    <img src="images/users/avatar-4.jpg" alt=""
                                         className="img-thumbnail rounded-circle"/>
                                </div>

                                <h5 className="text-truncate">Doris Brown</h5>
                                <p className="text-muted">Start Audio Call</p>

                                <div className="mt-5">
                                    <ul className="list-inline mb-1">
                                        <li className="list-inline-item px-2">
                                            <button type="button"
                                                    className="btn btn-danger avatar-sm rounded-circle"
                                                    data-dismiss="modal">
                                                <span className="avatar-title bg-transparent font-size-20">
                                                    <i className="ri-close-fill"></i>
                                                </span>
                                            </button>
                                        </li>
                                        <li className="list-inline-item px-2">
                                            <button type="button"
                                                    className="btn btn-success avatar-sm rounded-circle">
                                                <span className="avatar-title bg-transparent font-size-20">
                                                    <i className="ri-phone-fill"></i>
                                                </span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="videocallModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-center p-4">
                                <div className="avatar-lg mx-auto mb-4">
                                    <img src="images/users/avatar-4.jpg" alt=""
                                         className="img-thumbnail rounded-circle"/>
                                </div>

                                <h5 className="text-truncate">Doris Brown</h5>
                                <p className="text-muted mb-0">Start Video Call</p>

                                <div className="mt-5">
                                    <ul className="list-inline mb-1">
                                        <li className="list-inline-item px-2">
                                            <button type="button"
                                                    className="btn btn-danger avatar-sm rounded-circle"
                                                    data-dismiss="modal">
                                                <span className="avatar-title bg-transparent font-size-20">
                                                    <i className="ri-close-fill"></i>
                                                </span>
                                            </button>
                                        </li>
                                        <li className="list-inline-item px-2">
                                            <button type="button"
                                                    className="btn btn-success avatar-sm rounded-circle">
                                                <span className="avatar-title bg-transparent font-size-20">
                                                    <i className="ri-vidicon-fill"></i>
                                                </span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="modal fade" id="listOnline" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-center p-4" style={{height: '300px', overflowY: 'auto'}}>
                                {list}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Modal;
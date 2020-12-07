import React, {useEffect, useState} from "react";
import "../components/Messages.css";
import socket from "../utils/socket";
import {connect} from "react-redux";
import LeftSide from "../components/messages/LeftSide";
import Modal from "../components/messages/Modal";

const Messages = (props) => {

    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        window.scrollTo(0,document.body.scrollHeight);
        socket.emit("GET_ONLINE_FRIENDS", props.id);
        socket.on("RECEIVED_ONLINE_FRIENDS", (data) => {
            setOnlineFriends([...data]);
        })
    }, []);


    return (
        <React.Fragment>
            <div className="layout-wrapper d-lg-flex">
                <LeftSide friends={onlineFriends}/>
                <div className="user-chat w-100 overflow-hidden">
                    <div className="d-lg-flex">
                        <div className="w-100 overflow-hidden position-relative">
                            <div className="p-3 p-lg-4">
                                <div className="row align-items-center">
                                    <div className="col-sm-4 col-8">
                                        <div className="media align-items-center">
                                            <div className="d-block d-lg-none mr-2">
                                                <a href=" #"
                                                   className="user-chat-remove text-muted font-size-16 p-2"><i
                                                    className="ri-arrow-left-s-line"></i></a>
                                            </div>
                                            <div className="mr-3">
                                                <img src="images/users/avatar-4.jpg"
                                                     className="rounded-circle avatar-xs" alt=""/>
                                            </div>
                                            <div className="media-body overflow-hidden">
                                                <h5 className="font-size-16 mb-0 text-truncate"><a href="#"
                                                                                                   className="text-reset user-profile-show">Doris
                                                    Brown</a> <i
                                                    className="ri-record-circle-fill font-size-10 text-success d-inline-block ml-1"></i>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-8 col-4">
                                        <ul className="list-inline user-chat-nav text-right mb-0">

                                            <li className="list-inline-item">
                                                <div className="dropdown">
                                                    <button className="btn nav-btn dropdown-toggle" type="button"
                                                            data-toggle="dropdown" aria-haspopup="true"
                                                            aria-expanded="false">
                                                        <i className="ri-search-line"></i>
                                                    </button>
                                                    <div
                                                        className="dropdown-menu p-0 dropdown-menu-right dropdown-menu-md">
                                                        <div className="search-box p-2">
                                                            <input type="text"
                                                                   className="form-control bg-light border-0"
                                                                   placeholder="Search.."/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li className="list-inline-item d-none d-lg-inline-block">
                                                <button type="button" className="btn nav-btn" data-toggle="modal"
                                                        data-target="#listOnline">
                                                    <i className="ri-list-ordered"></i>
                                                </button>
                                            </li>

                                            <li className="list-inline-item d-none d-lg-inline-block">
                                                <button type="button" className="btn nav-btn" data-toggle="modal"
                                                        data-target="#audiocallModal">
                                                    <i className="ri-phone-line"></i>
                                                </button>
                                            </li>

                                            <li className="list-inline-item d-none d-lg-inline-block">
                                                <button type="button" className="btn nav-btn" data-toggle="modal"
                                                        data-target="#videocallModal">
                                                    <i className="ri-vidicon-line"></i>
                                                </button>
                                            </li>
                                            <li className="list-inline-item">
                                                <div className="dropdown">
                                                    <button className="btn nav-btn dropdown-toggle" type="button"
                                                            data-toggle="dropdown" aria-haspopup="true"
                                                            aria-expanded="false">
                                                        <i className="ri-more-fill"></i>
                                                    </button>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item d-block d-lg-none user-profile-show"
                                                           href="#">View profile <i
                                                            className="ri-user-2-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item d-block d-lg-none" href="#"
                                                           data-toggle="modal" data-target="#audiocallModal">Audio <i
                                                            className="ri-phone-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item d-block d-lg-none" href="#">Video <i
                                                            className="ri-vidicon-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="#">Archive <i
                                                            className="ri-archive-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="#">Muted <i
                                                            className="ri-volume-mute-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="#">Delete <i
                                                            className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </li>

                                        </ul>


                                    </div>
                                </div>
                            </div>
                            <div className="chat-conversation p-3 p-lg-4" data-simplebar="init">
                                <ul className="list-unstyled mb-0">
                                    <li>
                                        <div className="conversation-list">
                                            <div className="chat-avatar">
                                                <img src="images/users/avatar-4.jpg" alt=""/>
                                            </div>

                                            <div className="user-chat-content">
                                                <div className="ctext-wrap">
                                                    <div className="ctext-wrap-content">
                                                        <p className="mb-0">
                                                            Good morning
                                                        </p>
                                                        <p className="chat-time mb-0"><i
                                                            className="ri-time-line align-middle"></i> <span
                                                            className="align-middle">10:00</span></p>
                                                    </div>
                                                    <div className="dropdown align-self-start">
                                                        <a className="dropdown-toggle" href="#" role="button"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="ri-more-2-fill"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item" href="#">Copy <i
                                                                className="ri-file-copy-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Save <i
                                                                className="ri-save-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Forward <i
                                                                className="ri-chat-forward-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Delete <i
                                                                className="ri-delete-bin-line float-right text-muted"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="conversation-name">Doris Brown</div>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="right">
                                        <div className="conversation-list">
                                            <div className="chat-avatar">
                                                <img src="images/users/avatar-1.jpg" alt=""/>
                                            </div>

                                            <div className="user-chat-content">
                                                <div className="ctext-wrap">
                                                    <div className="ctext-wrap-content">
                                                        <p className="mb-0">
                                                            Good morning, How are you? What about our next meeting?
                                                        </p>
                                                        <p className="chat-time mb-0"><i
                                                            className="ri-time-line align-middle"></i> <span
                                                            className="align-middle">10:02</span></p>
                                                    </div>

                                                    <div className="dropdown align-self-start">
                                                        <a className="dropdown-toggle" href="#" role="button"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="ri-more-2-fill"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item" href="#">Copy <i
                                                                className="ri-file-copy-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Save <i
                                                                className="ri-save-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Forward <i
                                                                className="ri-chat-forward-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Delete <i
                                                                className="ri-delete-bin-line float-right text-muted"></i></a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="conversation-name">Patricia Smith</div>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="chat-day-title">
                                            <span className="title">Today</span>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="conversation-list">
                                            <div className="chat-avatar">
                                                <img src="images/users/avatar-4.jpg" alt=""/>
                                            </div>

                                            <div className="user-chat-content">

                                                <div className="ctext-wrap">
                                                    <div className="ctext-wrap-content">
                                                        <p className="mb-0">
                                                            Yeah everything is fine
                                                        </p>
                                                        <p className="chat-time mb-0"><i
                                                            className="ri-time-line align-middle"></i> <span
                                                            className="align-middle">10:05</span></p>
                                                    </div>
                                                    <div className="dropdown align-self-start">
                                                        <a className="dropdown-toggle" href="#" role="button"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="ri-more-2-fill"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item" href="#">Copy <i
                                                                className="ri-file-copy-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Save <i
                                                                className="ri-save-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Forward <i
                                                                className="ri-chat-forward-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Delete <i
                                                                className="ri-delete-bin-line float-right text-muted"></i></a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="ctext-wrap">
                                                    <div className="ctext-wrap-content">
                                                        <p className="mb-0">
                                                            & Next meeting tomorrow 10.00AM
                                                        </p>
                                                        <p className="chat-time mb-0"><i
                                                            className="ri-time-line align-middle"></i> <span
                                                            className="align-middle">10:05</span></p>
                                                    </div>
                                                    <div className="dropdown align-self-start">
                                                        <a className="dropdown-toggle" href="#" role="button"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="ri-more-2-fill"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item" href="#">Copy <i
                                                                className="ri-file-copy-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Save <i
                                                                className="ri-save-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Forward <i
                                                                className="ri-chat-forward-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Delete <i
                                                                className="ri-delete-bin-line float-right text-muted"></i></a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="conversation-name">Doris Brown</div>
                                            </div>

                                        </div>
                                    </li>

                                    <li className="right">
                                        <div className="conversation-list">
                                            <div className="chat-avatar">
                                                <img src="images/users/avatar-1.jpg" alt=""/>
                                            </div>

                                            <div className="user-chat-content">
                                                <div className="ctext-wrap">
                                                    <div className="ctext-wrap-content">
                                                        <p className="mb-0">
                                                            Wow that's great
                                                        </p>
                                                        <p className="chat-time mb-0"><i
                                                            className="ri-time-line align-middle"></i> <span
                                                            className="align-middle">10:06</span></p>
                                                    </div>
                                                    <div className="dropdown align-self-start">
                                                        <a className="dropdown-toggle" href="#" role="button"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="ri-more-2-fill"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item" href="#">Copy <i
                                                                className="ri-file-copy-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Save <i
                                                                className="ri-save-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Forward <i
                                                                className="ri-chat-forward-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Delete <i
                                                                className="ri-delete-bin-line float-right text-muted"></i></a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="conversation-name">Patricia Smith</div>
                                            </div>

                                        </div>
                                    </li>

                                    <li>
                                        <div className="conversation-list">
                                            <div className="chat-avatar">
                                                <img src="images/users/avatar-4.jpg" alt=""/>
                                            </div>

                                            <div className="user-chat-content">
                                                <div className="ctext-wrap">

                                                    <div className="ctext-wrap-content">
                                                        <ul className="list-inline message-img  mb-0">
                                                            <li className="list-inline-item message-img-list">
                                                                <div>
                                                                    <a className="popup-img d-inline-block m-1"
                                                                       href="images/small/img-1.jpg"
                                                                       title="Project 1">
                                                                        <img src="images/small/img-1.jpg" alt=""
                                                                             className="rounded border"/>
                                                                    </a>
                                                                </div>
                                                                <div className="message-img-link">
                                                                    <ul className="list-inline mb-0">
                                                                        <li className="list-inline-item">
                                                                            <a href="#">
                                                                                <i className="ri-download-2-line"></i>
                                                                            </a>
                                                                        </li>
                                                                        <li className="list-inline-item dropdown">
                                                                            <a className="dropdown-toggle" href="#"
                                                                               role="button" data-toggle="dropdown"
                                                                               aria-haspopup="true"
                                                                               aria-expanded="false">
                                                                                <i className="ri-more-fill"></i>
                                                                            </a>
                                                                            <div className="dropdown-menu">
                                                                                <a className="dropdown-item"
                                                                                   href="#">Copy <i
                                                                                    className="ri-file-copy-line float-right text-muted"></i></a>
                                                                                <a className="dropdown-item"
                                                                                   href="#">Save <i
                                                                                    className="ri-save-line float-right text-muted"></i></a>
                                                                                <a className="dropdown-item"
                                                                                   href="#">Forward <i
                                                                                    className="ri-chat-forward-line float-right text-muted"></i></a>
                                                                                <a className="dropdown-item"
                                                                                   href="#">Delete <i
                                                                                    className="ri-delete-bin-line float-right text-muted"></i></a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </li>

                                                            <li className="list-inline-item message-img-list">
                                                                <div>
                                                                    <a className="popup-img d-inline-block m-1"
                                                                       href="images/small/img-2.jpg"
                                                                       title="Project 2">
                                                                        <img src="images/small/img-2.jpg" alt=""
                                                                             className="rounded border"/>
                                                                    </a>
                                                                </div>
                                                                <div className="message-img-link">
                                                                    <ul className="list-inline mb-0">
                                                                        <li className="list-inline-item">
                                                                            <a href="#">
                                                                                <i className="ri-download-2-line"></i>
                                                                            </a>
                                                                        </li>
                                                                        <li className="list-inline-item dropdown">
                                                                            <a className="dropdown-toggle" href="#"
                                                                               role="button" data-toggle="dropdown"
                                                                               aria-haspopup="true"
                                                                               aria-expanded="false">
                                                                                <i className="ri-more-fill"></i>
                                                                            </a>
                                                                            <div className="dropdown-menu">
                                                                                <a className="dropdown-item"
                                                                                   href="#">Copy <i
                                                                                    className="ri-file-copy-line float-right text-muted"></i></a>
                                                                                <a className="dropdown-item"
                                                                                   href="#">Save <i
                                                                                    className="ri-save-line float-right text-muted"></i></a>
                                                                                <a className="dropdown-item"
                                                                                   href="#">Forward <i
                                                                                    className="ri-chat-forward-line float-right text-muted"></i></a>
                                                                                <a className="dropdown-item"
                                                                                   href="#">Delete <i
                                                                                    className="ri-delete-bin-line float-right text-muted"></i></a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <p className="chat-time mb-0"><i
                                                            className="ri-time-line align-middle"></i> <span
                                                            className="align-middle">10:09</span></p>
                                                    </div>

                                                    <div className="dropdown align-self-start">
                                                        <a className="dropdown-toggle" href="#" role="button"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="ri-more-2-fill"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item" href="#">Copy <i
                                                                className="ri-file-copy-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Save <i
                                                                className="ri-save-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Forward <i
                                                                className="ri-chat-forward-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Delete <i
                                                                className="ri-delete-bin-line float-right text-muted"></i></a>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="conversation-name">Doris Brown</div>
                                            </div>

                                        </div>
                                    </li>

                                    <li className="right">
                                        <div className="conversation-list">
                                            <div className="chat-avatar">
                                                <img src="images/users/avatar-1.jpg" alt=""/>
                                            </div>

                                            <div className="user-chat-content">
                                                <div className="ctext-wrap">

                                                    <div className="ctext-wrap-content">
                                                        <div className="card p-2 mb-2">
                                                            <div className="media align-items-center">
                                                                <div className="avatar-sm mr-3">
                                                                    <div
                                                                        className="avatar-title bg-soft-primary text-primary rounded font-size-20">
                                                                        <i className="ri-file-text-fill"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="media-body">
                                                                    <div className="text-left">
                                                                        <h5 className="font-size-14 mb-1">admin_v1.0.zip</h5>
                                                                        <p className="text-muted font-size-13 mb-0">12.5
                                                                            MB</p>
                                                                    </div>
                                                                </div>

                                                                <div className="ml-4">
                                                                    <ul className="list-inline mb-0 font-size-20">
                                                                        <li className="list-inline-item">
                                                                            <a href="#" className="text-muted">
                                                                                <i className="ri-download-2-line"></i>
                                                                            </a>
                                                                        </li>
                                                                        <li className="list-inline-item dropdown">
                                                                            <a className="dropdown-toggle text-muted"
                                                                               href="#" role="button"
                                                                               data-toggle="dropdown"
                                                                               aria-haspopup="true"
                                                                               aria-expanded="false">
                                                                                <i className="ri-more-fill"></i>
                                                                            </a>
                                                                            <div
                                                                                className="dropdown-menu dropdown-menu-right">
                                                                                <a className="dropdown-item"
                                                                                   href="#">Share <i
                                                                                    className="ri-share-line float-right text-muted"></i></a>
                                                                                <a className="dropdown-item"
                                                                                   href="#">Delete <i
                                                                                    className="ri-delete-bin-line float-right text-muted"></i></a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <p className="chat-time mb-0"><i
                                                            className="ri-time-line align-middle"></i> <span
                                                            className="align-middle">10:16</span></p>
                                                    </div>

                                                    <div className="dropdown align-self-start">
                                                        <a className="dropdown-toggle" href="#" role="button"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="ri-more-2-fill"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item" href="#">Copy <i
                                                                className="ri-file-copy-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Save <i
                                                                className="ri-save-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Forward <i
                                                                className="ri-chat-forward-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href="#">Delete <i
                                                                className="ri-delete-bin-line float-right text-muted"></i></a>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="conversation-name">Patricia Smith</div>
                                            </div>

                                        </div>
                                    </li>

                                    <li>
                                        <div className="conversation-list">
                                            <div className="chat-avatar">
                                                <img src="images/users/avatar-4.jpg" alt=""/>
                                            </div>

                                            <div className="user-chat-content">
                                                <div className="ctext-wrap">
                                                    <div className="ctext-wrap-content">
                                                        <p className="mb-0">
                                                            typing
                                                            <span className="animate-typing">
                                                            <span className="dot"></span>
                                                            <span className="dot"></span>
                                                            <span className="dot"></span>
                                                        </span>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="conversation-name">Doris Brown</div>
                                            </div>

                                        </div>
                                    </li>

                                </ul>
                            </div>
                            <div className="chat-input-section p-3 p-lg-4">
                                <div className="row no-gutters">
                                    <div className="col">
                                        <div>
                                            <input type="text"
                                                   className="form-control form-control-lg bg-dark border-dark"
                                                   placeholder="Enter Message..."/>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <div className="chat-input-links ml-md-2">
                                            <ul className="list-inline mb-0">
                                                <li className="list-inline-item" data-toggle="tooltip"
                                                    data-placement="top" title="Emoji">
                                                    <button type="button"
                                                            className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect">
                                                        <i className="ri-emotion-happy-line"></i>
                                                    </button>
                                                </li>
                                                <li className="list-inline-item" data-toggle="tooltip"
                                                    data-placement="top" title="Attached File">
                                                    <button type="button"
                                                            className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect">
                                                        <i className="ri-attachment-line"></i>
                                                    </button>
                                                </li>
                                                <li className="list-inline-item">
                                                    <button type="submit"
                                                            className="btn btn-primary font-size-16 btn-lg chat-send waves-effect waves-light">
                                                        <i className="ri-send-plane-2-fill"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal onlineFriends={onlineFriends}/>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.user.id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
import React, {useEffect, useState} from "react";
import {IMAGE_URL} from "../constants/config";
import {connect} from "react-redux";
import callApi from "../utils/api";
import {destroyFriendRequest,addFriendRequest} from "../utils/socket/friendRequest";
import socket from "../utils/socket";

const Profile = (props) => {

    const [profile, setProfile] = useState({
        id: null, name: "", email: "", status: null,
        displayName: "",job:"",location: "",image:"",skill:"",education:"",notes:""
    });

    const addFriend = (e, id) => {
        e.preventDefault();
        const sender = {
            name: props.user.name,
            displayName: props.user.userDetail.displayName,
            email: props.user.email,
            image: props.user.userDetail.image,
            id: props.user.id
        };
        const receiver = {
            name: profile.name,
            displayName: profile.displayName,
            email: profile.email,
            image: profile.image,
            id,
        };
        addFriendRequest({sender, receiver});
        const newProfile = {...profile,status: 1, userActionId: props.user.id};
        setProfile(newProfile);
    }

    const removeFriendRequest = (e, id) => {
        e.preventDefault();
        destroyFriendRequest({requesterId: props.user.id, addresserId: id});
        const newProfile = {...profile,status: null, userActionId: null};
        setProfile(newProfile)
    }

    useEffect(() => {
        const id = +props.match.params.id.substring(props.match.params.id.indexOf("_")+1);
        callApi(`users/${props.user.id}/profile/${id}`)
            .then(res => {
                setProfile(res.data[0]);
            }).catch(error => {
                console.log(error);
        });
    },[]);

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card card-primary card-outline">
                            <div className="card-body box-profile">
                                <div className="text-center">
                                    <img className="profile-user-img img-fluid img-circle"
                                         src={
                                             profile.image ? IMAGE_URL+profile.image : 'https://cloudcone.com/wp-content/uploads/2019/03/blank-avatar.jpg'
                                         } alt=""/>
                                </div>
                                <h3 className="profile-username text-center">Name: {profile.displayName || profile.name}</h3>
                                <p className="text-muted text-center">Email: {profile.email}</p>
                                <p className="text-muted text-center">Job: {profile.job || 'Không'}</p>

                                <ul className="list-group list-group-unbordered mb-3">
                                    <li className="list-group-item">
                                        <b>Friends</b> <a className="float-right">13,287</a>
                                    </li>
                                </ul>
                                {(profile.status && profile.status === 3) && (
                                    <button className="btn btn-success btn-block"><b>Bạn bè</b></button>
                                )}
                                {(profile.status && profile.status === 1 && profile.userActionId) && (
                                    profile.userActionId === props.user.id ? (
                                        <button onClick={(e) => removeFriendRequest(e, profile.id)} className="btn btn-danger btn-block"><b>Hủy yêu cầu kết bạn</b></button>
                                    ) : (
                                        <button className="btn btn-primary btn-block"><b>Chấp nhận yêu cầu kết bạn</b></button>
                                    )
                                )}
                                {(!profile.status && !profile.userActionId) && (
                                    <button onClick={(e) => addFriend(e, profile.id)} className="btn btn-info btn-block"><b>Thêm bạn bè</b></button>
                                )}
                            </div>
                        </div>
                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title">About Me</h3>
                            </div>
                            <div className="card-body">
                                <strong><i className="fas fa-book mr-1"></i> Education</strong>
                                <p className="text-muted">{profile.education || 'Không'}</p>
                                <hr/>
                                <strong><i className="fas fa-map-marker-alt mr-1"></i> Location</strong>
                                <p className="text-muted">{profile.location || 'Không'}</p>
                                <strong><i className="fas fa-pencil-alt mr-1"></i> Skills</strong>
                                <p className="text-muted">{profile.skill || 'Không'}</p>
                                <strong><i className="far fa-file-alt mr-1"></i> Notes</strong>
                                <p className="text-muted">{profile.notes || 'Không'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-header p-2">
                                <ul className="nav nav-pills">
                                    <li className="nav-item"><a className="nav-link active" href="#activity"
                                                                data-toggle="tab">Activity</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#timeline"
                                                                data-toggle="tab">Timeline</a></li>
                                </ul>
                            </div>
                            <div className="card-body">
                                <div className="tab-content">
                                    <div className="active tab-pane" id="activity">
                                        <div className="post">
                                            <div className="user-block">
                                                <img className="img-circle img-bordered-sm"
                                                     src="../../dist/img/user1-128x128.jpg" alt=""/>
                        <span className="username">
                          <a href=" #">Jonathan Burke Jr.</a>
                          <a href=" #" className="float-right btn-tool"><i className="fas fa-times"></i></a>
                        </span>
                                                    <span className="description">Shared publicly - 7:30 PM today</span>
                                            </div>
                                            <p>
                                                Lorem ipsum represents a long-held tradition for designers,
                                                typographers and the like. Some people hate it and argue for
                                                its demise, but others ignore the hate as they create awesome
                                                tools to help create filler text for everyone from bacon lovers
                                                to Charlie Sheen fans.
                                            </p>

                                            <p>
                                                <a href=" #" className="link-black text-sm mr-2"><i
                                                    className="fas fa-share mr-1"></i> Share</a>
                                                <a href=" #" className="link-black text-sm"><i
                                                    className="far fa-thumbs-up mr-1"></i> Like</a>
                                                <span className="float-right">
                          <a href=" #" className="link-black text-sm">
                            <i className="far fa-comments mr-1"></i> Comments (5)
                          </a>
                        </span>
                                            </p>

                                            <input className="form-control form-control-sm" type="text"
                                                   placeholder="Type a comment"/>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="timeline">
                                        <div className="timeline timeline-inverse">
                                            <div className="time-label">
                        <span className="bg-danger">
                          10 Feb. 2014
                        </span>
                                            </div>
                                            <div>
                                                <i className="fas fa-envelope bg-primary"></i>

                                                <div className="timeline-item">
                                                    <span className="time"><i className="far fa-clock"></i> 12:05</span>
                                                    <h3 className="timeline-header"><a href=" #">Support Team</a> sent
                                                        you an email</h3>
                                                    <div className="timeline-body">
                                                        Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                                                        weebly ning heekya handango imeem plugg dopplr jibjab, movity
                                                        jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo
                                                        kaboodle
                                                        quora plaxo ideeli hulu weebly balihoo...
                                                    </div>
                                                    <div className="timeline-footer">
                                                        <a href=" #" className="btn btn-primary btn-sm">Read more</a>
                                                        <a href=" #" className="btn btn-danger btn-sm">Delete</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <i className="fas fa-user bg-info"></i>

                                                <div className="timeline-item">
                                                    <span className="time"><i
                                                        className="far fa-clock"></i> 5 mins ago</span>

                                                    <h3 className="timeline-header border-0"><a href=" #">Sarah
                                                        Young</a> accepted your friend request
                                                    </h3>
                                                </div>
                                            </div>
                                            <div>
                                                <i className="fas fa-comments bg-warning"></i>

                                                <div className="timeline-item">
                                                    <span className="time"><i className="far fa-clock"></i> 27 mins ago</span>

                                                    <h3 className="timeline-header"><a href=" #">Jay White</a> commented
                                                        on your post</h3>

                                                    <div className="timeline-body">
                                                        Take me to your leader!
                                                        Switzerland is small and neutral!
                                                        We are more like Germany, ambitious and misunderstood!
                                                    </div>
                                                    <div className="timeline-footer">
                                                        <a href=" #" className="btn btn-warning btn-flat btn-sm">View
                                                            comment</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="time-label">
                        <span className="bg-success">
                          3 Jan. 2014
                        </span>
                                            </div>
                                            <div>
                                                <i className="fas fa-camera bg-purple"></i>

                                                <div className="timeline-item">
                                                    <span className="time"><i
                                                        className="far fa-clock"></i> 2 days ago</span>

                                                    <h3 className="timeline-header"><a href=" #">Mina Lee</a> uploaded
                                                        new photos</h3>

                                                    <div className="timeline-body">
                                                        <img src="http://placehold.it/150x100" alt=""/>
                                                            <img src="http://placehold.it/150x100" alt=""/>
                                                                <img src="http://placehold.it/150x100" alt=""/>
                                                                    <img src="http://placehold.it/150x100" alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <i className="far fa-clock bg-gray"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    };
};

export default connect(mapStateToProps, null)(Profile);
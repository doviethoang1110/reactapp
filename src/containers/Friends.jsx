import React, {useEffect, useState} from "react";
import Contact from "../components/friend/contact/Contact";
import {connect} from "react-redux";
import ListFriend from "../components/friend/listfriend/ListFriend";
import callApi from "../utils/api";
import ListRequest from "../components/friend/listfriend/ListRequest";
import RequestReceived from "../components/friend/listfriend/RequestReceived";
import socket from "../utils/socket";

const Friends = (props) => {

    const [friends, setFriends] = useState([]);
    const [addFriendRequest, setAddFriendRequest] = useState([]);

    useEffect(() => {
        callApi(`users/${props.user.id}/listFriends`)
            .then(res => {
                setFriends(res.data.listFriend);
                setAddFriendRequest(res.data.addFriendRequest);
            }).catch(error => {
                console.log(error);
            });
        socket.on("ADD_FRIEND_REQUEST_SUCCESS", (data) => {
            addFriendRequest.push(data)
            setAddFriendRequest(addFriendRequest);
        });
    }, []);

    return (
        <React.Fragment>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="contact-tab" data-toggle="tab" href="#contact" role="tab"
                       aria-controls="home" aria-selected="true">Tìm bạn bè</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="list-friend-tab" data-toggle="tab" href="#list-friend" role="tab"
                       aria-controls="profile" aria-selected="false">Danh sách bạn bè</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="wait-tab" data-toggle="tab" href="#wait" role="tab"
                       aria-controls="profile" aria-selected="false">Đang chờ xác nhận <span className="text-primary">({addFriendRequest.length})</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="request-tab" data-toggle="tab" href="#request" role="tab"
                       aria-controls="profile" aria-selected="false">Yêu cầu kết bạn <span className="text-primary">({props.requestsReceived.length})</span></a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="contact" role="tabpanel">
                    <Contact user={props.user}/>
                </div>
                <div className="tab-pane fade show" id="list-friend" role="tabpanel">
                    <ListFriend friends={friends}/>
                </div>
                <div className="tab-pane fade show" id="wait" role="tabpanel">
                    <ListRequest request={addFriendRequest}/>
                </div>
                <div className="tab-pane fade show" id="request" role="tabpanel">
                    <RequestReceived requestsReceived={props.requestsReceived}/>
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
import React, {useEffect, useState} from "react";
import "../components/Messages.css";
import socket from "../utils/socket";
import {connect} from "react-redux";
import LeftSide from "../components/messages/LeftSide";
import Modal from "../components/messages/Modal";
import RightSide from "../components/messages/RightSide";
import callApi from "../utils/api";
import {getDatas} from "../utils/helpers";

const Messages = (props) => {

    const [onlineFriends, setOnlineFriends] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [friends, setFriends] = useState([]);
    const [conversation, setConversation] = useState({
        id: null,
        name: '',
        displayName: '',
        image: '',
        participants: [],
        messages: []
    });

    useEffect(() => {
        window.scrollTo(0,document.body.scrollHeight);
        getDatas(`users/${props.id}/listFriends`, setFriends);
        socket.emit("GET_CONVERSATIONS", props.id);
        socket.emit("GET_ONLINE_FRIENDS", props.id);
        socket.on("RECEIVED_ONLINE_FRIENDS", (data) => {
            setOnlineFriends([...data]);
        });
        socket.on("RECEIVED_CONVERSATIONS", (data) => {
            setConversations(data);
        });
    }, []);

    const newChat = (e, param) => {
        e.preventDefault();
        callApi(`users/${props.id}/newChat/${param}`)
            .then(res => {
                if(!res.data.id) {
                    const {id, name, displayName, image} = friends.find(c => c.id === param);
                    setConversation({...conversation, userId:id, name, displayName, image});
                } else setConversation(res.data);
            }).catch(error => {
                console.log(error)
                setConversation({...conversation});
            })
    }

    const setConversationId = ({conId, updatedAt}) => {
        const data = {...conversation, id:conId};
        console.log(data);
        setConversation(data);
    }

    const getConversation = (id) => {
        const {conversationName, userDisplayName , userName, conversationImage, userImage, type} =
            conversations.find(c => c.id === id);
        const conversation = {
            id, name: (conversationName || userDisplayName || userName),
            image: (conversationImage || userImage), type
        }
        socket.emit("GET_MESSAGES", {id, type});
        socket.on("RECEIVED_MESSAGES" , (data) => {
            conversation.messages = data.messages;
            conversation.participants = data.users.map(u => u.id);
            setConversation(conversation)
        })
    }

    return (
        <React.Fragment>
            <div className="layout-wrapper d-lg-flex">
                <LeftSide conversations={conversations} id={props.id} eventGetConversation={getConversation}/>
                <RightSide setConversationId={setConversationId} id={props.id} conversation={conversation}/>
                <Modal newChat={newChat} friends={friends}/>
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
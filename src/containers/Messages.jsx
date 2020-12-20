import React, {useEffect, useState} from "react";
import "../components/Messages.css";
import socket from "../utils/socket";
import {connect} from "react-redux";
import LeftSide from "../components/messages/LeftSide";
import Modal from "../components/messages/Modal";
import RightSide from "../components/messages/RightSide";
import callApi from "../utils/api";
import {getDatas, sortConversations, sortMessages} from "../utils/helpers";

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
        messages: [],
        totalPages: null
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
            setConversations(sortConversations(data));
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
        setConversation(data);
    }

    const getConversation = (id) => {
        const {conversationName, userDisplayName , userName, conversationImage, userImage, type} =
            conversations.find(c => c.id === id);
        const conversation = {
            id, name: (conversationName || userDisplayName || userName),
            image: (conversationImage || userImage), type
        }
        socket.emit("GET_MESSAGES", {id, type, page: 0});
        socket.on("RECEIVED_MESSAGES" , ({messages, participants, totalPages}) => {
            conversation.messages = sortMessages(messages);
            conversation.participants = participants.users.map(u => u.id);
            conversation.totalPages = totalPages;
            setConversation(conversation)
        })
    }

    const createGroupChat = (data) => {
        callApi(`conversations`, 'POST', data)
            .then(res => {
                const data = [...conversations, res.data];
                setConversations(sortConversations(data));
            }).catch(error => {
                console.log(error);
        })
    }

    const updateConversation = ({message, senderDisplayName, updatedAt, conversationId}) => {
        setTimeout(() => {
            const index = conversations.indexOf(conversations.find(c => c.id === conversationId));
            if(index > -1) {
                conversations[index].message = message;
                conversations[index].senderDisplayName = senderDisplayName;
                conversations[index].updatedAt = updatedAt;
            }
            setConversations(sortConversations([...conversations]))
        },0)
    }

    return (
        <React.Fragment>
            <div className="layout-wrapper d-lg-flex">
                <LeftSide conversations={conversations} id={props.id} eventGetConversation={getConversation}/>
                <RightSide name={props.name} image={props.image}
                    setConversationId={setConversationId} friends={friends}
                           eventUpdateConversation={updateConversation}
                    id={props.id} conversation={conversation}/>
                <Modal newChat={newChat} friends={friends} id={props.id} eventCreateGroupChat={createGroupChat}/>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.user.id,
        name: state.auth.user.userDetail.displayName || state.auth.user.name,
        image: state.auth.user.userDetail.image
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
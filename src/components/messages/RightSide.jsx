import React, {useEffect, useRef, useState} from "react";
import {IMAGE_URL} from "../../constants/config";
import socket from "../../utils/socket";
import {getTimeMessage, sortMessages} from "../../utils/helpers";
import "../../components/RightSide.css";

const RightSide = (props) => {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [typings, setTypings] = useState([]);
    const input = useRef();
    const loader = useRef(null);
    const block = useRef(null);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setMessages(props.conversation.messages);
        setPage(0);
        scrollToBottom();
    }, [props.conversation.name]);

    const scrollToBottom = () => {
        const items = document.querySelectorAll(".listMessages");
        if(items.length) items[items.length-1].scrollIntoView();
    }

    const scroll = (e) => {
        if(+page < +props.conversation.totalPages) {
            if(e.target.scrollTop < 80) {
                loader.current.style.display = 'block';
                block.current.style.display = 'block';
                const number = +page + 1;
                setPage(number);
                socket.emit("LOADMORE_MESSAGES", {id: props.conversation.id, type: props.conversation.type, page: number});
                socket.on("RECEIVED_LOADMORE_MESSAGES" , (datas) => {
                    loader.current.style.display = 'none';
                    block.current.style.display = 'none';
                    if(!datas.length) return;
                    else setMessages(sortMessages([...messages, ...datas]))
                })
            }
        }else return;
    }


    useEffect(() => {
        socket.on("RECEIVED_MESSAGE", (data) => {
            messages.push(data);
            props.eventUpdateConversation(
                {message: data.message,
                    updatedAt: data.updatedAt,
                    conversationId: data.conversationId, senderDisplayName: data.name
                })
            setMessages(sortMessages([...messages]));
            scrollToBottom();
        })
    }, [messages.length]);

    useEffect(() => {
        const ele = document.getElementById("block")
        if(ele) ele.scrollIntoView()
        console.log('ok')
    },[document.getElementById("block")]);


    useEffect(() => {
        socket.on("TYPING_MESSAGE", ({conversationId, name, image, type}) => {
            if(typings.indexOf(typings.find(m => m.name === name)) < 0) {
                typings.push({name, image, conversationId, type})
                setTypings([...typings]);
                scrollToBottom();
            }
        });
        socket.on("CLEAR_TYPING", (name) => {
            typings.splice(typings.indexOf(typings.find(t => t.name === name)));
            setTypings([...typings]);
        });
    }, [])

    const handleChange = (e) => setMessage(e.target.value);

    const handleRequest = (message) => {
        let request;
        if(props.conversation.id) {
            request = {message, userId: props.id, type: props.conversation.type,
                participants: props.conversation.participants, conversationId: props.conversation.id};
            if(props.conversation.type === 'group') {
                request.name = props.name;
                request.image = props.image;
            }
        } else
            request = {message, userId: props.id,
                creatorId:props.id, conversationId: props.conversation.id,
                participants: [props.id,props.conversation.userId]
        };
        setMessage('');
        socket.emit("SAVE_MESSAGE", request);
        input.current.focus();
        scrollToBottom();
    }

    const typing = () => {
        let data;
        if(props.conversation.type === 'group')
            data = {conversationId: props.conversation.id, name: props.name, image: props.image, type: props.conversation.type,
                participants: props.conversation.participants}
        else data = {conversationId: props.conversation.id, type: props.conversation.type,
            participants: props.conversation.participants}
        socket.emit("TYPING", data);
    }

    const clearTyping =() => socket.emit("CLEAR_TYPING", {conversationId: props.conversation.id, name: props.name,
        participants: props.conversation.participants});

    const keyDown = (e) => {
        const val = e.target.value;
        if(!val) return;
        if (e.key === 'Enter' && e.keyCode === 13 && val) {
            e.preventDefault();
            handleRequest(val);
        }
    }

    const submit = (e) => {
        e.preventDefault();
        if(!message) return;
        handleRequest(message);
    }

    return (
        <React.Fragment>
            <div className="user-chat w-100 overflow-hidden">
                <div className="d-lg-flex">
                    <div className="w-100 overflow-hidden position-relative">
                        {(props.conversation.id || props.conversation.displayName || props.conversation.name) ? (
                            <React.Fragment>
                                <div className="p-3 p-lg-4">
                                    <div className="row align-items-center">
                                        <div className="col-sm-4 col-8">
                                            <div className="media align-items-center">
                                                <div className="mr-3">
                                                    <img src={
                                                        props.conversation.image ? IMAGE_URL+props.conversation.image :
                                                            'https://cloudcone.com/wp-content/uploads/2019/03/blank-avatar.jpg'
                                                    }
                                                         className="rounded-circle avatar-xs" alt=""/>
                                                </div>
                                                <div className="media-body overflow-hidden">
                                                    <h5 className="font-size-16 mb-0 text-truncate"><a href=" #"
                                                                                                       className="text-reset user-profile-show">
                                                        {props.conversation.name}
                                                    </a> <i
                                                        className="ri-record-circle-fill font-size-10 text-success d-inline-block ml-1"></i>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-8 col-4">
                                            <ul className="list-inline user-chat-nav text-right mb-0">
                                                <li className="list-inline-item d-none d-lg-inline-block">
                                                    <button type="button" className="btn nav-btn" data-toggle="modal"
                                                            data-target="#audiocallModal">
                                                        <i className="fa fa-phone"></i>
                                                    </button>
                                                </li>

                                                <li className="list-inline-item d-none d-lg-inline-block">
                                                    <button type="button" className="btn nav-btn" data-toggle="modal"
                                                            data-target="#videocallModal">
                                                        <i className="fa fa-video"></i>
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
                                                               href=" #">View profile <i
                                                                className="ri-user-2-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item d-block d-lg-none" href=" #"
                                                               data-toggle="modal" data-target="#audiocallModal">Audio <i
                                                                className="ri-phone-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item d-block d-lg-none" href=" #">Video <i
                                                                className="ri-vidicon-line float-right text-muted"></i></a>
                                                            {props.conversation.type === 'group' && (
                                                                <a className="dropdown-item"
                                                                   data-toggle="modal" data-target="#members"
                                                                   href=" #">Members <i
                                                                    className="fa fa-user float-right text-muted"></i></a>
                                                            )}
                                                            <a className="dropdown-item" href=" #">Archive <i
                                                                className="ri-archive-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href=" #">Muted <i
                                                                className="ri-volume-mute-line float-right text-muted"></i></a>
                                                            <a className="dropdown-item" href=" #">Delete <i
                                                                className="ri-delete-bin-line float-right text-muted"></i></a>
                                                        </div>
                                                    </div>
                                                </li>

                                            </ul>


                                        </div>
                                    </div>
                                </div>
                                <div onScroll={scroll} className="chat-conversation p-3 p-lg-4" data-simplebar="init">
                                    <div ref={loader} className="loader"></div>
                                    <div ref={block} style={{height: '80px'}}></div>
                                    <ul className="list-unstyled mb-0">
                                        {messages.length > 0 && (
                                            <React.Fragment>
                                                {messages.map((m, index) => (
                                                    <React.Fragment key={index}>
                                                        <li className={`${(+props.id === +m.userId) ? 'right' : ''} listMessages`}>
                                                            <div className="conversation-list">
                                                                {props.conversation.type === 'group' && props.id !== m.userId && (
                                                                    <div className="chat-avatar">
                                                                        <img src={
                                                                            m?.user?.userDetail.image || m?.image
                                                                            ? IMAGE_URL+(m?.user?.userDetail.image || m?.image)
                                                                                : 'https://cloudcone.com/wp-content/uploads/2019/03/blank-avatar.jpg'
                                                                        } alt=" "/>
                                                                    </div>
                                                                )}
                                                                <div className="user-chat-content">
                                                                    <div className="ctext-wrap">
                                                                        <div className="ctext-wrap-content">
                                                                            <p className="mb-0" style={{textAlign: (+props.id === +m.userId) ? 'left' : 'right'}}>{m.message}</p>
                                                                            <p className="chat-time mb-0"><i
                                                                                className="fa fa-clock align-middle"></i> <span
                                                                                className="align-middle">{getTimeMessage(m.createdAt)}</span></p>
                                                                        </div>
                                                                        <div className="dropdown align-self-start">
                                                                            <a className="dropdown-toggle" href=" #" role="button"
                                                                               data-toggle="dropdown" aria-haspopup="true"
                                                                               aria-expanded="false">
                                                                                <i className="ri-more-2-fill"></i>
                                                                            </a>
                                                                            <div className="dropdown-menu">
                                                                                <a className="dropdown-item" href=" #">Copy <i
                                                                                    className="ri-file-copy-line float-right text-muted"></i></a>
                                                                                <a className="dropdown-item" href=" #">Save <i
                                                                                    className="ri-save-line float-right text-muted"></i></a>
                                                                                <a className="dropdown-item" href=" #">Forward <i
                                                                                    className="ri-chat-forward-line float-right text-muted"></i></a>
                                                                                <a className="dropdown-item" href=" #">Delete <i
                                                                                    className="ri-delete-bin-line float-right text-muted"></i></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {props.conversation.type === 'group' && props.id !== m.userId && (
                                                                        <div className="conversation-name">{m?.user?.userDetail.displayName || m?.user?.name || m?.name}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </React.Fragment>
                                                ))}
                                            </React.Fragment>
                                        )}
                                        {(typings.length > 0) && typings.map((m, index) =>
                                            m.conversationId === props.conversation.id && (
                                                <li key={index}>
                                                    <div className="conversation-list">
                                                        {(m.type === 'group') && (
                                                            <div className="chat-avatar">
                                                                <img src={
                                                                    m.image ? IMAGE_URL+m.image
                                                                    : 'https://cloudcone.com/wp-content/uploads/2019/03/blank-avatar.jpg'
                                                                } alt=""/>
                                                            </div>
                                                        )}
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
                                                            {(m.type === 'group') && (
                                                                <div className="conversation-name">{m.name}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <div id="block"></div>
                                </div>
                                <div className="chat-input-section p-3 p-lg-4">
                                    <div className="row no-gutters">
                                        <div className="col">
                                            <div>
                                                <input onFocus={typing} ref={input} onBlur={clearTyping}
                                                       type="text" value={message} onChange={handleChange} onKeyDown={keyDown}
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
                                                        <button type="submit" onClick={submit}
                                                                className="btn btn-primary font-size-16 btn-lg chat-send waves-effect waves-light">
                                                            <i className="ri-send-plane-2-fill"></i>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ) : (
                            <div style={{margin: '0 auto', paddingTop: '300px'}}>
                                <h4>Bắt đầu cuộc trò chuyện</h4>
                                <button data-toggle="modal"
                                        data-target="#listOnline" className="btn btn-primary">Bạn bè</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="modal fade" id="members" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-center p-4" style={{height: '300px', overflowY: 'auto'}}>
                                {props.friends.filter(f => props.conversation.participants.includes(f.id)).map((f, index) => (
                                    <div className="row mb-3" key={index}>
                                        <div className="col-md-6">
                                            <div className="post">
                                                <div className="media">
                                                    <div className={`chat-user-img align-self-center mr-3`}>
                                                        <img className="rounded-circle avatar-xs" src={
                                                            f.image ? IMAGE_URL+f.image : 'https://cloudcone.com/wp-content/uploads/2019/03/blank-avatar.jpg'
                                                        } alt=""/>
                                                    </div>
                                                    <div className="media-body overflow-hidden">
                                                        <span className="username">{f.displayName || f.name}</span><br/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default RightSide;
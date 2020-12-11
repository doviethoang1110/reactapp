import React, {useEffect} from "react";
import {IMAGE_URL} from "../../constants/config";
import {getTime} from "../../utils/helpers";

const LeftSide = (props) => {

    // useEffect(() => {
    //     console.log($(".conversations"))
    // }, []);

    const handle = (e, id) => {
        e.preventDefault();
        document.querySelectorAll(".conversations").forEach(a => a.classList.remove("active"))
        document.getElementById(`conversation${id}`).classList.add("active");
        props.eventGetConversation(id);
    }

    return (
        <React.Fragment>
            <div className="chat-leftsidebar">
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="pills-chat" role="tabpanel"
                         aria-labelledby="pills-chat-tab">
                        <div>
                            <div className="px-4 pt-4">
                                <h4 className="mb-4">Chats</h4>
                                <div className="search-box chat-search-box">
                                    <div className="input-group mb-3 bg-light  input-group-lg rounded-lg">
                                        <div className="input-group-prepend">
                                            <button className="btn btn-link text-muted pr-1 text-decoration-none"
                                                    type="button">
                                                <i className="ri-search-line search-icon font-size-18"></i>
                                            </button>
                                        </div>
                                        <input type="text" className="form-control bg-light"
                                               placeholder="Search messages or users"/>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 pb-4" dir="ltr">
                                <h4 className="mb-4">Conversations
                                    <button type="button" className="btn btn-warning ml-2" data-toggle="modal"
                                            data-target="#listOnline">
                                        <i className="ri-user-2-fill"></i> List friends
                                    </button>
                                </h4>
                            </div>
                            <div className="px-2">
                                <h5 className="mb-3 px-3 font-size-16">Recent</h5>
                                <div className="chat-message-list" data-simplebar>
                                    <ul className="list-unstyled chat-list chat-user-list">
                                        {(!props.conversations.length) ? (
                                            <h4>Chưa có cuộc trò chuyện nào</h4>
                                        ) : props.conversations.map((c, index) => (
                                            <li key={index} className={`conversations`} id={`conversation${c.id}`}>
                                                <a href=" #" onClick={(e) => handle(e, c.id)}>
                                                    <div className="media">
                                                        <div className="chat-user-img online align-self-center mr-3">
                                                            <img src={
                                                                (c.conversationImage || c.userImage) ?
                                                                IMAGE_URL + (c.conversationImage || c.userImage)
                                                                    : 'https://cloudcone.com/wp-content/uploads/2019/03/blank-avatar.jpg'
                                                            }
                                                                 className="rounded-circle avatar-xs" alt=""/>
                                                            <span className="user-status"></span>
                                                        </div>
                                                        <div className="media-body overflow-hidden">
                                                            <h5 className="text-truncate font-size-15 mb-1">{
                                                                c.conversationName || c.userDisplayName || c.userName
                                                            }</h5>
                                                            <p className="chat-user-message text-truncate mb-0">
                                                                {props.id === c.senderId ? 'Bạn' : c.senderName} : {c.message}
                                                            </p>
                                                        </div>
                                                        <div className="font-size-11">{getTime(c.updatedAt)}</div>
                                                    </div>
                                                </a>
                                            </li>
                                        ))}
                                        {/*<li className="typing">*/}
                                        {/*    <a href="#">*/}
                                        {/*        <div className="media">*/}
                                        {/*            <div className="chat-user-img align-self-center online mr-3">*/}
                                        {/*                <div className="avatar-xs">*/}
                                        {/*                    <span*/}
                                        {/*                        className="avatar-title rounded-circle bg-soft-primary text-primary">*/}
                                        {/*                        A*/}
                                        {/*                    </span>*/}
                                        {/*                </div>*/}
                                        {/*                <span className="user-status"></span>*/}
                                        {/*            </div>*/}
                                        {/*            <div className="media-body overflow-hidden">*/}
                                        {/*                <h5 className="text-truncate font-size-15 mb-1">Albert*/}
                                        {/*                    Rodarte</h5>*/}
                                        {/*                <p className="chat-user-message text-truncate mb-0">typing<span*/}
                                        {/*                    className="animate-typing">*/}
                                        {/*                    <span className="dot"></span>*/}
                                        {/*                    <span className="dot"></span>*/}
                                        {/*                    <span className="dot"></span>*/}
                                        {/*                </span></p>*/}
                                        {/*            </div>*/}
                                        {/*            <div className="font-size-11">04:56 PM</div>*/}
                                        {/*        </div>*/}
                                        {/*    </a>*/}
                                        {/*</li>*/}
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default LeftSide;
import React, {useState} from "react";
import {IMAGE_URL} from "../../constants/config";

const Modal = (props) => {

    const [friendFilter, setFriendFilter] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [conversation, setConversation] = useState({
       name: "",
       creatorId: props.id,
       participants: [],
       type: "group"
    });

    const filter = (e) => {
        const keyword = e.target.value.toLowerCase();
        const ids = participants.map(p => p.id);
        const friends = props.friends.filter(f => (
            (!ids.includes(f.id) && keyword && (f.name.toLowerCase().includes(keyword) || f.displayName.toLowerCase().includes(keyword)))
        )).map(e => ({...e, flag: true}));
        setFriendFilter([...friends]);
    }

    const addGroup = (e, id) => {
        e.preventDefault();
        const participant = friendFilter.find(f => f.id === id);
        participant.flag = false;
        friendFilter.splice(friendFilter.indexOf(participant),1);
        setFriendFilter([...friendFilter]);
        setParticipants([...participants, participant]);
        conversation.participants = [...conversation.participants, participant.id];
        setConversation({...conversation});
    }

    const cancel = (e) => {
        e.preventDefault();
        document.getElementById("error_name").innerText = "";
        document.getElementById("error_participant").innerText = "";
        setParticipants([]);
    }

    const handleChange = (e) => {
        conversation.name = e.target.value;
        setConversation({...conversation});
    }

    const submit = (e) => {
        e.preventDefault();
        if(!conversation.name) {
            document.getElementById("error_name").innerText = "Tên không được rỗng";
            return;
        }
        document.getElementById("error_name").innerText = "";
        if(conversation.participants.length < 2) {
            document.getElementById("error_participant").innerText = "Nhóm tối thiểu 3 người";
            return;
        }
        document.getElementById("error_participant").innerText = "";
        conversation.participants.push(props.id);
        props.eventCreateGroupChat(conversation);
        setParticipants([]);
    }

    const list = (friends) => {
        return !friends.length ? (<h3>Không ai online</h3>) : friends.map((f,index) => (
            <div className="row mb-3" key={index}>
                <div className="col-md-6">
                    <div className="post">
                        <div className="media">
                            <div className={`chat-user-img ${(f?.flag === undefined) && 'online'} align-self-center mr-3`}>
                                <img className="rounded-circle avatar-xs" src={
                                    f.image ? IMAGE_URL+f.image : 'https://cloudcone.com/wp-content/uploads/2019/03/blank-avatar.jpg'
                                } alt=""/>
                                {((f?.flag === undefined) && (<span className="user-status"></span>))}
                            </div>
                            <div className="media-body overflow-hidden">
                                <span className="username">{f.displayName || f.name}</span><br/>
                                <span className="description">{f.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    {(f?.flag !== undefined) ? (
                        f.flag && (
                            <button onClick={(e) => addGroup(e, f.id)} className="btn btn-success mr-2"><i className="fa fa-plus"></i> Thêm vào cuộc trò chuyện</button>
                        )
                    ) : (<button onClick={(e) => props.newChat(e, f.id)} className="btn btn-primary mr-2">
                            <i className="fa fa-comment"></i> Trò chuyện</button>)}
                </div>
            </div>
        ))
    };

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
                                                    <i className="fa fa-door-closed"></i>
                                                </span>
                                            </button>
                                        </li>
                                        <li className="list-inline-item px-2">
                                            <button type="button"
                                                    className="btn btn-success avatar-sm rounded-circle">
                                                <span className="avatar-title bg-transparent font-size-20">
                                                    <i className="fa fa-phone"></i>
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
                                                    <i className="fa fa-door-closed"></i>
                                                </span>
                                            </button>
                                        </li>
                                        <li className="list-inline-item px-2">
                                            <button type="button"
                                                    className="btn btn-success avatar-sm rounded-circle">
                                                <span className="avatar-title bg-transparent font-size-20">
                                                    <i className="fa fa-video"></i>
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
                                {list(props.friends)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="addGroup" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                    <div className="modal-content bg-light">
                        <div className="modal-header">
                            <span className="modal-title font-size-16" id="addgroup-exampleModalLabel"
                                style={{color: 'rebeccapurple',fontSize: '18px', fontWeight: 'bold'}}>
                                Tạo 1 cuộc trò chuyện</span>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body p-4">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="search-box chat-search-box">
                                        <div className="mb-4 bg-light  form-group rounded-lg">
                                            <label htmlFor="search">Tìm kiếm</label>
                                            <input type="text" className="form-control bg-dark" id="search"
                                                   placeholder="Tìm thành viên" onChange={(e) => filter(e)}/>
                                        </div>
                                    </div>
                                    {(friendFilter.length > 0) && list(friendFilter)}
                                </div>
                                <div className="col-md-6">
                                    {(participants.length > 0) && (
                                        <React.Fragment>
                                            <div className="form-group mb-4">
                                                <label htmlFor="addgroupname-input">Group Name</label>
                                                <input type="text" onChange={handleChange}
                                                       className="form-control bg-dark" id="addgroupname-input"
                                                       placeholder="Enter Group Name"/>
                                            </div>
                                            {list(participants)}
                                        </React.Fragment>
                                    )}
                                    <span className="text-danger" id="error_name"></span><br/>
                                    <span className="text-danger" id="error_participant"></span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-link" data-dismiss="modal">Close</button>
                            {(participants.length > 0) && (
                                <React.Fragment>
                                    <button onClick={(e) => cancel(e)} type="button" className="btn btn-danger">Cancel</button>
                                    <button onClick={(e) => submit(e)} type="button" className="btn btn-primary">Create Groups</button>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Modal;
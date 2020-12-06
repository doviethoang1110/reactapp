import React from "react";
import {toast} from "../utils/alert";
import {Link} from "react-router-dom";
import {IMAGE_URL} from "../constants/config";

const Header = (props) => {

    const logout = () => props.logout().then(res => toast('success', res));

    const acceptRequest = (e, id) => {
        e.preventDefault();
        props.eventAcceptRequest(id);
    }

    return (
        <React.Fragment>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <form className="ml-3" style={{width: '500px'}}>
                    <div className="input-group input-group-sm">
                        <input className="form-control form-control-navbar" type="search" placeholder="Search"
                               aria-label="Search"/>
                        <div className="input-group-append">
                            <button className="btn btn-navbar" type="submit">
                                <i className="fas fa-search"/>
                            </button>
                        </div>
                    </div>
                </form>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a href="# " className="nav-link" data-toggle="dropdown" >
                            <i className="far fa-comments"/>
                            <span className="badge badge-danger navbar-badge">3</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <a href="# " className="dropdown-item">
                                <div className="media">
                                    <img src="dist/img/user1-128x128.jpg" alt="User Avatar"
                                         className="img-size-50 mr-3 img-circle"/>
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            Brad Diesel
                                            <span className="float-right text-sm text-danger"><i
                                                className="fas fa-star"/></span>
                                        </h3>
                                        <p className="text-sm">Call me whenever you can...</p>
                                        <p className="text-sm text-muted"><i className="far fa-clock mr-1"/> 4 Hours
                                            Ago</p>
                                    </div>
                                </div>
                                {/* Message End */}
                            </a>
                            <div className="dropdown-divider"/>
                            <a href="# " className="dropdown-item">
                                {/* Message Start */}
                                <div className="media">
                                    <img src="dist/img/user8-128x128.jpg" alt="User Avatar"
                                         className="img-size-50 img-circle mr-3"/>
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            John Pierce
                                            <span className="float-right text-sm text-muted"><i
                                                className="fas fa-star"/></span>
                                        </h3>
                                        <p className="text-sm">I got your message bro</p>
                                        <p className="text-sm text-muted"><i className="far fa-clock mr-1"/> 4 Hours
                                            Ago</p>
                                    </div>
                                </div>
                                {/* Message End */}
                            </a>
                            <div className="dropdown-divider"/>
                            <a href="# " className="dropdown-item">
                                {/* Message Start */}
                                <div className="media">
                                    <img src="dist/img/user3-128x128.jpg" alt="User Avatar"
                                         className="img-size-50 img-circle mr-3"/>
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            Nora Silvester
                                            <span className="float-right text-sm text-warning"><i
                                                className="fas fa-star"/></span>
                                        </h3>
                                        <p className="text-sm">The subject goes here</p>
                                        <p className="text-sm text-muted"><i className="far fa-clock mr-1"/> 4 Hours
                                            Ago</p>
                                    </div>
                                </div>
                                {/* Message End */}
                            </a>
                            <div className="dropdown-divider"/>
                            <a href="# " className="dropdown-item dropdown-footer">See All Messages</a>
                        </div>
                    </li>
                    <li className={`nav-item dropdown`}>
                        <a href=" #" className="nav-link" data-toggle="dropdown">
                            <i className="fa fa-user-plus"/>
                            <span className="badge badge-primary navbar-badge">{props.requestsReceived.length}</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header">{props.requestsReceived.length ? `${props.requestsReceived.length} Friend Request` : 'Không'}</span>
                            <div className="dropdown-divider"/>
                            {(props.requestsReceived.length > 0) && props.requestsReceived.map((f,index) => (
                                <React.Fragment key={index}>
                                    <a href="# " className="dropdown-item">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <img alt=" " style={{width: '30px',borderRadius:'100%'}} src={
                                                    f.image ? IMAGE_URL+f.image : 'https://cloudcone.com/wp-content/uploads/2019/03/blank-avatar.jpg'
                                                }/> {f.displayName ? f.displayName : f.name}
                                            </div>
                                            <div className="col-md-4">
                                                <span className="float-right text-muted text-sm">3 mins</span><br/>
                                                {!f.status ? (
                                                    <button onClick={(e) => acceptRequest(e, f.id)} className="btn btn-sm btn-primary">Xác nhận</button>
                                                ) : (
                                                    <span className="badge badge-light"><i className="fa fa-check"></i> <span style={{fontSize:'16px'}}>Bạn bè</span></span>
                                                )}
                                            </div>
                                        </div>
                                    </a>
                                    <div className="dropdown-divider"/>
                                </React.Fragment>
                            ))}
                            <Link to={"/friends"} className="dropdown-item dropdown-footer">
                                {props.requestsReceived.length ? 'Xem tất cả' : 'Tìm bạn bè' }
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a href="# " className="nav-link" data-toggle="dropdown" >
                            <i className="far fa-bell"/>
                            <span className="badge badge-warning navbar-badge">15</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header">15 Notifications</span>
                            <div className="dropdown-divider"/>
                            <a href="# " className="dropdown-item">
                                <i className="fas fa-envelope mr-2"/> 4 new messages
                                <span className="float-right text-muted text-sm">3 mins</span>
                            </a>
                            <div className="dropdown-divider"/>
                            <a href="# " className="dropdown-item">
                                <i className="fas fa-users mr-2"/> 8 friend requests
                                <span className="float-right text-muted text-sm">12 hours</span>
                            </a>
                            <div className="dropdown-divider"/>
                            <a href="# " className="dropdown-item">
                                <i className="fas fa-file mr-2"/> 3 new reports
                                <span className="float-right text-muted text-sm">2 days</span>
                            </a>
                            <div className="dropdown-divider"/>
                            <a href="# " className="dropdown-item dropdown-footer">See All Notifications</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a href="# " className="nav-link" data-toggle="dropdown" ><span>Hello {props.name}</span></a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <Link to={"/profile"} className="dropdown-item">Profile</Link>
                            <div className="dropdown-divider"></div>
                            <a href="# " onClick={logout} className="dropdown-item">Logout</a>
                            <div className="dropdown-divider"></div>
                        </div>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    );
}
export default Header;
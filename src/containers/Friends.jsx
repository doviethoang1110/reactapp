import React from "react";
import Contact from "../components/friend/contact/Contact";

const Friends = (props) => {
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
                       aria-controls="profile" aria-selected="false">Đang chờ xác nhận</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="request-tab" data-toggle="tab" href="#request" role="tab"
                       aria-controls="profile" aria-selected="false">Yêu cầu kết bạn</a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="contact" role="tabpanel">
                    <Contact/>
                </div>
                <div className="tab-pane fade show" id="list-friend" role="tabpanel">
                    123
                </div>
                <div className="tab-pane fade show" id="wait" role="tabpanel">
                    456
                </div>
                <div className="tab-pane fade show" id="request" role="tabpanel">
                    789
                </div>
            </div>
        </React.Fragment>
    );
}
export default Friends;
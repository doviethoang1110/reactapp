import React from "react";
import {API_URL} from "../../../constants/config";

const ListFriend = (props) => {

    const list = !props.friends.length ? (<h3>Chưa có bạn bè</h3>) : props.friends.map((f,index) => (
        <div className="row" key={index}>
            <div className="col-md-6">
                <div className="post">
                    <div className="user-block">
                        <img className="img-circle img-bordered-sm" src={
                            f.image ? API_URL+f.image : 'https://cloudcone.com/wp-content/uploads/2019/03/blank-avatar.jpg'
                        } alt="user image"/>
                        <span className="username">{f.displayName ? f.displayName : f.name}</span>
                        <span className="description">{f.email}</span>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <button className="btn btn-primary mr-2"><i className="fa fa-comment"></i> Trò chuyện</button>
                <button className="btn btn-danger"><i className="fa fa-trash-alt"></i> Xóa kết bạn</button>
            </div>
        </div>
    ));

    return (
        <React.Fragment>
            <input style={{width: '700px', margin: '0 auto'}} className="mt-2 mb-2 form-control form-control-navbar"
                   type="search" placeholder="Search"/>
            <div className="jumbotron mt-4" style={{margin: '0 auto', width: '700px', height: '300px', overflowY: 'auto'}}>
                {list}
            </div>
        </React.Fragment>
    );
}

export default ListFriend;
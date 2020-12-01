import React from 'react';
import {IMAGE_URL} from "../../../constants/config";

const ContactList = (props) => {
    const list = !props.items.length ? null : props.items.map(item => (
        <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch" key={item.id}>
            <div className="card bg-light">
                <div className="card-header text-muted border-bottom-0"><b>Job:</b> {item.userDetail.job ? item.userDetail.job : 'Không'}</div>
                <div className="card-body pt-0">
                    <div className="row">
                        <div className="col-7">
                            <h2 className="lead"><b>Name: {item.userDetail.displayName ? item.userDetail.displayName : item.name}</b></h2>
                            <p className="text-muted text-sm"><b>Skill:</b> {item.userDetail.skill ? item.userDetail.skill : 'Không'}</p>
                            <ul className="ml-4 mb-0 fa-ul text-muted">
                                <li className="small"><span className="fa-li"><i
                                    className="fas fa-lg fa-building"></i></span> Address: {item.userDetail.location ? item.userDetail.location : 'Không'}
                                </li>
                            </ul>
                        </div>
                        <div className="col-5 text-center">
                            <img src={item.userDetail.image ? IMAGE_URL+item.userDetail.image : 'https://cloudcone.com/wp-content/uploads/2019/03/blank-avatar.jpg'} alt=""
                                 className="img-circle img-fluid"/>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="text-right">
                        <a href="#" className="btn btn-sm bg-teal mr-2">
                            <i className="fas fa-user-plus"></i>
                        </a>
                        <a href="#" className="btn btn-sm btn-primary">
                            <i className="fas fa-eye-dropper"></i> View Profile
                        </a>
                    </div>
                </div>
            </div>
        </div>
    ));
    return (
        <React.Fragment>
            {!props.items || !props.items.length ? <h2>Không tìm thấy người dùng nào</h2> : (
                <React.Fragment>{list}</React.Fragment>
            )}
        </React.Fragment>
    );
}
export default ContactList;
import React, {useEffect, useState} from 'react';
import {calCurrentItems, getDatas, modify} from "../utils/helpers"
import Pagination from "../components/Pagination";
import UserList from "../components/user/UserList";
import UserForm from "../components/user/UserForm";
import {actionToggleGrant} from "../actions/grant";
import { connect } from "react-redux";

const permissions = ['ADMIN_MANAGER','READ_USER'];

const Users = (props) => {
    // state hook
    const [users, setUsers] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [id, setId] = useState(undefined);

    const fetchDatas = () => {
        if(props.roles.some(r => permissions.includes(r))) {
            props.toggle(true)
            getDatas('users', setUsers);
        }else props.toggle(false)
    }


    useEffect((props) => {
        fetchDatas()
    },[]);

    // method
    const back = () => setId(undefined);

    const edit = (id) => {
        modify(`users/${id}`)
            .then(res => {
                setId(id);
                setSelectedRoles(res);
            }).catch(error => console.log(error));
    }

    const update = (id, data) => {
        users[users.indexOf(users.find(u => u.id === id))].roles = data.map(d => ({displayName:d.displayName}));
        setSelectedRoles(data);
        setUsers([...users]);
    }

    const paginate = (e,page) => {
        e.preventDefault();
        setCurrentPage(page);
    }

    const refresh = () => fetchDatas()

    return (
        <React.Fragment>
            {!props.grant ? (
                <div className='jumbotron'><h2>Bạn không có quyền</h2></div>
            ) : (
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-header">
                            <button onClick={refresh} className="ml-2 btn btn-outline-primary card-title">
                                <i className="fas fa-sync"></i> Refresh
                            </button>
                            {(id) && (
                                <button onClick={back} className="ml-2 btn btn-outline-dark card-title">
                                    <i className="fa fa-backward"></i> Back
                                </button>
                            )}
                            <div className="card-tools">
                                <div className="input-group input-group-sm" style={{ width: "150px" }}>
                                    <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-default">
                                            <i className="fas fa-search" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /.card */}
                    </div>
                    <div className={`card-body ${id ? '' : 'table-responsive p-0'} col-md-12`}>
                        {
                            (id &&
                                (
                                    <UserForm id={id} item={selectedRoles} eventEdit={update}/>
                                )
                            )
                            ||
                            (
                                <React.Fragment>
                                    <UserList items={calCurrentItems(currentPage, users)} eventEdit={edit}/>
                                    <Pagination
                                        itemsPerPage={4}
                                        totalItems={users}
                                        currentPage={currentPage}
                                        changePage={paginate}
                                    />
                                </React.Fragment>
                            )
                        }
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        roles: state.auth.user.roles,
        grant: state.grant
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggle:(grant) => {
            dispatch(actionToggleGrant(grant))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);


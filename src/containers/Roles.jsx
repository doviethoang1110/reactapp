import React, {useEffect, useState} from 'react';
import {calCurrentItems, getDatas, modify, toastRoles} from "../utils/helpers";
import callApi from "../utils/api";
import {toast} from "../utils/alert";
import Pagination from "../components/Pagination";
import PermissionRestore from "../components/permission/PermissionRestore";
import RoleForm from "../components/role/RoleForm";
import Role from "../models/Role";
import RoleList from "../components/role/RoleList";
import {actionToggleGrant} from "../actions/grant";
import { connect } from "react-redux";

const permissions = ['ADMIN_MANAGER','TEST']

const Roles = (props) => {
    // state hook
    const [roles, setRoles] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [role, setRole] = useState(new Role('','',[]));
    const [isRestore, setIsRestore] = useState(false);
    const [isForm, setIsForm] = useState(false);
    const [roleRestore, setRoleRestore] = useState([]);

    const fetchDatas = () => {
        if(props.roles.some(r => permissions.includes(r))) {
            props.toggle(true)
            getDatas('roles', setRoles);
        }else props.toggle(false)
    }

    useEffect((props) => {
        fetchDatas()
    },[]);

    // method
    const back = () => {
        if(role.id) setRole(role)
        if(isForm) setIsForm(false);
        if(isRestore) setIsRestore(false);
    }

    const getRestore = () => {
        callApi('roles/restore')
            .then(res => {
                setIsRestore(true);
                setRoleRestore(res.data);
            }).catch(error => {
            toastRoles(error)
        })
    }

    const add = () => {
        setRole(new Role('','',[]));
        setIsForm(true);
    }

    const create = (data) => {
        const results = [...roles];
        results.push(data)
        setRoles(results);
    }

    const edit = (id) => {
        modify(`roles/${id}`)
            .then(res => {
                setIsForm(true);
                setRole(res);
            }).catch(error => console.log(error));
    }

    const update = (id, data) => {
        roles[roles.indexOf(roles.find(p => p.id === id))] = data;
        setRole(data);
        setRoles([...roles]);
    }

    const restore = (id) => {
        callApi(`roles/restore/${id}`, 'PATCH')
            .then(response => {
                roleRestore.splice(roleRestore.indexOf(roleRestore.find(b => b.id === id)),1);
                roles.push(response.data);
                setRoles([...roles]);
                setRoleRestore([...roleRestore]);
                toast('success','Restore successfully');
            })
            .catch(error => {
                console.log(error)
                toast('error',error.response.data)
                toastRoles(error)
            });
    }

    const remove = (id) => {
        if(window.confirm('Bạn có chắc không')) {
            callApi(`roles/${id}`,'PATCH')
                .then(() => {
                    roles.splice(roles.indexOf(roles.find(b => b.id === id)),1)
                    setRoles([...roles]);
                    toast('success','Delete successfully');
                })
                .catch(error => {
                    console.log(error);
                    toast('error','Delete failure');
                    toastRoles(error)
                })
        }
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
                            <button onClick={add} className="btn btn-success card-title">
                                <i className="fa fa-plus"></i> Add new
                            </button>
                            <button onClick={refresh} className="ml-2 btn btn-outline-primary card-title">
                                <i className="fas fa-sync"></i> Refresh
                            </button>
                            <button onClick={getRestore} className="ml-2 btn btn-outline-warning card-title">
                                <i className="fa fa-trash-restore"></i> Restore
                            </button>
                            {(isRestore || isForm) && (
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
                    <div className={`card-body ${isForm ? '' : 'table-responsive p-0'} col-md-12`}>
                        {
                            (isForm &&
                                (
                                    <RoleForm eventAdd={create} item={role} eventEdit={update}/>
                                )
                            )
                            ||
                            (isRestore &&
                                (
                                    <PermissionRestore items={roleRestore} eventRestore={restore}/>
                                )
                            )
                            ||
                            (
                                <React.Fragment>
                                    <RoleList items={calCurrentItems(currentPage, roles)} eventEdit={edit} eventRemove={remove}/>
                                    <Pagination
                                        itemsPerPage={4}
                                        totalItems={roles}
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

export default connect(mapStateToProps, mapDispatchToProps)(Roles);


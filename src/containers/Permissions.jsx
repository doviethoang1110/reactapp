import React, {useEffect, useState} from 'react';
import {calCurrentItems, getDatas, modify} from "../utils/helpers";
import callApi from "../utils/api";
import {toast} from "../utils/alert";
import PermissionForm from "../components/permission/PermissionForm";
import PermissionList from "../components/permission/PermissionList";
import Pagination from "../components/Pagination";
import PermissionRestore from "../components/permission/PermissionRestore";

const Permissions = (props) => {
    // state hook
    const [permissions, setPermissions] = useState([]);
    const [isForm, setIsForm] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [permission, setPermission] = useState({name: '',displayName: ''});
    const [isRestore, setIsRestore] = useState(false);
    const [permissionRestore, setPermissionRestore] = useState([]);

    useEffect((props) => {
        getDatas('permissions', setPermissions);
    },[]);

    // method
    const back =() => setIsRestore(false);

    const getRestore = () => {
        getDatas('permissions/restore',setPermissionRestore);
        setIsRestore(true);
    }

    const add = () => {
        setPermission({name: '',displayName: ''})
        setIsForm(true);
    }

    const create = (data) => {
        permissions.push(...data)
        setPermissions([...permissions]);
    }

    const edit = (id) => {
        modify(`permissions/${id}`)
            .then(response => {
                setIsForm(true);
                setPermission(response);
            }).catch(error => console.log(error))
    }

    const update = (id, data) => {
        permissions[permissions.indexOf(permissions.find(p => p.id === id))] = data;
        setPermissions([...permissions]);
    }

    const restore = (id) => {
        callApi(`permissions/restore/${id}`, 'PATCH')
            .then(response => {
                permissionRestore.splice(permissionRestore.indexOf(permissionRestore.find(b => b.id === id)),1);
                permissions.push(response.data);
                setPermissions([...permissions]);
                setPermissionRestore([...permissionRestore]);
                toast('success','Restore successfully');
            })
            .catch(error => {
                console.log(error)
                toast('error',error.response.data)
            });
    }

    const remove = (id) => {
        if(window.confirm('Bạn có chắc không')) {
            callApi(`permissions/${id}`,'PATCH')
                .then(() => {
                    permissions.splice(permissions.indexOf(permissions.find(b => b.id === id)),1)
                    setPermissions([...permissions]);
                    toast('success','Delete successfully');
                })
                .catch(error => {
                    console.log(error);
                    toast('error','Delete failure');
                })
        }
    }

    const paginate = (e,page) => {
        e.preventDefault();
        setCurrentPage(page);
    }

    const closeForm = () => setIsForm(false)

    const refresh = () => getDatas('permissions', setPermissions)

    return (
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
                    {(isRestore) && (
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
            <div className={`card-body table-responsive p-0 ${isForm ? 'col-md-7' : 'col-md-12'}`}>
                {isRestore ? (
                    <PermissionRestore items={permissionRestore} eventRestore={restore}/>
                ) : (
                    <React.Fragment>
                        <PermissionList items={calCurrentItems(currentPage, permissions)} eventEdit={edit} eventRemove={remove}/>
                        <Pagination
                            itemsPerPage={4}
                            totalItems={permissions}
                            currentPage={currentPage}
                            changePage={paginate}
                        />
                    </React.Fragment>
                )}
            </div>
            {isForm && (
                <div className='col-md-5 card-body'>
                    <PermissionForm item={permission} closeForm={closeForm} eventAdd={create} eventEdit={update}/>
                </div>
            )}
        </div>
    );
}
export default Permissions;

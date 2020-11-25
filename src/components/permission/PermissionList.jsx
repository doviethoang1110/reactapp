import React from 'react';
import moment from 'moment';
import {formatDate} from "../../utils/helpers";

const PermissionList = (props) => {

    const edit = (e,id) => {
        e.preventDefault();
        props.eventEdit(id);
    }
    const remove = (e,id) => {
        e.preventDefault();
        props.eventRemove(id);
    }

    let list = !props.items.length ? null : props.items.map(item => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.displayName}</td>
            <td>{formatDate(item.createdAt)}</td>
            <td>
                <button onClick={(e) => edit(e,item.id)} type="button" className="mr-2 btn btn-outline-warning"><i className="fa fa-pen"></i></button>
                <button onClick={(e) => remove(e,item.id)} type="button" className="btn btn-outline-danger"><i className="fa fa-trash"></i></button>
            </td>
        </tr>
    ));
    return (
        <React.Fragment>
            {!props.items || !props.items.length ? <h2>Chưa có dữ liệu</h2> : (
                <table className="table table-hover text-nowrap">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Display name</th>
                        <th>CreatedAt</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list}
                    </tbody>
                </table>
            )}
        </React.Fragment>
    );
}
export default PermissionList;
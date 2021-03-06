import React from 'react';
import { IMAGE_URL } from "../../constants/config";

const BrandList = (props) => {
    const edit = (e,id) => {
        e.preventDefault();
        props.eventEdit(id);
    }
    const remove = (e,id) => {
        e.preventDefault();
        props.eventRemove(id);
    }

    if (!props.items || !props.items.length) {
        return null;
    } else {
        let list = props.items.map(item => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td><img alt='' src={IMAGE_URL+item.image} width={'100px'}/></td>
                <td><span className={item.status ? 'badge badge-success' : 'badge badge-danger'}>{item.status ? 'Active' : 'Disable'}</span></td>
                <td>
                    <button onClick={(e) => edit(e,item.id)} style={{ marginRight: '5px' }} type="button" className="btn btn-outline-warning"><i className="fa fa-pen"></i></button>
                    <button onClick={(e) => remove(e,item.id)} type="button" className="btn btn-outline-danger"><i className="fa fa-trash"></i></button>
                </td>
            </tr>
        ));
        return (
            <React.Fragment>
                <table className="table table-hover text-nowrap">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}
export default BrandList;
import React from 'react';
import { IMAGE_URL } from "../../constants/config";

const BrandRestore = (props) => {
    const restore = (e,id) => {
        e.preventDefault();
        if(window.confirm('Bạn có chắc không')) props.eventRestore(id);
        else return;
    }
    const hardRemove = (e,id) => {
        e.preventDefault();
        props.eventHardRemove(id);
    }
    let list = props.items.map(item => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td><img alt='' src={IMAGE_URL+item.image} width={'100px'}/></td>
            <td>
                <button onClick={(e) => restore(e,item.id)} type="button" className="mr-2 btn btn-outline-primary"><i className="fa fa-trash-restore"></i></button>
                <button onClick={(e) => hardRemove(e,item.id)} type="button" className="btn btn-outline-danger"><i className="fa fa-trash-alt"></i></button>
            </td>
        </tr>
    ));
    return (
        <React.Fragment>
            {(!props.items || ! props.items.length) ? (<h2>Thùng rác trống</h2>) : (
                <table className="table table-hover text-nowrap">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Image</th>
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
export default BrandRestore;
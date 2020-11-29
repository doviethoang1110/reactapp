import React from 'react';
import { IMAGE_URL } from "../../constants/config";

const ProductRestore = (props) => {

    const restore = (e,id) => {
        e.preventDefault();
        props.eventRestore(id);
    }

    const list = !props.items.length ? null : props.items.map(item => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.brand.name}</td>
            <td><img alt='' src={IMAGE_URL+item.image} width={'100px'}/></td>
            <td>
                <button onClick={(e) => restore(e,item.id)} type="button" className="mr-2 btn btn-outline-primary"><i className="fa fa-trash-restore"></i></button>
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
                        <th>Brand</th>
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
export default ProductRestore;
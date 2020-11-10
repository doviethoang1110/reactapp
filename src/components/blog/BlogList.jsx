import React from 'react';
import { IMAGE_URL } from "../../constants/config";

const BlogList = (props) => {
    let list = !props.items.length ? null : props.items.map(item => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td><img alt='' src={IMAGE_URL+item.image} width={'100px'}/></td>
            <td><span className={item.status ? 'badge badge-success' : 'badge badge-danger'}>{item.status ? 'Active' : 'Disable'}</span></td>
            <td>
                <button type="button" className="mr-2 btn btn-outline-warning"><i className="fa fa-pen"></i></button>
                <button type="button" className="btn btn-outline-danger"><i className="fa fa-trash"></i></button>
            </td>
        </tr>
    ));
    return (
        <React.Fragment>
            {!props.items || !props.items.length ? <h2>Chưa có bài viết nào</h2> : (
                <table className="table table-hover text-nowrap">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Status</th>
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
export default BlogList;
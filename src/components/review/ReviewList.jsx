import React from 'react';
import Toggle from 'react-toggle'
import "react-toggle/style.css";
import "./review.css";

const ReviewList = (props) => {

    const remove = (e,id) => {
        e.preventDefault();
        props.eventRemove(id);
    }

    const handleToggle = (e,id) => {
        // e.preventDefault();
        props.eventEdit(id,e.target.checked)
    }


    const list = !props.items.length ? null : props.items.map(item => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}/{item.email}</td>
            <td>{[1,2,3,4,5,].map((e,index) => <span key={index} className={`fa fa-star ${item.rating >= e ? 'checked' : ''}`}></span>)}</td>
            <td>{item.content}</td>
            <td>
                <label className='ml-3'>
                    <Toggle
                        defaultChecked={item.status}
                        icons={false}
                        onChange={(e) => handleToggle(e,item.id)} />
                </label>
            </td>
            <td>
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
                        <th>Name/Email</th>
                        <th>Rating</th>
                        <th>Content</th>
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
export default ReviewList;
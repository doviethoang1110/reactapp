import React from 'react';
import moment from "moment";

const CouponList = (props) => {


    const edit = (e,id) => {
        e.preventDefault();
        props.eventEdit(id);
    }
    const remove = (e,id) => {
        e.preventDefault();
        props.eventRemove(id);
    }

    const func = (id) => {
        console.log(id)
    }

    let list = !props.items.length ? null : props.items.map(item => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.code}</td>
            <td>Start date: <span>{moment(item.startDate).format('YYYY-MM-DD:mm')}</span><br/>
                End date: <span>{moment(item.endDate).format('YYYY-MM-DD:mm')}</span>
            </td>
            <td>{
                    (+item.type === 1 && (<span className='btn btn-outline-warning'>Free shipping</span>))
                ||
                    (+item.type === 2 && (<span className='btn btn-outline-success'>Flash sales {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(item.detail)}</span>))
                ||
                    (+item.type === 3 && (<span className='btn btn-outline-primary'>Discount {item.detail} %</span>))
            }</td>
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
                        <th>Code</th>
                        <th>Time</th>
                        <th>Detail</th>
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
export default CouponList;
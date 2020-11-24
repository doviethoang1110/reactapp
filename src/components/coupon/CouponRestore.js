import React from 'react';

const CouponRestore = (props) => {

    const restore = (e,id) => {
        e.preventDefault();
        if(window.confirm('Bạn có chắc không')) props.eventRestore(id);
        else return;
    }

    let list = !props.items.length ? null : props.items.map(item => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.code}</td>
            <td>{
                (+item.type === 1 && (<span className='btn btn-outline-warning'>Free shipping</span>))
                ||
                (+item.type === 2 && (<span className='btn btn-outline-success'>Flash sales {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(item.detail)}</span>))
                ||
                (+item.type === 3 && (<span className='btn btn-outline-primary'>Discount {item.detail} %</span>))
            }</td>
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
                        <th>Code</th>
                        <th>Type</th>
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
export default CouponRestore;
import React from 'react';
import moment from "moment";
import { formatMoney } from "../../utils/helpers";

const OrderList = (props) => {
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
        let status = (status) => {
            switch(status) {
                case 'New':
                    return (<span className="badge badge-primary">{status}</span>);
                case 'Done':
                    return (<span className="badge badge-success">{status}</span>);
                case 'Canceled':
                    return (<span className="badge badge-danger">{status}</span>);
                case 'Processing':
                    return (<span className="badge badge-info">{status}</span>);
                default:
                    return null;
            }
        }

        let list = props.items.map(item => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{formatMoney(item.total, item.currency)}</td>
                <td>{item.currency}</td>
                <td>{item.paymentMethod}</td>
                <td>{status(item.orderStatus.name)}</td>
                <td>{moment(item.createdAt).format('DD-MMMM-YYYY')}</td>
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
                        <th>Email</th>
                        <th>Total</th>
                        <th>Currency</th>
                        <th>Payment method</th>
                        <th>Status</th>
                        <th>Ngày đặt</th>
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
export default OrderList;
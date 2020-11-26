import React, {useEffect, useState} from 'react';
import {formatMoney} from "../../utils/helpers";
import callApi from "../../utils/api";

const OrderDetail = (props) => {

    const [orderStatus, setOrderStatus] = useState([]);

    const updateStatus = (e, id) => {
        props.eventEdit(id, +e.target.value);
    }

    useEffect(() => {
        callApi('orders/select')
            .then(res => {
                setOrderStatus(res.data);
            }).catch(error => {
                console.log(error)
            })
    },[])

    const orderDetails = props.item.orderDetails.length > 0 && props.item.orderDetails.map((i,index) => (
        <tr key={index}>
            <td>{i.product.name}</td>
            <td>{i.sku}</td>
            <td>{formatMoney(i.price, props.item.currency)}</td>
            <td>{i.quantity}</td>
            <td>{formatMoney((i.price * i.quantity), props.item.currency)}</td>
        </tr>
    ));

    return (
        <React.Fragment>
            <section className="content">
                <div className="container-fluid">
                    <h2>Order #{props.item.id}</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <table className="table table-bordered">
                                <tbody>
                                <tr>
                                    <th>Tên người mua</th>
                                    <td>{props.item.customer.name}</td>
                                </tr>
                                <tr>
                                    <th>Email người mua</th>
                                    <td>{props.item.customer.email}</td>
                                </tr>
                                <tr>
                                    <th>Số điện thoại người mua</th>
                                    <td>{props.item.customer.phone}</td>
                                </tr>
                                <tr>
                                    <th>Địa chỉ người mua</th>
                                    <td>{props.item.customer.address}</td>
                                </tr>
                                <tr>
                                    <th>Tên người nhận</th>
                                    <td>{props.item.name}</td>
                                </tr>
                                <tr>
                                    <th>Email người nhận</th>
                                    <td>{props.item.email}</td>
                                </tr>
                                <tr>
                                    <th>Số điện thoại người nhận</th>
                                    <td>{props.item.phone}</td>
                                </tr>
                                <tr>
                                    <th>Địa chỉ người nhận</th>
                                    <td>{props.item.address}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-6">
                            <table className="table table-bordered">
                                <tbody>
                                <tr>
                                    <th>Order status</th>
                                    <td>
                                        <select className="form-control" value={props.item.orderStatus.id}
                                                onChange={(e) => updateStatus(e,props.item.id)}>
                                            {orderStatus.length && orderStatus.map((o,index) => (
                                                <option key={index} value={o.id}>{o.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Shipping status</th>
                                    <td><span>{props.item.shippingStatus.name}</span></td>
                                </tr>
                                <tr>
                                    <th>Payment status</th>
                                    <td><span>{props.item.paymentStatus.name}</span></td>
                                </tr>
                                <tr>
                                    <th>Payment method</th>
                                    <td>{props.item.paymentMethod}</td>
                                </tr>
                                <tr>
                                    <th>Shipping method</th>
                                    <td>{props.item.shippingMethod}</td>
                                </tr>
                                </tbody>
                            </table>
                            <table className="table-bordered table">
                                <tbody>
                                <tr>
                                    <th>Currency</th>
                                    <td>{props.item.currency}</td>
                                </tr>
                                <tr>
                                    <th>Exchange rate</th>
                                    <td>{props.item.rate}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Sku</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                                {orderDetails}
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <table className="table table-bordered">
                                <tbody>
                                <tr>
                                    <td>Subtotal </td>
                                    <td>{formatMoney(props.item.subTotal, "USD")}</td>
                                </tr>
                                <tr>
                                    <td>Shipping</td>
                                    <td>{formatMoney(props.item.shipping, "USD")}</td>
                                </tr>
                                <tr>
                                    <td>Coupon</td>
                                    <td>{props.item.coupon}</td>
                                </tr>
                                <tr style={{backgroundColor: 'darkgrey'}}>
                                    <td>Total</td>
                                    <td>{formatMoney(props.item.total, "USD")}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-6">
                            <table className="table-bordered table">
                                <tbody>
                                <tr>
                                    <th>Note</th>
                                    <td>{props.item.note ? props.item.note : 'Không' }</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default OrderDetail;
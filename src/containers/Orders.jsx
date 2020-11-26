import React, {useEffect, useState} from 'react';
import {calCurrentItems, getDatas, modify} from "../utils/helpers"
import Pagination from "../components/Pagination";
import {actionToggleGrant} from "../actions/grant";
import { connect } from "react-redux";
import OrderList from "../components/order/OrderList";
import OrderDetail from "../components/order/OrderDetail";
import callApi from "../utils/api";
import {toast} from "../utils/alert";

const permissions = ['ADMIN_MANAGER','READ_ORDER'];

const Orders = (props) => {
    // state hook
    const [orders, setOrders] = useState([]);
    const [id, setId] = useState(undefined);
    const [order, setOrder] = useState({
        id: null,
        name: null,
        address: null,
        phone: null,
        email: null,
        customer: {
            name: null,
            phone: null,
            address: null,
            email: null
        },
        orderDetails: [],
        orderStatus: {id: 1, name: ""},
        shippingStatus: {name:null},
        paymentStatus: {name: null},
        coupon: "",
        shipping: null,
        total: null,
        subTotal: null,
        currency: "",
        note: "",
        rate: null,
        paymentMethod: "",
        shippingMethod: ""
    });
    const [currentPage,setCurrentPage] = useState(1);

    const fetchDatas = () => {
        if(props.roles.some(r => permissions.includes(r))) {
            props.toggle(true)
            getDatas('orders', setOrders);
        }else props.toggle(false)
    }

    useEffect((props) => {
        fetchDatas();
    },[]);

    // method
    const back = () => setId(undefined);

    const edit = (id) => {
        modify(`orders/${id}`)
            .then(res => {
                setId(id);
                setOrder({...res});
            }).catch(error => console.log(error));
    }

    const updateStatus = (id, value) => {
        callApi(`orders/${id}`, 'PATCH', {orderStatusId: value})
            .then(res => {
                orders[orders.indexOf(orders.find(o => o.id ===id))].orderStatus.name = res.data.orderStatus.name;
                order.orderStatus.id = res.data.orderStatus.id;
                order.paymentStatus.name = res.data.paymentStatus.name;
                order.shippingStatus.name = res.data.shippingStatus.name;
                setOrders([...orders]);
                setOrder({...order});
                toast('success', 'Cập nhật thành công');
            }).catch(error => {
                toast('error', error.response.data);
            })
    }

    const update = (id, data) => {
        orders[orders.indexOf(orders.find(u => u.id === id))] = data;
        setOrder(data);
        setOrders([...orders]);
    }

    const paginate = (e,page) => {
        e.preventDefault();
        setCurrentPage(page);
    }

    const refresh = () => fetchDatas();

    return (
        <React.Fragment>
            {!props.grant ? (
                <div className='jumbotron'><h2>Bạn không có quyền</h2></div>
            ) : (
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-header">
                            <button onClick={refresh} className="ml-2 btn btn-outline-primary card-title">
                                <i className="fas fa-sync"></i> Refresh
                            </button>
                            {(id) && (
                                <button onClick={back} className="ml-2 btn btn-outline-dark card-title">
                                    <i className="fa fa-backward"></i> Back
                                </button>
                            )}
                            <div className="card-tools">
                                <div className="input-group input-group-sm" style={{ width: "150px" }}>
                                    <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-default">
                                            <i className="fas fa-search" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /.card */}
                    </div>
                    <div className={`card-body ${id ? '' : 'table-responsive p-0'} col-md-12`}>
                        {
                            (id &&
                                (
                                    <OrderDetail item={order} eventEdit={updateStatus}/>
                                )
                            )
                            ||
                            (
                                <React.Fragment>
                                    <OrderList items={calCurrentItems(currentPage, orders)} eventEdit={edit}/>
                                    <Pagination
                                        itemsPerPage={4}
                                        totalItems={orders}
                                        currentPage={currentPage}
                                        changePage={paginate}
                                    />
                                </React.Fragment>
                            )
                        }
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        roles: state.auth.user.roles,
        grant: state.grant
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggle:(grant) => {
            dispatch(actionToggleGrant(grant))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);


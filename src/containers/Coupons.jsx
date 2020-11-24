import React, {useEffect, useState} from 'react';
import {calCurrentItems, getDatas, modify, toastRoles} from "../utils/helpers";
import callApi from "../utils/api";
import {toast} from "../utils/alert";
import Pagination from "../components/Pagination";
import {actionToggleGrant} from "../actions/grant";
import { connect } from "react-redux";
import Coupon from "../models/Coupon";
import CouponList from "../components/coupon/CouponList";
import CouponForm from "../components/coupon/CouponForm";
import CouponRestore from "../components/coupon/CouponRestore";
import moment from "moment";
import DeliverCoupon from "../components/coupon/DeliverCoupon";

const permissions = ['ADMIN_MANAGER','READ_COUPON'];

const Coupons = (props) => {
    // state hook
    const [coupons, setCoupons] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [coupon, setCoupon] = useState(new Coupon('','',null,null,1,0));
    const [isRestore, setIsRestore] = useState(false);
    const [isForm, setIsForm] = useState(false);
    const [isDeliver, setIsDeliver] = useState(false);
    const [couponRestore, setCouponRestore] = useState([]);
    const [customers, setCustomers] = useState([]);

    const fetchDatas = () => {
        if(props.roles.some(r => permissions.includes(r))) {
            props.toggle(true)
            getDatas('coupons', setCoupons);
        }else props.toggle(false)
    }

    useEffect((props) => {
        fetchDatas()
    },[]);

    // method
    const back = () => {
        if(coupon.id) setCoupon(coupon)
        if(isForm) setIsForm(false);
        if(isRestore) setIsRestore(false);
        if(isDeliver) setIsDeliver(false);
    }

    const getRestore = () => {
        callApi('coupons/restore')
            .then(res => {
                setIsRestore(true);
                setCouponRestore(res.data);
            }).catch(error => {
                toastRoles(error)
            })
    }

    const deliver = () => {
        callApi('coupons/customers')
            .then(res => {
                setIsDeliver(true);
                setCustomers(res.data);
            }).catch(error => {
                console.log(error);
                toastRoles(error)
            })
    }

    const add = () => {
        setCoupon(new Coupon('','',null,null,1,0));
        setIsForm(true);
    }

    const create = (data) => {
        console.log(data);
        const results = [...coupons];
        results.push(data)
        setCoupons(results);
    }

    const edit = (id) => {
        modify(`coupons/${id}`)
            .then(res => {
                res.startDate = moment(new Date(res.startDate)).format('YYYY-MM-DDTHH:mm');
                res.endDate = moment(new Date(res.endDate)).format('YYYY-MM-DDTHH:mm');
                setIsForm(true);
                setCoupon(res);
            }).catch(error => console.log(error));
    }

    const update = (id, data) => {
        coupons[coupons.indexOf(coupons.find(p => p.id === id))] = data;
        setCoupon(data);
        setCoupons([...coupons]);
    }

    const restore = (id) => {
        callApi(`coupons/restore/${id}`, 'PATCH')
            .then(response => {
                couponRestore.splice(couponRestore.indexOf(couponRestore.find(b => b.id === id)),1);
                coupons.push(response.data);
                setCoupons([...coupons]);
                setCouponRestore([...couponRestore]);
                toast('success','Restore successfully');
            })
            .catch(error => {
                console.log(error)
                toast('error',error.response.data)
                toastRoles(error)
            });
    }

    const remove = (id) => {
        if(window.confirm('Bạn có chắc không')) {
            callApi(`coupons/${id}`,'PATCH')
                .then(() => {
                    coupons.splice(coupons.indexOf(coupons.find(b => b.id === id)),1)
                    setCoupons([...coupons]);
                    toast('success','Delete successfully');
                })
                .catch(error => {
                    console.log(error);
                    toast('error','Delete failure');
                    toastRoles(error)
                })
        }
    }

    const paginate = (e,page) => {
        e.preventDefault();
        setCurrentPage(page);
    }

    const refresh = () => fetchDatas()

    return (
        <React.Fragment>
            {!props.grant ? (
                <div className='jumbotron'><h2>Bạn không có quyền</h2></div>
            ) : (
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-header">
                            <button onClick={add} className="btn btn-success card-title">
                                <i className="fa fa-plus"></i> Add new
                            </button>
                            <button onClick={refresh} className="ml-2 btn btn-outline-primary card-title">
                                <i className="fas fa-sync"></i> Refresh
                            </button>
                            <button onClick={getRestore} className="ml-2 btn btn-outline-warning card-title">
                                <i className="fa fa-trash-restore"></i> Restore
                            </button>
                            <button onClick={deliver} className="ml-2 btn btn-outline-info card-title">
                                <i className="fa fa-trash-restore"></i> Deliver coupon
                            </button>
                            {(isRestore || isForm || isDeliver) && (
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
                    <div className={`card-body ${isForm ? '' : 'table-responsive p-0'} col-md-12`}>
                        {
                            (isForm &&
                                (
                                    <CouponForm eventAdd={create} item={coupon} eventEdit={update}/>
                                )
                            )
                            ||
                            (isRestore &&
                                (
                                    <CouponRestore items={couponRestore} eventRestore={restore}/>
                                )
                            )
                            ||
                            (isDeliver &&
                                (
                                    <DeliverCoupon items={customers} coupons={coupons}/>
                                )
                            )
                            ||
                            (
                                <React.Fragment>
                                    <CouponList items={calCurrentItems(currentPage, coupons)} eventEdit={edit} eventRemove={remove}/>
                                    <Pagination
                                        itemsPerPage={4}
                                        totalItems={coupons}
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

export default connect(mapStateToProps, mapDispatchToProps)(Coupons);


import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import ReviewList from "../components/review/ReviewList";
import Pagination from "../components/Pagination";
import {calCurrentItems, getDatas, toastRoles} from "../utils/helpers";
import callApi from "../utils/api";
import {toast} from "../utils/alert";
import {actionToggleGrant} from "../actions/grant";

const permissions = ['ADMIN_MANAGER','READ_REVIEW'];

const Reviews = (props) => {
    // state hook
    const [reviews, setReviews] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);

    // method

    const refresh = () => fetchDatas();

    const paginate = (e,page) => {
        e.preventDefault();
        setCurrentPage(page);
    }

    const edit = (id, value) => {
        callApi(`reviews/${id}`, 'PATCH', {status: value})
            .then(res => {
                toast('success','Update successfully');
                const array = [...reviews];
                array[array.indexOf(array.find(r => r.id === id))] = res.data.body;
                setReviews(array);
            }).catch(error => {
                toast('error', 'Update failure');
                toastRoles(error)
                console.log(error);
        });
    }

    const remove = (id) => {
        if(window.confirm('Bạn có chắc không ?'))
            callApi(`reviews/${id}`,'DELETE')
                .then(() => {
                    toast('success','Delete successfully');
                    reviews.splice(reviews.indexOf(reviews.find(a => a.id === id)),1);
                    setReviews([...reviews]);
                })
                .catch((error) => {
                    toast('error','Delete failure');
                    toastRoles(error);
                })
    }

    const fetchDatas = () => {
        if(props.roles.some(r => permissions.includes(r))) {
            props.toggle(true)
            getDatas('reviews', setReviews);
        }else props.toggle(false)
    }

    useEffect((props) => {
        fetchDatas();
    },[]);

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
                    <div className={`card-body table-responsive p-0 col-md-12`}>
                        <React.Fragment>
                            <ReviewList items={calCurrentItems(currentPage, reviews)} eventEdit={edit} eventRemove={remove}/>
                            <Pagination
                                itemsPerPage={4}
                                totalItems={reviews}
                                currentPage={currentPage}
                                changePage={paginate}
                            />
                        </React.Fragment>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

// redux map
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

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);

import React, {useEffect, useState} from 'react';
import callApi from "../utils/api";
import Pagination from "../components/Pagination";
import {toast} from "../utils/alert";
import {calCurrentItems, getDatas, modify, toastRoles} from "../utils/helpers";
import { connect } from "react-redux";
import {actionToggleGrant} from "../actions/grant";
import Banner from "../models/Banner";
import BannerList from "../components/banner/BannerList";
import BannerForm from "../components/banner/BannerForm";
import BannerRestore from "../components/banner/BannerRestore";

const permissions = ['ADMIN_MANAGER','READ_BANNER'];

const Banners = (props) => {
    // state hook
    const [banners,setBanners] = useState([]);
    const [banner, setBanner] = useState(new Banner('','',false,null,'',1));
    const [bannerRestore, setBannerRestore] = useState([]);
    const [isForm, setIsForm] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [isRestore, setIsRestore] = useState(false);

    // method
    const add = () => {
        setBanner(new Banner('','',false,null,'',1));
        setIsForm(true);
    }

    const refresh = () => fetchDatas();

    const getRestore = () => {
        callApi('banners/restore')
            .then(res => {
                setIsRestore(true);
                setBannerRestore(res.data);
            })
            .catch(error => {
                toast('error', error);
                toastRoles(error)
            })
    }

    const restore = (id) => {
        if(window.confirm('Bạn có chắc không ?')) {
            callApi(`banners/restore/${id}`, 'PATCH')
                .then(response => {
                    bannerRestore.splice(bannerRestore.indexOf(bannerRestore.find(b => b.id === id)),1);
                    banners.push(response.data);
                    setBanners([...banners]);
                    setBannerRestore([...bannerRestore]);
                    toast('success','Restore successfully');
                })
                .catch(error => {
                    console.log(error)
                    toastRoles(error)
                    toast('error',error)
                });
        }
    }

    const hardRemove = (id) => {
        if(window.confirm('Bạn có chắc không ?')) {
            callApi(`banners/${id}`,'DELETE')
                .then(() => {
                    bannerRestore.splice(bannerRestore.indexOf(bannerRestore.find(b => b.id === id)),1);
                    setBannerRestore([...bannerRestore])
                    toast('success','Delete successfully');
                })
                .catch(error => {
                    toastRoles(error)
                    toast('error',error);
                })
        }
    }

    const back = () => {
        if(isForm) setIsForm(false);
        if(isRestore) setIsRestore(false);
    }

    const paginate = (e,page) => {
        e.preventDefault();
        setCurrentPage(page);
    }

    const create = (data) => {
        banners.push(data);
        setBanners([...banners]);
    }

    const edit = (id) => {
        modify(`banners/${id}`)
            .then(response => {
                setIsForm(true);
                setBanner(response);
            }).catch(error => console.log(error))
    }

    const update = (id,data) => {
        banners[banners.indexOf(banners.find(b => b.id === id))] = data;
        setBanners([...banners]);
    }

    const remove = (id) => {
        if(window.confirm('Bạn có chắc không')) {
            callApi(`banners/${id}`,'PATCH')
                .then(() => {
                    banners.splice(banners.indexOf(banners.find(b => b.id === id)),1)
                    setBanners([...banners]);
                    toast('success','Delete successfully');
                })
                .catch(error => {
                    console.log(error);
                    toast('error','Delete failure');
                    toastRoles(error)
                })
        }
    }

    const fetchDatas = () => {
        if(props.roles.some(r => permissions.includes(r))) {
            props.toggle(true)
            getDatas('banners', setBanners);
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
                            {(!isForm) && (
                                <button onClick={add} className="btn btn-success card-title">
                                    <i className="fa fa-plus"></i> Add new
                                </button>
                            )}
                            <button onClick={refresh} className="ml-2 btn btn-outline-primary card-title">
                                <i className="fas fa-sync"></i> Refresh
                            </button>
                            <button onClick={getRestore} className="ml-2 btn btn-outline-warning card-title">
                                <i className="fa fa-trash-restore"></i> Restore
                            </button>
                            {(isRestore || isForm) && (
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
                    <div className={`card-body ${isForm ? 'table-responsive p-0' : ''} col-md-12`}>
                        {
                            (isForm &&
                                (
                                    <BannerForm eventAdd={create} item={banner} eventEdit={update}/>
                                )
                            )
                            ||
                            (isRestore &&
                                (
                                    <BannerRestore items={bannerRestore} eventRestore={restore} eventHardRemove={hardRemove}/>
                                )
                            )
                            ||
                            (
                                <React.Fragment>
                                    <BannerList items={calCurrentItems(currentPage, banners)} eventEdit={edit} eventRemove={remove}/>
                                    <Pagination
                                        itemsPerPage={4}
                                        totalItems={banners}
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

export default connect(mapStateToProps, mapDispatchToProps)(Banners);

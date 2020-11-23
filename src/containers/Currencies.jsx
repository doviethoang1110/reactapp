import React, {useEffect, useState} from 'react';
import CurrencyList from "../components/currency/CurrencyList";
import CurrencyForm from "../components/currency/CurrencyForm";
import Currency from "../models/Currency";
import {getDatas, modify, toastRoles} from "../utils/helpers";
import callApi from "../utils/api";
import {toast} from "../utils/alert";
import { connect } from "react-redux";
import {actionToggleGrant} from "../actions/grant";

const permissions = ['READ_CURRENCY','ADMIN_MANAGER'];

const Currencies = (props) => {
    // state hook
    const [currencies, setCurrencies] = useState([]);
    const [currency, setCurrency] = useState(new Currency('','',1));
    const [isForm, setIsForm] = useState(false);

    const fetchDatas = () => {
        if(props.roles.some(r => permissions.includes(r))) {
            props.toggle(true)
            getDatas('currencies', setCurrencies);
        }else props.toggle(false)
    }

    useEffect((props) => {
        fetchDatas();
    },[]);

    // method
    const add = () => {
        setIsForm(true);
        setCurrency(new Currency('','',1))
    };

    const closeForm = () => setIsForm(false)

    const refresh = () => fetchDatas()

    const create = (data) => {
        const array = [...currencies];
        array.push(data)
        setCurrencies(array);
    }

    const edit = (id) => {
        modify(`currencies/${id}`)
            .then(res => {
                setIsForm(true);
                setCurrency(res)
            }).catch(error => {
                console.log(error)
                toastRoles(error)
            })
    }

    const remove = (id) => {
        if(window.confirm('Bạn có chắc không ?'))
            callApi(`currencies/${id}`,'DELETE')
                .then(() => {
                    toast('success','Delete successfully');
                    currencies.splice(currencies.indexOf(currencies.find(a => a.id === id)),1);
                    setCurrencies([...currencies]);
                })
                .catch(error => {
                    toast('error','Delete failure')
                    toastRoles(error);
                })
    }

    const update = (id, data) => {
        const array = [...currencies];
        array[array.indexOf(array.find(c => c.id === id))] = data;
        setCurrencies(array);
    }

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
                    <div className={`card-body table-responsive p-0 ${isForm ? 'col-md-7' : 'col-md-12'}`}>
                        <CurrencyList items={currencies} eventEdit={edit} eventRemove={remove}/>
                    </div>
                    {isForm && (
                        <div className='col-md-5 card-body'>
                            <CurrencyForm closeForm={closeForm} item={currency} eventAdd={create} eventEdit={update}/>
                        </div>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);

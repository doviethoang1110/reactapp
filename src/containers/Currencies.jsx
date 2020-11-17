import React, {useEffect, useState} from 'react';
import CurrencyList from "../components/currency/CurrencyList";
import CurrencyForm from "../components/currency/CurrencyForm";
import Currency from "../models/Currency";
import {getDatas, modify} from "../utils/helpers";
import callApi from "../utils/api";
import {toast} from "../utils/alert";

const Currencies = (props) => {
    // state hook
    const [currencies, setCurrencies] = useState([]);
    const [currency, setCurrency] = useState(new Currency('','',1));
    const [isForm, setIsForm] = useState(false);

    useEffect((props) => {
        getDatas('currencies', setCurrencies);
    },[]);

    // method
    const add = () => {
        setIsForm(true);
        setCurrency(new Currency('','',1))
    };

    const closeForm = () => setIsForm(false)

    const refresh = () => getDatas('currencies', setCurrencies)

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
            }).catch(error => console.log(error))
    }

    const remove = (id) => {
        if(window.confirm('Bạn có chắc không ?'))
            callApi(`currencies/${id}`,'DELETE')
                .then(() => {
                    toast('success','Delete successfully');
                    currencies.splice(currencies.indexOf(currencies.find(a => a.id === id)),1);
                    setCurrencies([...currencies]);
                })
                .catch(() => toast('error','Delete failure'))
    }

    const update = (id, data) => {
        const array = [...currencies];
        array[array.indexOf(array.find(c => c.id === id))] = data;
        setCurrencies(array);
    }

    return (
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
    );
}
export default Currencies;

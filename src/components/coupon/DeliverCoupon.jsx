import React, {Component} from 'react';
import SimpleReactValidator from "simple-react-validator";
import callApi from "../../utils/api";
import {toastRoles} from "../../utils/helpers";
import {toast} from "../../utils/alert";
import {Multiselect} from "multiselect-react-dropdown";

let temp = null;

class DeliverCoupon extends Component{

    constructor(props) {
        super(props);
        this.multiselectRef = React.createRef();
        this.state = {
            request: {couponId: 1, customers: []},
            isModal: false,
            listCoupons: []
        }
        this.validator = new SimpleReactValidator({
            messages: {
                required: ':attribute không được rỗng'
            },
            className: 'text-danger'
        });
    }

    removeCoupon = (e,id) => {
        e.preventDefault();
        temp = +id
        callApi(`coupons/customers/${id}/remove`)
            .then(res => {
                this.setState({listCoupons: res.data, isModal: true});
            }).catch(error => {
                console.log(error);
                toastRoles(error)
            })
    }

    handleCheckbox = (e) => {
        let request = {...this.state.request};
        if(e.target.checked) request.customers.push(+e.target.id);
        else request.customers = request.customers.filter(r => r !== +e.target.id);
        this.setState({request});
    }

    handleInput = (e) => {
        const request = this.state.request;
        request[e.target.name] = +e.target.value;
        this.setState({request});
    }

    handleMultiSelect = (selectedList) =>
        this.setState({listCoupons: [...this.multiselectRef.current.getSelectedItems()]})


    onSelect = (selectedList) => this.handleMultiSelect(selectedList);

    onRemove = (selectedList) => this.handleMultiSelect(selectedList);

    submitForm = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            const data = this.state.request;
            if(!data.customers.length) {
                alert('Chọn ít nhất 1 khách hàng');
                return;
            }else {
                callApi('coupons/deliver', 'POST', data)
                    .then(res => {
                        toast('success', res.data.message);
                        for(let a of document.getElementsByClassName("checkbox-input")) a.checked = false;
                        this.setState({request: {couponId: 1, customers: []}})
                    }).catch(error => {
                    console.log(error);
                    toastRoles(error)
                })
            }
        } else {
            this.forceUpdate();
            this.validator.showMessages();
        }
    }

    execute = (e) => {
        e.preventDefault();
        callApi(`coupons/customers/${temp}/remove`,'PUT',this.state.listCoupons.map(c => c.id))
            .then(res => {
                toast('success', 'Update successfully');
                this.setState({listCoupons: res.data});
            }).catch(error => {
                console.log(error)
                toastRoles(error)
            })
    }

    render() {
        let list = this.props.items;
        let coupons = this.props.coupons;
        const { couponId } = this.state.request;
        const { isModal, listCoupons } = this.state;
        list = !list.length ? null : list.map(item => (
            <tr key={item.id}>
                <td>
                    <div className="icheck-primary">
                        <input type="checkbox" className="checkbox-input"
                               onChange={this.handleCheckbox}
                               name="check" id={item.id}/>
                        <label htmlFor={item.id}></label>
                    </div>
                </td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                    <button onClick={(e) => this.removeCoupon(e,item.id)} type="button" className="mr-2 btn btn-outline-danger"><i className="fa fa-trash"></i></button>
                </td>
            </tr>
        ));
        return (
            <React.Fragment>
                {isModal && (
                    <form onSubmit={this.execute}>
                        <div className='col-md-6' style={{margin: '0 auto'}}>
                            <label>Bỏ mã giảm giá</label>
                            <Multiselect
                                closeIcon='cancel'
                                options={listCoupons}
                                selectedValues={listCoupons}
                                onSelect={this.onSelect}
                                ref={this.multiselectRef}
                                onRemove={this.onRemove}
                                displayValue="name"
                            />
                        </div>
                        <button type="submit" className='btn btn-outline-primary'>Submit</button>
                    </form>
                )}
                {(!list || ! list.length) ? (<h2>Chưa có khách hàng nào</h2>) : (
                    <React.Fragment>
                        <form onSubmit={this.submitForm}>
                            <label htmlFor="coupon">Chọn mã giảm giá</label>
                            <select
                                name="couponId"
                                value={couponId}
                                onChange={this.handleInput}
                                className='form-control' style={{width:'250px'}} id="coupon">
                                {(coupons.length) && coupons.map((c,index) => (
                                    <option key={index} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            {this.validator.message('Mã coupon', couponId, 'required|numeric')}
                            <table className="table table-hover text-nowrap">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {list}
                                </tbody>
                            </table>
                            <button className="btn btn-outline-success" type="submit">Phát coupon</button>
                        </form>
                    </React.Fragment>
                )}

            </React.Fragment>
        );
    }
}

export default DeliverCoupon;
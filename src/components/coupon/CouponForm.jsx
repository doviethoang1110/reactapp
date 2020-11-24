import React,{Component} from "react";
import SimpleReactValidator from "simple-react-validator";
import {save, toastRoles} from "../../utils/helpers";
import Coupon from "../../models/Coupon";
import moment from "moment";

class CouponForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            coupon: new Coupon('','','','',1,0)
        }
        this.validator = new SimpleReactValidator({
            messages: {
                required: ':attribute không được rỗng',
                numeric: ':attribute phải là số'
            },
            className: 'text-danger'
        });
    }

    componentDidMount() {
        if (this.props.item)
            this.setState({
                coupon: this.props.item
            })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({coupon: nextProps.item});
    }

    // form Change
    checkFormChange = () => {
        // let currency = this.props.item;
        // let { name, code, rate } = this.state.currency;
        // return (currency.name === name && currency.code === code && currency.rate === rate);
    }

    //handle input
    handleChange = (e) => {
        const coupon = {...this.state.coupon};
        coupon[e.target.name] = e.target.name === 'code' ? e.target.value.toUpperCase() : e.target.value;
        this.setState({coupon});
    }

    submitForm = (e) => {
        e.preventDefault();
        const data = this.state.coupon;
        const {id, startDate, endDate} = data;
        if(startDate >= endDate) {
            document.getElementById("err_endDate").innerText = "Ngày kết thúc phải sau ngày tạo";
            return;
        }else {
            save({
                data, id,
                url: 'coupons',
                eventAdd: this.props.eventAdd,
                eventEdit: this.props.eventEdit
            },id ? 'PUT' : 'POST').then((res) => {
                res.startDate = moment(new Date(res.startDate)).format('YYYY-MM-DDTHH:mm');
                res.endDate = moment(new Date(res.endDate)).format('YYYY-MM-DDTHH:mm');
                this.setState({coupon: id ? res : new Coupon('','','','',1,0)})
            }).catch(error => {
                console.log(error)
                toastRoles(error);
                this.setState({coupon: id ? this.state.coupon : new Coupon('','','','',1,0)})
            })
            if(this.validator.allValid()) {

            } else {
                this.forceUpdate();
                this.validator.showMessages();
            }
        }
    }

    render() {
        let { coupon } = this.state;
        return (
            <form onSubmit={this.submitForm} style={{margin: '0 auto'}} className="col-md-8">
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="name">Tên</label>
                        <input
                            type="text" name="name"
                            className="form-control"
                            value={coupon.name}
                            onChange={this.handleChange}
                            id="name"
                            placeholder="Nhập tên loại tiền" />
                        {this.validator.message('Tên', coupon.name, 'required|min:2|max:20')}
                        <span className="text-danger errorMsg" id="err_name"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="code">Mã</label>
                        <input
                            type="text" name="code"
                            className="form-control"
                            value={coupon.code}
                            onChange={this.handleChange}
                            id="code"
                            placeholder="Nhập ký hiệu" />
                        {this.validator.message('Mã', coupon.code, 'required|min:2|max:20')}
                        <span className="text-danger errorMsg" id="err_code"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate">Ngày bắt đầu</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="far fa-clock"></i></span>
                            </div>
                            <input type="datetime-local" name="startDate"
                                   defaultValue={coupon.startDate}
                                   onChange={this.handleChange}
                                   className="form-control float-right" id="startDate"/>
                        </div>
                        {this.validator.message('Ngày bắt đầu', coupon.startDate, 'required')}
                        <span className="text-danger errorMsg" id="err_startDate"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">Ngày kết thúc</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="far fa-clock"></i></span>
                            </div>
                            <input type="datetime-local"
                                   defaultValue={coupon.endDate}
                                   onChange={this.handleChange}
                                   name="endDate" className="form-control float-right" id="endDate"/>
                        </div>
                        {this.validator.message('Ngày kết thúc', coupon.endDate, 'required')}
                        <span className="text-danger errorMsg" id="err_endDate"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Loại</label>
                        <select value={coupon.type} className="form-control" name="type"
                                id="type" onChange={this.handleChange}>
                            <option value={1}>Free shipping</option>
                            <option value={2}>Flash sale</option>
                            <option value={3}>Discount percent (%)</option>
                        </select>
                        {this.validator.message('Loại', coupon.type, 'required')}
                        <span className="text-danger errorMsg" id="err_type"></span>
                    </div>
                    {+coupon.type !== 1 && (
                        <div className="form-group">
                            <label htmlFor="detail">Chi tiết</label>
                            <input
                                type="number" name="detail"
                                className="form-control"
                                value={coupon.detail}
                                onChange={this.handleChange}
                                id="detail"
                                placeholder="Nhập tên tỷ lệ" />
                            {this.validator.message('Chi tiết', coupon.detail, 'required|numeric')}
                            <span className="text-danger errorMsg" id="err_detail"></span>
                        </div>
                    )}
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                    <button type="submit" disabled={this.checkFormChange()} className="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }
}
export default CouponForm;
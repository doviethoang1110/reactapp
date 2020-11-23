import React,{Component} from "react";
import SimpleReactValidator from "simple-react-validator";
import Currency from "../../models/Currency";
import {save, toastRoles} from "../../utils/helpers";

class CurrencyForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currency: new Currency('','',1)
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
                currency: this.props.item
            })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({currency: nextProps.item});
    }

    // form Change
    checkFormChange = () => {
        let currency = this.props.item;
        let { name, code, rate } = this.state.currency;
        return (currency.name === name && currency.code === code && currency.rate === rate);
    }

    //handle input
    handleChange = (e) => {
        let currency = {...this.state.currency};
        currency[e.target.name] = e.target.value
        this.setState({currency});
    }

    submitForm = (e) => {
        e.preventDefault();
        if(this.validator.allValid()) {
            const ele = document.getElementById('err_rate');
            const currency = this.state.currency;
            if((+currency.rate > 50) || (+currency.rate < 1)) {
                ele.innerText = 'Tỷ lệ từ 1-50'
                return;
            }
            save({
                id:currency.id,
                data:this.state.currency,
                url:'currencies',
                eventAdd:this.props.eventAdd,
                eventEdit: this.props.eventEdit},currency.id ? 'PUT' : 'POST')
                .then(res => {
                    this.setState({currency: currency.id ? res : new Currency('','',1)})
                }).catch(error => {
                    toastRoles(error)
                    this.setState({currency: this.state.currency});
            });
        } else {
            this.forceUpdate();
            this.validator.showMessages();
        }

    }

    render() {
        let { currency } = this.state;
        return (
            <div className={`card ${!currency.id ? 'card-primary' : 'card-warning'}`}>
                <div className="card-header">
                    <h3 className="card-title">{!currency.id ? 'Thêm mới' : 'Cập nhật'} loại tiền</h3>
                    <span onClick={this.props.closeForm} style={{ float: 'right', cursor: 'pointer' }}><i className="fa fa-times"></i></span>
                </div>
                <form onSubmit={this.submitForm}>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="name">Tên loại tiền</label>
                            <input
                                type="text" name="name"
                                className="form-control"
                                value={currency.name}
                                onChange={this.handleChange}
                                id="name"
                                placeholder="Nhập tên loại tiền" />
                            {this.validator.message('Tên', currency.name, 'required|min:2|max:20')}
                            <span className="text-danger errorMsg" id="err_name"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Ký hiệu tiền</label>
                            <input
                                type="text" name="code"
                                className="form-control"
                                value={currency.code}
                                onChange={this.handleChange}
                                id="code"
                                placeholder="Nhập ký hiệu" />
                            {this.validator.message('Ký hiệu', currency.code, 'required|min:2|max:20')}
                            <span className="text-danger errorMsg" id="err_code"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Tỷ lệ</label>
                            <input
                                type="number" name="rate"
                                className="form-control"
                                value={currency.rate}
                                onChange={this.handleChange}
                                id="rate"
                                placeholder="Nhập tên tỷ lệ" />
                            {this.validator.message('Tỷ lệ', currency.rate, 'required|numeric')}
                            <span className="text-danger errorMsg" id="err_rate"></span>
                        </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit" disabled={this.checkFormChange()} className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default CurrencyForm;
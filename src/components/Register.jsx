import React, {Component} from "react";
import SimpleReactValidator from "simple-react-validator";
import User from "../models/User";
import callApi from "../utils/api";
import Swal from "sweetalert2";
import {NavLink} from "react-router-dom";
import {toast} from "../utils/alert";

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: new User('','','')
        }
        this.validator = new SimpleReactValidator({
            messages: {
                required: ':attribute không được rỗng',
                email: ':attribute không đúng định dạng'
            },
            className: 'text-danger'
        });
    }

    handleChange = (e) => {
        const user = this.state.user;
        user[e.target.name] = e.target.value;
        this.setState({user});
    }

    submitForm = (e) => {
        e.preventDefault();
        const data = this.state.user;
        callApi('auth/register', 'POST', data)
            .then(res => {
                for(let a of document.getElementsByClassName('errMsg')) a.innerText = '';
                Swal.fire({
                    text: res.data.message,
                    icon: res.data.icon
                }).then(()=>{this.props.history.push("/login")});
            }).catch(error => {
            toast('error', 'Đăng ký thất bại');
            for(let e in error.response.data) document.getElementById('err_'+e).innerText = error.response.data[e];
            })
        // if (this.validator.allValid()) {
        //
        // } else {
        //     this.forceUpdate();
        //     this.validator.showMessages();
        // }
    }

    render() {
        const { user } = this.state;
        return (
            <div className='login-page' style={{minHeight: '586.391px'}}>
                <div className="register-box">
                    <div className="register-logo">
                        <h3>Register</h3>
                    </div>
                    <div className="card">
                        <div className="card-body register-card-body">
                            <p className="login-box-msg">Register a new membership</p>
                            <form method="post" onSubmit={this.submitForm}>
                                <div className="input-group mb-3">
                                    <input type="text"
                                           value={user.name}
                                           onChange={this.handleChange}
                                           name='name' id="name"
                                           className="form-control" placeholder="Name"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-user"></span>
                                            </div>
                                        </div>
                                </div>
                                {this.validator.message('Tên', user.name, 'required')}
                                <span className='text-danger errMsg' id='err_name'></span>
                                <div className="input-group mb-3">
                                    <input type="email"
                                           value={user.email}
                                           onChange={this.handleChange}
                                           id="email" name="email"
                                           className="form-control" placeholder="Email"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                </div>
                                {this.validator.message('Email', user.email, 'required|email')}
                                <span className='text-danger errMsg' id='err_email'></span>
                                <div className="input-group mb-3">
                                    <input type="password"
                                           value={user.password}
                                           onChange={this.handleChange}
                                           name="password" id="password" className="form-control" placeholder="Password"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock"></span>
                                            </div>
                                        </div>
                                </div>
                                {this.validator.message('Mật khẩu', user.password, 'required')}
                                <span className='text-danger errMsg' id='err_password'></span>
                                <div className="row">
                                    <div className="col-6" style={{margin: '0 auto'}}>
                                        <button type="submit" className="btn btn-primary btn-block">Register</button>
                                    </div>
                                </div>
                            </form>
                            <NavLink exact to='/login' className="text-center">I already have a membership</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
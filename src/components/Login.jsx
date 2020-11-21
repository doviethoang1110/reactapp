import React, {Component} from "react";
import SimpleReactValidator from "simple-react-validator";
import {NavLink} from "react-router-dom";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
        this.validator = new SimpleReactValidator({
            messages: {
                required: ':attribute không được rỗng'
            },
            className: 'text-danger'
        });
    }

    render() {
        return (
            <div className='login-page' style={{minHeight: '586.391px'}}>
                <div className="register-box">
                    <div className="register-logo">
                        <h3>Log in</h3>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">Sign in to start your session</p>
                            <form action="../../index3.html" method="post">
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" placeholder="Password"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock"></span>
                                            </div>
                                        </div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        <div className="icheck-primary">
                                            <input type="checkbox" id="remember"/>
                                                <label htmlFor="remember">
                                                    Remember Me
                                                </label>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                    </div>
                                </div>
                            </form>
                            <p className="mb-1">
                                <a href="forgot-password.html">I forgot my password</a>
                            </p>
                            <p className="mb-0">
                                <NavLink exact to='/register' className="text-center">Register a new membership</NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
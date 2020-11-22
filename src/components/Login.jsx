import React, {Component} from "react";
import SimpleReactValidator from "simple-react-validator";
import {NavLink, Redirect} from "react-router-dom";
import {toast} from "../utils/alert";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {email: '', password: ''}
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
        this.props.login(data)
            .then(res => {
                this.props.history.push("/dashboard");
                toast('success', res)
            }).catch(error => {
                document.getElementById('errMsg').innerText = error;
            });
        // if (this.validator.allValid()) {
        //
        // } else {
        //     this.forceUpdate();
        //     this.validator.showMessages();
        // }
    }

    render() {
        const { user } = this.state;
        const { isLogin } = this.props;
        return (
            <React.Fragment>
                <div className='login-page' style={{minHeight: '586.391px'}}>
                    <div className="register-box">
                        <div className="register-logo">
                            <h3>Login</h3>
                        </div>
                        <div className="card">
                            <div className="card-body register-card-body">
                                <p className="login-box-msg">Sign in to start your session</p>
                                <form method="post" onSubmit={this.submitForm}>
                                    <div className="input-group mb-3">
                                        <input type="text"
                                               value={user.email}
                                               onChange={this.handleChange}
                                               name='email' id="email"
                                               className="form-control" placeholder="Name"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                    </div>
                                    {this.validator.message('Email', user.email, 'required|email')}
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
                                    <span className='text-danger' id='errMsg'></span>
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
                            </div>
                            <NavLink exact to='/' className="text-center">I forgot my password</NavLink>
                            <NavLink exact to='/register' className="text-center">Register a new membership</NavLink>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;
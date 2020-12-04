import React, {Component} from 'react';
import Header from "./components/Header";
import {Switch, Route, Redirect} from "react-router-dom";
import routes from "./routers";
import './App.css';
import Aside from "./components/Aside";
import { connect } from "react-redux";
import Register from "./components/Register";
import Login from "./components/Login";
import {actionLogin, actionLogout} from "./actions/auth";
import socket from "./utils/socket";
import callApi from "./utils/api";
import Friends from "./containers/Friends";
import {toast} from "./utils/alert";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            requestsReceived: []
        }
    }

    componentDidMount() {
        socket.emit("SET_USER_ID", this.props.user?.id);
        callApi(`users/${this.props.user?.id}/friendRequestReceived`)
            .then(res => {
                this.setState({requestsReceived: res.data});
            }).catch(error => {
                console.log(error)
            });
        socket.on("RECEIVED_ADD_FRIEND_REQUEST", (data) => {
            const requestsReceived = this.state.requestsReceived;
            requestsReceived.push(data);
            toast('success', `${data.displayName || data.name} <br/>gửi cho bạn 1 lời mời kết bạn`);
            this.setState({requestsReceived});
        })
    }

    renderContent = (routes) => {
        let content = null;
        if(routes.length > 0) {
            content = routes.map((route,index) => {
                return (
                    <Route exact={true} key={index} path={route.path} component={route.component}/>
                );
            })
        }
        return content;
    }

    render() {
        const { isLoading, user, login, logout, displayName } = this.props;
        const { requestsReceived } = this.state;
        let loading = isLoading ?  <div className="loading" style={{display:"block"}}></div> : '';
        return (
            <React.Fragment>
                {!user ? (
                    <React.Fragment>
                        <Redirect from="/" to="/login" exact/>
                        <Switch>
                            <Route path="/register" component={Register} exact />
                            <Route path="/login" render={(props) => (
                                <Login {...props} login={login} />
                            )} />} exact/>
                        </Switch>
                    </React.Fragment>
                ) : (
                    <div className="App">
                        {loading}
                        <Header name={displayName ? displayName : user.name} logout={logout} requestsReceived={requestsReceived}/>
                        <Aside name={displayName ? displayName : user.name}/>
                        <div className="content-wrapper">
                            <div className="content-header">
                                <div className="container-fluid">
                                    <div className="row mb-2">
                                        <div className="col-sm-6">
                                            <h1 className="m-0 text-dark">Dashboard</h1>
                                        </div>
                                        <div className="col-sm-6">
                                            <ol className="breadcrumb float-sm-right">
                                                <li className="breadcrumb-item"><a href="# ">Home</a></li>
                                                <li className="breadcrumb-item active">Dashboard v1</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <section className="content">
                                <div className="container-fluid">
                                    <Switch>
                                        <Route path={["/login","/register"]} exact>
                                            {user && <Redirect exact to="/dashboard" />}
                                        </Route>
                                        <Route path="/friends" render={(props) => (
                                            <Friends {...props} requestsReceived={requestsReceived} />
                                        )} />} exact/>
                                        { this.renderContent(routes) }
                                    </Switch>
                                </div>
                            </section>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.loading,
        user: state.auth.user,
        displayName: state.auth.user?.userDetail.displayName
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login:(data) => {
            return dispatch(actionLogin(data));
        },
        logout:() => {
            return dispatch(actionLogout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
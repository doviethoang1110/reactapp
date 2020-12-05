import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Aside from "../components/Aside";
import Friends from "./Friends";
import {Switch, Route, Redirect} from "react-router-dom";
import routes from "../routers";
import {actionLogout} from "../actions/auth";
import {connect} from "react-redux";
import socket from "../utils/socket";
import callApi from "../utils/api";
import {toast} from "../utils/alert";

const Main = (props) => {
    const renderContent = (routes) => {
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

    const [requestsReceived, setRequestReceived] = useState([]);

    useEffect(() => {
        socket.emit("SET_USER_ID", props.user?.id);
        if(!requestsReceived.length) {
            callApi(`users/${props.user?.id}/friendRequestReceived`)
                .then(res => {
                    setRequestReceived(res.data);
                }).catch(error => {
                console.log(error)
            });
        }
        socket.on("RECEIVED_ADD_FRIEND_REQUEST", (data) => {
            requestsReceived.push(data);
            toast('success', `${data.displayName || data.name} <br/>gửi cho bạn 1 lời mời kết bạn`);
            setRequestReceived([...requestsReceived]);
        });
        socket.on("REMOVE_ADD_FRIEND_REQUEST_SUCCESS", (data) => {
            requestsReceived.splice(requestsReceived.indexOf(requestsReceived.find(a => a.id === +data)),1);
            setRequestReceived([...requestsReceived]);
        });
    }, []);

    return (
        <div className="App">
            {props.isLoading ?  <div className="loading" style={{display:"block"}}></div> : ''}
            <Header name={props.user.userDetail.displayName || props.user.name} logout={props.logout} requestsReceived={requestsReceived}/>
            <Aside name={props.user.userDetail.displayName || props.user.name}/>
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
                                {props.user && <Redirect exact to="/dashboard" />}
                            </Route>
                            <Route exact path="/friends" render={(props) => (
                                <Friends {...props} requestsReceived={requestsReceived} />
                            )} />
                            { renderContent(routes) }
                        </Switch>
                    </div>
                </section>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout:() => {
            return dispatch(actionLogout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
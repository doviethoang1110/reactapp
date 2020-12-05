import React, {Component} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import './App.css';
import { connect } from "react-redux";
import Register from "./components/Register";
import Login from "./components/Login";
import {actionLogin, actionLogout} from "./actions/auth";
import Main from "./containers/Main";

class App extends Component{

    render() {
        const { user, login } = this.props;
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
                    <Main user={user}/>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login:(data) => {
            return dispatch(actionLogin(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
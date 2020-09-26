import React, {Component} from 'react';
import Header from "./components/Header";
import {Switch, Route} from "react-router-dom";
import routes from "./routers";
import Aside from "./components/Aside";


class App extends Component{

    renderContent = (routes) => {
        let content = null;
        if(routes.length > 0) {
            content = routes.map((route,index) => {
                return (
                    <Route exact={route.exact} key={index} path={route.path} component={route.component}/>
                );
            })
        }
        return content;
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <Aside/>
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
                                { this.renderContent(routes) }
                            </Switch>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}


export default App;

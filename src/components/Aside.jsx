import React, { Component } from "react";
import {NavLink} from "react-router-dom";

const menus = [
    {
        path: '/dashboard',
        icon: 'fa fa-home',
        label: 'Trang chủ',
    },
    {
        label: 'Quản lý sản phẩm',
        icon: 'fa fa-shopping-cart',
        child: [
            {path:'/categories', icon: 'fas fa-th', label: 'Quản lý danh mục'},
            {path:'/brands', icon: 'fa fa-file-image', label: 'Quản lý brand'},
            {path:'/products', icon: 'fa fa-shopping-cart', label: 'Quản lý sản phẩm'},
            {path:'/coupons', icon: 'fa fa-tags', label: 'Mã giảm giá'}
        ]
    },
    {
        label: 'Quản lý hệ thống',
        icon: 'fa fa-user',
        child: [
            {path:'/permissions', icon: 'fa fa-unlock', label: 'Quản lý quyền'},
            {path:'/roles',icon: 'fa fa-child', label: 'Quản lý vai trò'},
            {path:'/users', icon: 'fa fa-user', label: 'Phân quyền người dùng'},
            {path:'/currencies', icon: 'fas fa-dollar-sign', label: 'Quản lý loại tiền'}
        ]
    },
    {
        label: 'Quản lý website',
        icon: 'fa fa fa-notes-medical',
        child: [
            {path:'/blogs', icon: 'fa fa-sticky-note', label: 'Quản lý bài viết'},
            {path:'/reviews', icon: 'fa fa-pen', label: 'Quản lý bình luận'},
            {path:'/orders', icon: 'fa fa-shopping-bag', label: 'Quản lý đơn hàng'},
            {path:'/banners', icon: 'fa fa-object-group', label: 'Quản lý banner'}
        ]
    },
];

class Aside extends Component {
    renderMenu(menus) {
        let result = null;
        if(menus.length > 0) {
            result = menus.map((route,index) => {
                return (
                    <React.Fragment key={index}>
                        {(route.child) ? (
                            <li className="nav-item has-treeview">
                                <a href="#" className="nav-link">
                                    <i className={`nav-icon ${route.icon}`}></i>
                                    <p>{route.label}<i className="right fas fa-angle-left"></i></p>
                                </a>
                                <ul className="nav nav-treeview">
                                    {route.child.map((r, i) => (
                                        <li className="nav-item" key={i}>
                                            <CustomLinks key={i} route={r.path} icon={r.icon}>{r.label}</CustomLinks>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ) : (
                            <li key={index} className="nav-item">
                                <CustomLinks route={route.path} icon={route.icon}>{route.label}</CustomLinks>
                            </li>
                        )}
                    </React.Fragment>
                );
            })
        }
        return result;
    }
    render() {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <a href="index3.html " className="brand-link">
                    <img src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
                    <span className="brand-text font-weight-light">AdminLTE 3</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition"><div className="os-resize-observer-host observed"><div className="os-resize-observer" style={{left: '0px', right: 'auto'}} /></div><div className="os-size-auto-observer observed" style={{height: 'calc(100% + 1px)', float: 'left'}}><div className="os-resize-observer" /></div><div className="os-content-glue" style={{margin: '0px -8px', width: '249px', height: '325px'}} /><div className="os-padding"><div className="os-viewport os-viewport-native-scrollbars-invisible os-viewport-native-scrollbars-overlaid" style={{overflowY: 'scroll'}}><div className="os-content" style={{padding: '0px 8px', height: '100%', width: '100%'}}>
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="" />
                        </div>
                        <div className="info">
                            <a href="# " className="d-block">{this.props.name}</a>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {this.renderMenu(menus)}
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div></div></div><div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden"><div className="os-scrollbar-track"><div className="os-scrollbar-handle" style={{width: '100%', transform: 'translate(0px, 0px)'}} /></div></div><div className="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden"><div className="os-scrollbar-track"><div className="os-scrollbar-handle" style={{height: '25.9141%', transform: 'translate(0px, 0px)'}} /></div></div><div className="os-scrollbar-corner" /></div>
                {/* /.sidebar */}
            </aside>
        );
    }
}
class CustomLinks extends Component{
    render() {
        return (
            <NavLink exact to={this.props.route} className="nav-link">
                <i className={`nav-icon ${ this.props.icon }`} />
                <p>{ this.props.children }</p>
            </NavLink>
        );
    }
}
export default Aside;
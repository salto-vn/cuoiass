import * as React from 'react';
import { NavMenu } from './NavMenu';

interface ILayoutProps {
    children?: React.ReactNode;
}

interface INavMenu {
    isCollapse: boolean
}

export class Layout extends React.Component<ILayoutProps, INavMenu> {
    public state = {
        isCollapse: false
    }

    public onCollapsedSideBar = () => {
        this.setState({ isCollapse: !this.state.isCollapse });
    }

    public render() {
        return <div className={`page-sidebar-fixed page-header-fixed page-container ${this.state.isCollapse ? 'page-sidebar-collapsed' : ''}`}>
            <NavMenu />
            <div className="page-content flex flex-full-height">
                <div className="page-header">
                    <div className="search-form">
                        <form action="#" method="GET">
                            <div className="input-group">
                                <input type="text" name="search" className="form-control search-input" placeholder="Type something..." />
                                <span className="input-group-btn">
                                    <button className="btn btn-default" id="close-search" type="button">
                                        <i className="icon-close" />
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <div className="logo-sm">
                                    <a href="javascript:void(0)" id="sidebar-toggle-button"><i className="fa fa-bars" /></a>
                                    <a className="logo-box" href="index.html"><span>metro</span></a>
                                </div>
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                    <i className="fa fa-angle-down" />
                                </button>
                            </div>
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav">
                                    <li className="collapsed-sidebar-toggle-inv"><a onClick={this.onCollapsedSideBar} id="collapsed-sidebar-toggle-button"><i className="fa fa-bars" /></a></li>
                                    <li><a href="javascript:void(0)" id="toggle-fullscreen"><i className="fa fa-expand" /></a></li>
                                    <li><a href="javascript:void(0)" id="search-button"><i className="fa fa-search" /></a></li>
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a href="javascript:void(0)" className="right-sidebar-toggle" data-sidebar-id="main-right-sidebar"><i className="fa fa-envelope" /></a></li>
                                    <li className="dropdown">
                                        <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-bell" /></a>
                                        <ul className="dropdown-menu dropdown-lg dropdown-content">
                                            <li className="drop-title">Notifications<a href="#" className="drop-title-link"><i className="fa fa-angle-right" /></a></li>
                                            <li className="slimscroll dropdown-notifications">
                                                <ul className="list-unstyled dropdown-oc">
                                                    <li>
                                                        <a href="#"><span className="notification-badge bg-info"><i className="fa fa-at" /></span>
                                                            <span className="notification-info">
                                                                <span className="notification-info"><b>John Doe</b> mentioned you in a post "Update v1.5"</span>
                                                                <small className="notification-date">06:07</small>
                                                            </span></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><span className="notification-badge bg-danger"><i className="fa fa-bolt" /></span>
                                                            <span className="notification-info">
                                                                <span className="notification-info">4 new special offers from the apps you follow!</span>
                                                                <small className="notification-date">Yesterday</small>
                                                            </span></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><span className="notification-badge bg-success"><i className="fa fa-bullhorn" /></span>
                                                            <span className="notification-info">
                                                                <span className="notification-info">There is a meeting with <b>Ethan</b> in 15 minutes!</span>
                                                                <small className="notification-date">Yesterday</small>
                                                            </span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                            <img src="" alt="" className="img-circle" />
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">Profile</a></li>
                                            <li><a href="#">Calendar</a></li>
                                            <li><a href="#"><span className="badge pull-right badge-info">64</span>Messages</a></li>
                                            <li role="separator" className="divider" />
                                            <li><a href="#">Account Settings</a></li>
                                            <li><a href="#">Log Out</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="page-inner flex-full-width">
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
}

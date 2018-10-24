import * as React from 'react';
import { NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className="page-sidebar">
            <NavLink to='/' className="logo-box">
                <span>VENDOR</span>
                <i className="icon-radio_button_unchecked" id="fixed-sidebar-toggle-button" />
                <i className="icon-close" id="sidebar-toggle-button-close" />
            </NavLink>
            <div className="page-sidebar-inner">
                <div className="page-sidebar-menu">
                    <ul className="accordion-menu">
                        <li>
                            <NavLink exact={true} to="/" activeClassName="active-page">
                                <i className="menu-icon icon-home4" /><span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/wedding-dress" activeClassName="active-page">
                                <i className="menu-icon icon-info_outline" /><span>Áo cưới</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/wedding-album" activeClassName="active-page">
                                <i className="menu-icon icon-info_outline" /><span>Chụp hình</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/form" activeClassName="active-page">
                                <i className="menu-icon icon-info_outline" /><span>Mâm quả ngày cưới</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/wedding-invitation" activeClassName="active-page">
                                <i className="menu-icon icon-info_outline" /><span>Thiệp cưới</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/form" activeClassName="active-page">
                                <i className="menu-icon icon-info_outline" /><span>Trang trí nhà</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/wedding-venue" activeClassName="active-page">
                                <i className="menu-icon icon-info_outline" /><span>Nhà hàng tiệc cưới</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/wedding-car" activeClassName="active-page">
                                <i className="menu-icon icon-info_outline" /><span>Xe cưới</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/booking" activeClassName="active-page">
                                <i className="menu-icon icon-info_outline" /><span>Travel, Resort, Hotel</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}

import React from "react";
import adminLogo from '../assets/applogo.png';

export default function Navbar() {
  return (
    <nav className="main-header navbar navbar-expand-md navbar-white navbar-light">
      {/* <!-- Left navbar links --> */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="fullscreen"
            href="#"
            role="button"
          >
            <i className="fas fa-expand-arrows-alt"></i>
          </a>
        </li>
      </ul>

      {/* <!-- Right navbar links --> */}
      <ul className="navbar-nav ml-auto">
	  <li className="nav-item dropdown user-menu">
            <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                <img src={adminLogo} className="user-image img-circle elevation-2"
                    alt="User Image" />
                <span className="d-none d-md-inline">Administrator</span>

            </a>
            <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                
                <li className="user-header">
                    <img src={adminLogo} className="img-circle elevation-2"
                        alt="Administrator" />

                    <p>Administrator<small></small></p>
                </li>

                
                <li className="user-footer">
                    {/* <a href="#change" data-toggle="modal" id="admin_profile" className="btn btn-default btn-flat"><i
                            className="fas fa-gear"></i></a> */}

                    <a href="/admin" className="btn btn-default btn-flat float-right">Log out</a>
                </li>
            </ul>
        </li>
        
      </ul>
    </nav>
  );
}

import React from "react";
import appLogo from '../assets/applogo.png';

export default function Menubar({ data }) {
  return (
    <div>
      {/* <!-- Main Sidebar Container --> */}
      <aside className="main-sidebar sidebar-light-primary elevation-4">
        {/* <!-- Brand Logo --> */}
        <a href="/admin/home" className="brand-link">
          <img
            src={appLogo}
            alt="Soil Liquefaction"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">Soil Liquefaction</span>
        </a>

        {/* <!-- Sidebar --> */}
        <div className="sidebar">
          {/* <!-- Sidebar user panel (optional) --> */}
          <br />

          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* <!-- Dashboard --> */}

              <li className="nav-item">
                <a href="/admin/home" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </a>
              </li>

              <li className="nav-item">
                <a href="/admin/administrator" className="nav-link">
                  <i className="nav-icon fas fa-user-secret"></i>
                  <p>Administrators</p>
                </a>
              </li>

              <li className="nav-item">
                <a href="/admin/barangay" className="nav-link">
                  <i className="nav-icon fas fa-map-location-dot"></i>
                  <p>Barangay</p>
                </a>
              </li>

              <li className="nav-item">
                <a href="/admin/about" className="nav-link">
                  <i className="nav-icon fas fa-circle-info"></i>
                  <p>About</p>
                </a>
              </li>

              <li className="nav-item">
                <a href="/" className="nav-link">
                  <i className="nav-icon fas fa-right-from-bracket"></i>
                  <p>Go to Landing Page</p>
                </a>
              </li>


              {/* {data.map((link) => {
                return (
                  <li className="nav-item">
                    <a href="/" className="nav-link">
                      <i className="nav-icon fas fa-tachometer-alt"></i>
                      <p>{link}</p>
                    </a>
                  </li>
                );
              })} */}

              
            </ul>
          </nav>
          {/* <!-- /.sidebar-menu --> */}
        </div>
        {/* <!-- /.sidebar --> */}
      </aside>
    </div>
  );
}

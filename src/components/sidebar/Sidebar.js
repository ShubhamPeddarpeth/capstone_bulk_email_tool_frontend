import React from "react";
import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

function Sidebar() {
  return (
    <>
      <input id="menu__toggle" type="checkbox" />
      <label className="menu__btn" htmlFor="menu__toggle">
        <span></span>
      </label>
      <nav className="sidebar">
        <header>
          <div className="image-text">
            <span className="image">
              <img src={require("../../assests/logo.png")} alt="" />
            </span>

            <div className="text logo-text">
              <span className="name">BulkEmailTool</span>
            </div>
          </div>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link">
                {/* <a href='#'> */}
                <Link to="/">
                  <i className="fa-sharp fa-solid fa-gauge-high icon"></i>
                  <span className="text nav-text">Dashboard</span>
                </Link>
                {/* </a> */}
              </li>

              <li className="nav-link">
                <Link to="/mailer">
                  {/* <i className='bx bx-bar-chart-alt-2 icon'></i> */}
                  <i className="fa-sharp fa-solid fa-envelopes-bulk icon"></i>
                  <span className="text nav-text">Mailer</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/groups">
                  <i className="fa-sharp fa-solid fa-user-group icon"></i>
                  <span className="text nav-text">Groups</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/sentdetails">
                  <i className="fa-sharp fa-solid fa-paper-plane icon"></i>
                  <span className="text nav-text">Sent</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/templates">
                  <i className="fa-solid fa-table-columns icon"></i>
                  <span className="text nav-text">Templates</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
    // </div>
  );
}

export default Sidebar;

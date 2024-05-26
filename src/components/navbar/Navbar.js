import React from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

function Navbar() {
  return (
    <div className='top-nav'>
      <div className='user-profile'>
        <img src={require("../../assests/user.png")} alt='User profile' />
        <div className='user-dropdown'>
          {/* <Link to='#'>
            <div className='nav-items'>
              <i className='fa-sharp fa-solid fa-user' />
              Profile
            </div>
          </Link> */}
          <Link to='/logout'>
            <div className='nav-items'>
              <i className='fa-sharp fa-solid fa-right-from-bracket' />
              Logout
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

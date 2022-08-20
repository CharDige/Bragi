import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/header.css'

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg nav-colour">
        <div className="container-fluid">
          <Link className="navbar-brand brand-style" to="/">Bragi</Link>
          <button className="navbar-toggler nav-button-style" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span>Menu</span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="nav column-style">
              <li className="nav-item">
                <Link className="nav-link nav-item-style" to="/">Explore stories</Link>
              </li>
              {Auth.loggedIn() ? (
                <>
                  <li className="nav-item nav-item-style">
                    <Link className="nav-link" to="/profile">Profile</Link>
                  </li>
                  <li className="nav-item nav-item-style">
                    <button className="btn btn-lg btn-light m-2" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link className="nav-link nav-item-style" to="/login">Login</Link>
                  </li>
                  <li>
                    <Link className="nav-link nav-item-style" to="/signup">Sign up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = sessionStorage.getItem('auth-token');
    const storedName = sessionStorage.getItem('name');

    if (authToken) {
      setIsLoggedIn(true);
      if (storedName) {
        setUserName(storedName);
      }
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, [setIsLoggedIn, setUserName]);

  const handleLogout = () => {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    setIsLoggedIn(false);
    navigate('/app');
  };

  const goToProfile = () => {
    navigate('/app/profile');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">GiftLink</Link>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/home.html">Home</a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/app">Gifts</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/app/search">Search</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <span className="nav-link" style={{ color: 'black', cursor: 'pointer' }} onClick={goToProfile}>
                  Welcome, {userName}
                </span>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/app/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/app/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

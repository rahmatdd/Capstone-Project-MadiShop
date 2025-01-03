import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const navbarRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const toggleNavbar = () => {
    setIsNavbarCollapsed((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        !isNavbarCollapsed
      ) {
        setIsNavbarCollapsed(true);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isNavbarCollapsed]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top" ref={navbarRef}>
      <div className="container">
        <NavLink className="navbar-brand" to="/">MadiShop</NavLink>

        <button
          className="navbar-toggler"
          type="button"
          aria-expanded={!isNavbarCollapsed}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div 
          className={`collapse navbar-collapse ${!isNavbarCollapsed ? 'show' : ''}`} 
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink 
                className="nav-link"
                style={({ isActive }) =>
                  isActive ? { borderBottom: '2px solid #0d6efd', color: '#0d6efd' } : {}
                }
                to="/" 
                onClick={() => setIsNavbarCollapsed(true)}
              >
                Beranda
              </NavLink>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink 
                    className="nav-link"
                    style={({ isActive }) =>
                      isActive ? { borderBottom: '2px solid #0d6efd', color: '#0d6efd' } : {}
                    }
                    to="/cart" 
                    onClick={() => setIsNavbarCollapsed(true)}
                  >
                    Keranjang 
                    {cartItems.length > 0 && (
                      <span className="badge bg-danger ms-1">
                        {cartItems.length}
                      </span>
                    )}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link"
                    style={{ color: 'inherit' }}
                    onClick={() => {
                      handleLogout();
                      setIsNavbarCollapsed(true);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink 
                  className="nav-link"
                  style={({ isActive }) =>
                    isActive ? { borderBottom: '2px solid #0d6efd', color: '#0d6efd' } : {}
                  }
                  to="/login" 
                  onClick={() => setIsNavbarCollapsed(true)}
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

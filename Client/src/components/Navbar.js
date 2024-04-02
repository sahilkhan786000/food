import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import Badge from 'react-bootstrap/Badge';
import { useCart } from './ContextReducer';
import './style.css';

export default function Navbar() {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State to manage dialog visibility
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">Food_Azal</Link>
        <button className="navbar-toggler" type="button" onClick={() => setDialogOpen(!dialogOpen)} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      {dialogOpen && (
  <div className="dialog-container">
    <div className="dialog-content">
      <ul className="navbar-nav flex-column">
        <li className="nav-item">
          <Link className="nav-link active fs-5" to="/">Home</Link>
        </li>
        {localStorage.getItem("authToken") ? (
          <React.Fragment>
            <li>
              <div className="d-flex flex-direction-column align-items-center">
                <div className="btn bg-white text-success mx-1" onClick={() => setCartView(true)}>
                  My Cart{"  "}
                  <Badge pill bg="danger"> {data.length} </Badge>
                </div>
                <div className="btn bg-white text-danger mx-1" onClick={handleLogOut}> Logout </div>
              </div>
            </li>
            <li>
            <Link className="btn bg-white text-success mx-1" to="/createuser">My Order</Link>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li>
            <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
            
            </li>
            <li>
            <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </div>
  </div>
)}


      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {/* Links */}
        </ul>

        {localStorage.getItem("authToken") ? (
          <div className="d-flex align-items-center">
            <div className="btn bg-white text-success mx-1" onClick={() => setCartView(true)}>
              My Cart{"  "}
              <Badge pill bg="danger"> {data.length} </Badge>
            </div>
            <div className="btn bg-white text-danger mx-1" onClick={handleLogOut}> Logout </div>
          </div>
        ) : (
          <div className='d-flex'>
            <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
            <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
          </div>
        )}
      </div>

      {cartView && <Modal onClose={() => { setCartView(false) }}><Cart /></Modal>}
    </nav>
  );
}

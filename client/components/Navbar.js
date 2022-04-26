import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout,setGuestCart } from '../store';
import auth from '../store/auth';


const Navbar = ({ handleClick, isLoggedIn, userInfo }) => (
  <div>
    <header>
        <img src="https://i.ibb.co/rkVtJL6/image.png" className="logo" />
        <h1>The Market for Bread Stapled to Trees</h1>
      {isLoggedIn ? (
        <div>
          <Link to={`/userpage/${userInfo.id}`}>
          <img src={userInfo.imageUrl} className="usericon"/>
          </Link>
            <h3>
              {/* The navbar will show these links after you log in */}
              <Link to="/"><h3>Home</h3></Link>
              <Link to={`/userpage/${userInfo.id}`}><h3>Userpage</h3></Link>
              <Link to={`/order`}><h3>Shopping Cart</h3></Link>
            </h3>
            <Link to="/"><p href="#" onClick={handleClick}>Logout</p></Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <h3>          
          <Link to="/">Home</Link>
          <Link to={`/order`}>Shopping Cart</Link>
          </h3>
          <p>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      )}
    </header>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    userInfo: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
      if(localStorage.getItem("cart")) dispatch(setGuestCart(JSON.parse(localStorage.getItem("cart")))) //sets the guest cart on logout
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

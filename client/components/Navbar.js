import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout,setGuestCart } from '../store';
import auth from '../store/auth';


const Navbar = ({ handleClick, isLoggedIn, userInfo }) => (
  <div>
    <header>
      <h1>The Market of Bread Stapled to Trees</h1>
        <img src="https://i.ibb.co/rkVtJL6/image.png" className="logo" />

        <Link to={`/userpage/${userInfo.id}`}>
        <img src={userInfo.imageUrl} className="usericon"/>
        </Link>
      {isLoggedIn ? (
        <div>
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/">Home</Link>
            <Link to={`/userpage/${userInfo.id}`}>Userpage</Link>
            <Link to={`/order`}>Shopping Cart</Link>
            

            <a href="#" onClick={handleClick}>Logout</a>
          </div>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
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

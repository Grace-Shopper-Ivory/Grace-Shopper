import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout,setGuestCart } from '../store';
import auth from '../store/auth';

const Navbar = ({ handleClick, isLoggedIn, userInfo }) => (
  <div>
    {isLoggedIn ? (
      <div className='nav'>
        <div className='top'>
          {/* The navbar will show these links after you log in */}
          <img src="https://i.ibb.co/rkVtJL6/image.png" className="logo"/>
          <h1>The Market for Bread <br/>Stapled to Trees</h1>         
          <Link to={`/userpage/${userInfo.id}`}>
            <img src={userInfo.imageUrl} className="usericon"/>
          </Link>
        </div>
        <div className='bar'>
        {userInfo.admin ? (
        <Link to={`/adminpage/${userInfo.id}`}><p>Admin Page</p></Link> 
        ):''}
            <Link to="/"><p>home</p></Link>
            <Link to={`/userpage/${userInfo.id}`}><p>userpage</p></Link>
            <Link to={`/order`}><p>shopping cart</p></Link>
            <Link to="/" href="#" onClick={handleClick}><b>logout</b></Link>
        </div>
      </div>
    ) : (
      <div className='nav'>
        <div className='top'>
          {/* The navbar will show these links before you log in */}

          <img src="https://i.ibb.co/rkVtJL6/image.png" className="logo"/>
          <h1>The Market for Bread <br/>Stapled to Trees <br/> welcome guest</h1>
          <img src="https://i.ibb.co/rkVtJL6/image.png" className="logo"/>
        </div>
        <div className='bar'>
          <Link to="/"><p>home</p></Link>
          <Link to={`/order`}><p>shopping cart</p></Link>
          <Link to="/login"><p>login</p></Link>
          <Link to="/signup"><p>sign up</p></Link>
        </div>
      </div>
    )}
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
      if (localStorage.getItem("cart"))
        dispatch(setGuestCart(JSON.parse(localStorage.getItem("cart")))); //sets the guest cart on logout
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

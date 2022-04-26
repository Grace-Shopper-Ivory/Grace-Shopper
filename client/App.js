
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { setGuestCart } from "./store";


import Navbar from './components/Navbar'
import Routes from './Routes'
//import auth from './store/auth';


const App = () => {
  const dispatch = useDispatch()


  useEffect(()=>{ //sets the guest cart when you navigate to the site without it being logged in
    if(localStorage.getItem("cart") && !localStorage.getItem("token")){
      dispatch(setGuestCart(JSON.parse(localStorage.getItem("cart"))))
    }
  },[])

  return (
    <div id="site">
      <Navbar />
      <Routes />
    </div>
  )
}
// const mapState = (state) => {
//   return {
//     //isLoggedIn: !!state.auth.id,
//     userInfo: state.auth,
//   };
// };

export default App

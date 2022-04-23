import React, {useState,useEffect} from "react";
import { useDispatch } from "react-redux";
import { setGuestCart } from "./store";
import Navbar from './components/Navbar'
import Routes from './Routes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(()=>{ //sets the guest cart when you navigate to the site without it being logged in
    if(localStorage.getItem("cart") && !localStorage.getItem("token")){
      dispatch(setGuestCart(JSON.parse(localStorage.getItem("cart"))))
    }
  },[])

  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App

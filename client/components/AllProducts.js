import React, {useState,useEffect} from "react";
import { connect,useDispatch,useSelector } from "react-redux";
import product, { fetchProducts, addToCart } from "../store/products";
import { Link } from "react-router-dom";


function AllProducts(){
  const dispatch = useDispatch()
  let amount = {}

  const productsArr = useSelector((state=>state.products))
  const guestCart = useSelector((state=>state.guestCart))
  const userInfo = useSelector((state=>state.auth))


  useEffect(()=>{
    dispatch(fetchProducts())
  },[])

  const handleAddToCart= async (product)=>{
    if(localStorage.getItem("token")){
      console.log('USER LOGGED IN')
      const toCart = {
        userId: userInfo.id,
        productId: product.id,
        quantity: product.quantity,
        price: product.price
      }
      dispatch(addToCart(toCart))
    }else{
      if(amount[product.id]){
        dispatch(addToGuestCart(product.id,amount[product.id]))
      }else{
        dispatch(addToGuestCart(product.id,1))
      }
    }
  }

  const changeAmount=(product,targetAmount)=>{
    amount[product]=targetAmount
  }

  return(
    <div id="all-products">
        {!productsArr.length ? "" : productsArr.map((product) => (
              <div key={product.id}>
                <Link to={`/products/${product.id}`} className="products">
                  <h2>{product.name}</h2>
                  <img src={product.img} />
                </Link>
                <div>
                  <p>{product.quantity>0 ? `in stock` : `out of stock`}</p>
                  <input type="number" min="1" max={product.quantity} size="2" onChange={(event)=>{changeAmount(product.id,Number(event.target.value))}}></input>
                  <button type="button" onClick={()=>handleAddToCart(product)}>add to cart</button>
                </div>
              </div>
            ))}
      </div>
  )
}
export default AllProducts

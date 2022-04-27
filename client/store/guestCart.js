import axios from "axios";

const SET_GUESTCART = 'SET_GUESTCART';
const ADD_TO_GUESTCART = 'ADD_TO_GUESTCART'
const DELETE_FROM_GUESTCART = 'DELETE_FROM_GUESTCART'
const EDIT_GUESTCART = 'EDIT_GUESTCART'

export const setGuestCart = (guestCart) => {
  return {
    type: SET_GUESTCART,
    guestCart,
  };
};

export const addToGuestCart = (guestCartItem) => {
  return {
    type: ADD_TO_GUESTCART,
    guestCartItem
  }
}

export const deleteFromGuestCart = (guestCartItemId) => {
  return {
    type: DELETE_FROM_GUESTCART,
    guestCartItemId
  }
}

export const editGuestCart = (guestCartItemId,guestCartItemAmount)=>{
  return{
    type: EDIT_GUESTCART,
    guestCartItemId,
    guestCartItemAmount,
  }
}

export const guestCheckout  = (guestCart,history) => {
  return async (dispatch) => {
    try{
        await axios.post("api/order/guest",guestCart)
        localStorage.setItem("cart",[])
        dispatch(setGuestCart([]))
        history.push('/confirmation')
    } catch(err) {
      console.log("ERROR",err)
    }
  }
}

export default function guestCart(state = [], action) {
  let guestCart
  switch (action.type) {
    case SET_GUESTCART:
      return [...action.guestCart];

    case ADD_TO_GUESTCART:
      let duplicateCheck = false
      guestCart = state.map((elem)=>{
        if(elem.productId===action.guestCartItem.productId){
          duplicateCheck = true
          return{...elem,amount: elem.amount+=action.guestCartItem.amount}
        }else{return elem}
      })
      if(!duplicateCheck){
        guestCart.push(action.guestCartItem)
      }
      localStorage.setItem("cart",JSON.stringify(guestCart))
      return guestCart

    case DELETE_FROM_GUESTCART:
      guestCart = state.filter((elem)=>{
        if(elem.productId===action.guestCartItemId){
          return false
        }else{return true}
      })
      localStorage.setItem("cart",JSON.stringify(guestCart))
      return guestCart

    case EDIT_GUESTCART:
      guestCart = state.map((elem)=>{
        if(elem.productId===action.guestCartItemId){
          return {...elem,amount:action.guestCartItemAmount}
        }else{return elem}
      })
      localStorage.setItem("cart",JSON.stringify(guestCart))
      return guestCart
      

    default:
      return state;
  }
}

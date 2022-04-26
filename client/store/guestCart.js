const SET_GUESTCART = 'SET_GUESTCART';
const ADD_TO_GUESTCART = 'ADD_TO_GUESTCART'
const DELETE_FROM_GUESTCART = 'DELETE_FROM_GUESTCART'

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

export default function guestCart(state = [], action) {
  let guestCart
  switch (action.type) {
    case SET_GUESTCART:
      return [...action.guestCart];

    case ADD_TO_GUESTCART:
      let duplicateCheck = false
      guestCart = state.map((elem)=>{
        console.log(elem.productId,":",action.guestCartItem.productId)
        if(elem.productId===action.guestCartItem.productId){
          console.log("MATCH")
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

    default:
      return state;
  }
}

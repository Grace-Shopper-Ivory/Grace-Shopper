const SET_GUESTCART = 'SET_GUESTCART';
const ADD_TO_GUESTCART = 'ADD_TO_GUESTCART'
const DELETE_FROM_GUESTCART = 'DELETE_FROM_GUESTCART'

export const setGuestCart = (guestCart) => {
  return {
    type: SET_GUESTCART,
    guestCart,
  };
};

export const addToGuestCart = (guestCartItemId,guestCartItemamount) => {
  return {
    type: ADD_TO_GUESTCART,
    guestCartItemId,
    guestCartItemamount
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
        if(elem.productId===action.guestCartItemId){
          duplicateCheck = true
          return{...elem,amount: elem.amount+=action.guestCartItemamount}
        }else{return elem}
      })
      if(!duplicateCheck){
        guestCart.push({productId: action.guestCartItemId, amount: action.guestCartItemamount})
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

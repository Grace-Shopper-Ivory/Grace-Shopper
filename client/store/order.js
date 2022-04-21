import axios from 'axios';

const SET_ORDER = 'SET_ORDER';

export const setOrder = (order) => {
    return {
      type: SET_ORDER,
      cart,
    };
  };
  
  export const fetchOrder = (id) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`/api/orders/${id}`);
        dispatch(setCart(data));
      } catch (err) {
        console.log('ERROR', err);
      }
    };
  };
  
  export default function products(state = [], action) {
    switch (action.type) {
      case SET_ORDER:
        return { cartOrder: action.order.cartItems };
      default:
        return state;
    }
  }
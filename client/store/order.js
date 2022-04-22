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
        const { data } = await axios.get(`/api/order/${id}`);
        dispatch(setCart(data));
      } catch (err) {
        console.log('ERROR', err);
      }
    };
  };

  export default function products(state = [], action) {
    switch (action.type) {
      case SET_ORDER:
        return {
          userInfo: action.info,
          cartInfo: action.info.cartItems,
          orderInfo: action.info.orders,
        };
      default:
        return state;
    }
  }

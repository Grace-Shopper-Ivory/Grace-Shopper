import axios from 'axios';

const SET_PRODUCTS = 'SET_PRODUCTS';


export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('api/products');
      dispatch(setProducts(data));
    } catch (err) {
      console.log('ERROR', err);
    }
  };
};


export const addToCart = (cart) => {
  return async (dispatch) => {
    try {
      console.log("this is the addto cart", cart)
      await axios.post(`api/order/${cart.productId}/${cart.userId}`, cart)
    } catch (error) {
      console.log('ERROR', error);
    }
  }
}

export default function products(state = [], action) {
  console.log(action);
  switch (action.type) {
    case SET_PRODUCTS:
      return [...action.products];
    default:
      return state;
  }
}
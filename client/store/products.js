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

// let initialState = {
//   products: [],
//   product: {},
// };

export default function product(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return [...action.products];
    default:
      return state;
  }
}

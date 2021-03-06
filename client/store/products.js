import axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      dispatch(setProducts(data));
    } catch (err) {
      console.log("ERROR", err);
    }
  };
};

export const addToCart = (cart) => {
  return async (dispatch) => {
    try {
      await axios.post(`api/order/${cart.productId}/${cart.userId}`, cart);
      await axios.put(`api/products/${cart.productId}`, cart);
    } catch (error) {
      console.log("ERROR", error);
    }
  };
};

export default function products(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return [...action.products];
    default:
      return state;
  }
}

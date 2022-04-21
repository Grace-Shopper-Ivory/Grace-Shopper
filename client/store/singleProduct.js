import axios from "axios";

const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";

export const setSingleProduct = (singleProduct) => {
  return {
    type: SET_SINGLE_PRODUCT,
    singleProduct,
  };
};

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(setSingleProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function singleProduct(state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.singleProduct;
    default:
      return state;
  }
}

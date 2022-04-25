import axios from "axios";

const SET_ORDER = "SET_ORDER";
const UPDATE_ORDER = "UPDATE_ORDER";

export const setOrder = (order) => {
  return {
    type: SET_ORDER,
    order,
  };
};

// export const updateOrder = (order) => {
//   return {
//     type: UPDATE_ORDER,
//     order,
//   };
// };

export const fetchOrder = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/order/${id}`);
      dispatch(setOrder(data));
    } catch (err) {
      console.log("ERROR", err);
    }
  };
};

export const editOrder = (orderId, productId, amount) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/order/${orderId}/${productId}`, { amount });
      dispatch(fetchOrder(orderId));
    } catch (err) {
      console.log("ERROR", err);
    }
  };
};

export default function products(state = {}, action) {
  switch (action.type) {
    case SET_ORDER:
      return {
        order: action.order,
      };

    default:
      return state;
  }
}

import axios from "axios";

const SET_ALL_ORDERS = "SET_ALL_ORDERS";

export const setAllOrders = (orders) => {
  return {
    type: SET_ALL_ORDERS,
    orders,
  };
};

export const fetchAllOrders = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/order");
      dispatch(setAllOrders(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function allOrders(state = [], action) {
  switch (action.type) {
    case SET_ALL_ORDERS:
      return action.orders;
    default:
      return state;
  }
}

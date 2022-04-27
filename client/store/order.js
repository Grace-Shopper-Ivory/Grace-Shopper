import axios from "axios";
import { fetchInfo } from "./info";

let intialState = {};

const SET_ORDER = "SET_ORDER";
const DELETE_ORDER = "DELETE_ORDER";

export const _deleteOrder = (order) => {
  return {
    type: DELETE_ORDER,
    order,
  };
};

export const setOrder = (order) => {
  return {
    type: SET_ORDER,
    order,
  };
}

export const fetchOrder = (id) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`/api/order/${id}`);
        dispatch(setOrder(data));
      } catch (err) {
        console.log('ERROR', err);
      }
    };
  };

export const deleteOrder = (productId, userId) => {
  return async (dispatch) => {
    try {
      const { data: order } = await axios.delete(
        `/api/order/${productId}/${userId}`
      );
      dispatch(fetchInfo(userId));
      dispatch(fetchOrder(userId));
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

export const addToCart = (cart) => {
  return async (dispatch) => {
    try {
      await axios.post("api/order", cart);
    } catch (error) {
      console.log("ERROR", err);
    }
  }
}

  export const checkout = (userId, history) => {
    return async (dispatch) => {
      try {
        await axios.put(`/api/order/${userId}`);
        dispatch(fetchOrder(userId))
        history.push('/confirmation')
      } catch (error) {
        console.log('ERROR', err);
      }
    }
  }

  export default function products(state = intialState, action) {
    switch (action.type) {
      case SET_ORDER:
        return action.order
      default:
        return state;
    }
  }


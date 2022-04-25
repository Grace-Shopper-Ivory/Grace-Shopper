import axios from 'axios';
import { fetchInfo } from './info';

let intialState = {}

const SET_ORDER = 'SET_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';


export const _deleteOrder = (order) => {
  return {
    type: DELETE_ORDER,
    order,
  }
}

export const setOrder = (order) => {
    return {
      type: SET_ORDER,
      order,
    };
  };

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
        console.log(productId, userId)
        const {data: order } = await axios.delete(`/api/order/${productId}/${userId}`)
        console.log(order)
        // await order.destroy();
        dispatch(fetchInfo(userId));
        // dispatch(_deleteOrder(order))
      } catch (err) {
        console.log('ERROR', err);
      }
    }
  }

  export default function products(state = intialState, action) {
    console.log(state)
    switch (action.type) {
      case SET_ORDER:
        return {
          order: action.order,
        };
      case DELETE_ORDER:
        return {
          productInfo: state.info.productInfo.filter((product) => {
            product.order.OrderId !== action.order.OrderId
          })
        };
      default:
        return state;
    }
  }

import axios from 'axios';

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
        const { data: order } = await axios.delete(`/api/order/${productId}/${userId}`)
        console.log(order)
        // await order.destroy();
        dispatch(_deleteOrder(order))
      } catch (err) {
        console.log('ERROR', err);
      }
    }
  }

  // let intialState = {
  //   order: [],
  // };

  export default function products(state = {}, action) {
    switch (action.type) {
      case SET_ORDER:
        return {
          order: action.order,
        };
      case DELETE_ORDER:
        return {
          order: state.order.order.products.filter((product) => product.order.id !== action.order.orderId)
        }
      default:
        return state;
    }
  }

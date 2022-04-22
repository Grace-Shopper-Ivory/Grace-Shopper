import axios from 'axios';

const SET_ORDER = 'SET_ORDER';

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

  // let intialState = {
  //   order: [],
  // };

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

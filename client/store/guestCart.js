import axios from 'axios';

const SET_GUESTCART = 'SET_GUESTCART';

export const setGuestCart = (guestCart) => {
  return {
    type: SET_GUESTCART,
    guestCart,
  };
};

export default function guestCart(state = [], action) {
  switch (action.type) {
    case SET_GUESTCART:
      return [...action.guestCart];
    default:
      return state;
  }
}

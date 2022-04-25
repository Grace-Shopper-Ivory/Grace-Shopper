import axios from "axios";

const SET_INFO = "SET_INFO";

let intialState = {};

export const setInfo = (info) => {
  return {
    type: SET_INFO,
    info,
  };
};

export const fetchInfo = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/info/${id}`);
      dispatch(setInfo(data));
    } catch (err) {
      console.log("ERROR", err);
    }
  };
};

export default function products(state = intialState, action) {
  switch (action.type) {
    case SET_INFO:
      return {
        userInfo: action.info,
        ProductInfo: action.info.products,
      };
    default:
      return state;
  }
}

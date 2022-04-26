import axios from "axios";

const SET_ALL_USERS = "SET_ALL_USERS";

export const setAllUsers = (users) => {
  return {
    type: SET_ALL_USERS,
    users,
  };
};

export const fetchAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/info");
      dispatch(setAllUsers(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function users(state = [], action) {
  switch (action.type) {
    case SET_ALL_USERS:
      return action.users;
    default:
      return state;
  }
}

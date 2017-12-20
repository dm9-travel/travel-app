import axios from "axios";
// Action Constants
const REQ_USER = "REQ_USER";
const GET_WATCHLIST = "GET_WATCHLIST";
const GET_LOCATION = "GET_LOCATION";

// Action Creators

// Initial State
const initialState = {
  user: {},
  watchlist: [],
  user_location: {}
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case REQ_USER + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REQ_USER + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });
    case GET_LOCATION:
      console.log(action.payload);
      return Object.assign({}, state, {
        isLoading: false,
        user_location: action.payload
      });

    case GET_WATCHLIST:
      return Object.assign({}, state, { watchlist: action.payload });

    default:
      return state;
  }
}

export function requestUser() {
  return {
    type: REQ_USER,
    payload: axios.get("/api/me").then(response => response.data)
  };
}
export function getWatchlist(user_id) {
  return {
    type: GET_WATCHLIST,
    payload: axios
      .get(`/api/getWatchlist/${user_id}`)
      .then(response => {
        console.log(response);
        return response.data;
      })
      .catch(err => err)
  };
}
export function getLocation(location) {
  console.log("receiving state", location);
  return {
    type: GET_LOCATION,
    payload: location
  };
}

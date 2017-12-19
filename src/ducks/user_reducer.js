import axios from "axios";
// Action Constants
const REQ_USER = "REQ_USER";
const GET_WATCHLIST = "GET_WATCHLIST";

// Action Creators

// Initial State
const initialState = {
  user: {},
  watchlist: []
};

// axios call to get locations/destinations/longitude and lattitude of search results
// export function getLocations() {
//   return {
//     type: GET_LOCATIONS,
//     payload:
//   }
// }

export default function users(state = initialState, action) {
  switch (action.type) {
    case REQ_USER + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REQ_USER + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
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

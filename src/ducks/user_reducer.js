import axios from "axios";
// Action Constants
const REQ_USER = "REQ_USER";
const GET_WATCHLIST = "GET_WATCHLIST";
const GET_LOCATION = "GET_LOCATION";
const LOCK_USER = "LOCK_USER";
const LOGOUT = "LOGOUT";
const SEND_BUDGET = "SEND_BUDGET";

// Action Creators

// Initial State
const initialState = {
  currentUser: {},
  watchlist: [],
  userLocation: {
    airport: {
      PlaceName: "DFW"
    }
  },
  budget: null
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case REQ_USER + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REQ_USER + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        currentUser: action.payload
      });
    case GET_LOCATION:
      return Object.assign({}, state, {
        isLoading: false,
        userLocation: action.payload
      });

    case GET_WATCHLIST:
      return Object.assign({}, state, { watchlist: action.payload });
    case LOCK_USER:
      return Object.assign({}, state, { currentUser: action.payload });
    case LOGOUT:
      return Object.assign({}, state, {
        currentUser: action.payload
      });
    case SEND_BUDGET:
      return Object.assign({}, state, {budget: action.payload});
    default:
      return state;
  }
}

export function requestUser() {
  return {
    type: REQ_USER,
    payload: axios.get("/api/me").then(response => {console.log(response.data); return response.data})
  };
}
export function getWatchlist(user_id) {
  return {
    type: GET_WATCHLIST,
    payload: axios
      .get(`/api/getWatchlist/${user_id}`)
      .then(response => {
        console.log("reducer response:",response.data);
        return response.data;
      })
      .catch(err => err)
  };
}
export function getLocation(location) {
  return {
    type: GET_LOCATION,
    payload: location
  };
}
export function lockUser(user) {
  return {
    type: LOCK_USER,
    payload: user
  };
}
export function logout() {
  return {
    type: LOGOUT,
    payload: {}
  };
}
export function sendBudget(budget){
  return {
    type: SEND_BUDGET,
    payload: budget
  }
}

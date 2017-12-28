import axios from "axios";

//Action Constants

const GET_FLIGHTS = "GET_FLIGHTS";
const SELECTED_FLIGHT = "SELECTED_FLIGHT";
const ADD_TO_WATCHLIST = "ADD_TO_WATCHLIST";

const initialState = {
  flights: [],
  selectedFlight: {},
  trips:[]
};
export default function flights(state = initialState, action) {
  switch (action.type) {
    case GET_FLIGHTS + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case GET_FLIGHTS + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        flights: action.payload
      });
    case SELECTED_FLIGHT:
      return Object.assign({}, state, {
        selectedFlight: action.payload
      });
    case ADD_TO_WATCHLIST:
      return Object.assign({},state,{
        trips: action.payload
      });
    default:
      return state;
  }
}

export function getFlights(searchInfo) {
  console.log("hit flight reducer", searchInfo);
  return {
    type: GET_FLIGHTS,
    payload: axios
      .post(`/api/getFlights`, searchInfo)
      .then(response => {
        return response.data;
      })
      .catch(err => err)
  };
}
export function selectFlight(flight) {
  return {
    type: SELECTED_FLIGHT,
    payload: flight
  };
}
export function addToWatchlist(trip) {
  return {
    type: ADD_TO_WATCHLIST,
    payload: axios.post(`/api/addTrip`,trip)
  };
}

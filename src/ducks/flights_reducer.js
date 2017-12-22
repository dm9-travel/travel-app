import axios from "axios";

//Action Constants

const GET_FLIGHTS = "GET_FLIGHTS";
const SELECTED_FLIGHT = "SELECTED_FLIGHT";
const SET_SEARCH_TERMS = "SET_SEARCH_TERMS";
const FILTER_FLIGHTS = "FILTER_FLIGHTS";

const initialState = {
  flights: [],
  selectedFlight: {},
  searchTerms: {}
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
    case SET_SEARCH_TERMS:
      return Object.assign({}, state, {searchTerms: action.payload})
    case FILTER_FLIGHTS:
      {
        var flightsCopy = state.flights;
        flightsCopy.filter(flight => flight.destinationObj.CountryName == action.payload)
        return Object.assign({}, state, {flights: flightsCopy})
      }
    default:
      return state;
  }
}
export function filterFlights(country) {
  return {
    type: FILTER_FLIGHTS,
    payload: country
  }
}
export function setSearch(obj) {
  return {
    type: SET_SEARCH_TERMS,
    payload: obj
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

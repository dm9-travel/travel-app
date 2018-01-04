import axios from "axios";
import { stat } from "fs";

//Action Constants

const GET_FLIGHTS = "GET_FLIGHTS";
const SELECTED_FLIGHT = "SELECTED_FLIGHT";
const ADD_TO_WATCHLIST = "ADD_TO_WATCHLIST";
const SET_SEARCH_TERMS = "SET_SEARCH_TERMS";
const FILTER_FLIGHTS = "FILTER_FLIGHTS";
const FLIGHT_COORDS = "FLIGHT_COORDS";
const UNFILTER = "UNFILTER"

const initialState = {
  flights: [],
  selectedFlight: {},
  trips:[],
  searchTerms: {},
  filteredFlights: [],
  coords: [],

};
export default function flights(state = initialState, action) {
  switch (action.type) {
    case GET_FLIGHTS + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case GET_FLIGHTS + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        flights: action.payload,
        filteredFlights: action.payload
      });
    case SELECTED_FLIGHT:
      return Object.assign({}, state, {
        selectedFlight: action.payload
      });
    case ADD_TO_WATCHLIST:
      return Object.assign({},state,{
        trips: action.payload
      });
    case SET_SEARCH_TERMS:
      return Object.assign({}, state, {searchTerms: action.payload})
    case FILTER_FLIGHTS:
      {
        var flightsCopy = [...state.filteredFlights];
        flightsCopy = flightsCopy.filter(flight => flight.destinationObj.CountryName == action.payload)
        return Object.assign({}, state, {filteredFlights: flightsCopy})
      }
    case FLIGHT_COORDS:
      return Object.assign({}, state, {coords: action.payload})
    case UNFILTER:
      return Object.assign({}, state, {filteredFlights: action.payload})
    default:
      return state;
  }
}
export function unfilterFlights(flights) {
  return {
    type: UNFILTER,
    payload: flights
  }
}
export function setCoords(coords) {
  return {
    type: FLIGHT_COORDS,
    payload: coords
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
export function addToWatchlist(trip) {
  return {
    type: ADD_TO_WATCHLIST,
    payload: axios.post(`/api/addTrip`,trip)
  };

}

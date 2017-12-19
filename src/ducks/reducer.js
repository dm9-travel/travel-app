import axios from "axios";
// Action Constants
const REQ_USER = "REQ_USER";
const GET_LOCATIONS = "GET_LOCATIONS";
// Action Creators

// Initial State
const initialState = {
  locationResults: [

  ],
};

// Reducer
export function requestUser() {
  return {
    type: REQ_USER,
    payload: axios.get("/api/me").then(response => response.data)
  };
}
// axios call to get locations/destinations/longitude and lattitude of search results
// export function getLocations() {
//   return {
//     type: GET_LOCATIONS,
//     payload: 
//   }
// }

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQ_USER + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REQ_USER + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });
    case GET_LOCATIONS:
      // this will need to be asynchronous once api responses are up and running
      return Object.assign({}, state, {locationResults: action.payload})
    default:
      return state;
  }
}

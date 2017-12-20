import axios from "axios";

//Action Constants

const GET_FLIGHTS = "GET_FLIGHTS";


const initialState = {
  flights: []
};
export default function flights(state = initialState, action) {
  switch (action.type) {
    case GET_FLIGHTS + "_PENDING":
      console.log(action.payload);
      return Object.assign({}, state, { isLoading: true });
    case GET_FLIGHTS + "_FULFILLED":
      console.log(action.payload);
      return Object.assign({}, state, {
        isLoading: false,
        flights: action.payload
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
        console.log(response.data);
        return response.data;
      })
      .catch(err => err)
  };
}



import axios from "../../API/axios";

// action will have a default dispatch method for sending the data to the reducer, and that dispatch is considered to be an action having two properties as type and payload

export const getSearchResults = (query) => async (dispatch) => {
  try {
    dispatch({ type: "SEARCH_RESULTS_REQUEST" }); // dispatching the search request

    const { data } = await axios.get(`/search?q=${query}`); //Getting the query as parameter and making the request

    dispatch({ type: "SEARCH_RESULTS_SUCCESS", payload: data }); //Once the request is success, dispatching the result success
  } catch (error) {
    dispatch({ type: "SEARCH_RESULTS_FAIL", payload: error });
  }
};
const initialState = {
    //Setting up initialState
    loading: false,
    result: [],
  };
  
  const searchResultsReducer = (state = initialState, action) => {
    switch (
      action.type //handling the switch case as per the action type
    ) {
      case "SEARCH_RESULTS_REQUEST":
        return { ...state, loading: true };
      case "SEARCH_RESULTS_SUCCESS":
        return { ...state, result: action.payload, loading: false };
      case "SEARCH_RESULTS_FAIL":
        return { ...state, result: [], loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default searchResultsReducer;
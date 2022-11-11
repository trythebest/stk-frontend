const initialState = {
    //Setting up initialState
    userDetails: null,
  };
  
  const currentUserDetailsReducer = (state = initialState, action) => {
    switch (
      action.type //handling the switch case as per the action type
    ) {
      case "USER_DETAILS_SUCCESS":
        return { ...state, userDetails: action.payload };
      default:
        return state;
    }
  };
  
  export default currentUserDetailsReducer;
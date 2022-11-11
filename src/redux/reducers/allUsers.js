const initialState = {
    //Setting up initialState
    loading: false,
    users: [],
  };
  
  export const allUsersReducer = (state = initialState, action) => {
    switch (
      action.type //handling the switch case as per the action type
    ) {
      case "GET_USERS_REQUEST":
        return { ...state, loading: true };
      case "GET_USERS_SUCCESS":
        return { ...state, loading: false, users: action.payload };
      case "GET_USERS_FAIL":
        return { ...state, loading: false, users: [], error: action.payload };
      default:
        return state;
    }
  };
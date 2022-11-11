const initialState = {
    //Setting up initialState
    loading: false,
    accessToken: sessionStorage.getItem("sof-access-token")
      ? sessionStorage.getItem("sof-access-token")
      : null,
    user: sessionStorage.getItem("sof-user") //Checking the session storage if the user is already logged in
      ? JSON.parse(sessionStorage.getItem("sof-user"))
      : null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (
      action.type //handling the switch case as per the action type
    ) {
      case "GOOGLE_AUTH_REQUEST":
        return { ...state, loading: true };
      case "GOOGLE_AUTH_SUCCESS":
        return {
          ...state,
          loading: false,
          accessToken: action.payload.accessToken,
          user: action.payload.profile,
        };
      case "GOOGLE_AUTH_FAIL":
        return {
          ...state,
          loading: false,
          accessToken: null,
          user: null,
          error: action.payload,
        };
      case "FACEBOOK_AUTH_REQUEST":
        return { ...state, loading: true };
      case "FACEBOOK_AUTH_SUCCESS":
        return {
          ...state,
          loading: false,
          accessToken: action.payload.accessToken,
          user: action.payload.profile,
        };
      case "FACEBOOK_AUTH_FAIL":
        return {
          ...state,
          loading: false,
          accessToken: null,
          user: null,
          error: action.payload,
        };
      case "GITHUB_AUTH_REQUEST":
        return { ...state, loading: true };
      case "GITHUB_AUTH_SUCCESS":
        return {
          ...state,
          loading: false,
          accessToken: action.payload.accessToken,
          user: action.payload.profile,
        };
      case "GITHUB_AUTH_FAIL":
        return {
          ...state,
          loading: false,
          accessToken: null,
          user: null,
          error: action.payload,
        };
      case "LOGOUT":
        return { ...state, loading: false, accessToken: null, user: null };
      default:
        return state;
    }
  };
  
  export default authReducer;
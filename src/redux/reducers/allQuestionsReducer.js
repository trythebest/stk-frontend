const initialState = {
    //Setting up initialState
    loading: false,
    questions: [],
  };
  
  const allQuestionReducer = (state = initialState, action) => {
    switch (
      action.type //handling the switch case as per the action type
    ) {
      case "GET_QUESTIONS_REQUEST":
        return { ...state, loading: true };
      case "GET_QUESTIONS_SUCCESS":
        return { ...state, questions: action.payload, loading: false };
      case "GET_QUESTIONS_FAIL":
        return { ...state, questions: [], loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default allQuestionReducer;
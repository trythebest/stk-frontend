const initialState = {
    //Setting up initialState
    loading: false,
    question: null,
  };
  
  const viewQuestionReducer = (state = initialState, action) => {
    switch (
      action.type //handling the switch case as per the action type
    ) {
      case "VIEW_QUESTION_REQUEST":
        return { ...state, loading: true };
      case "VIEW_QUESTION_SUCCESS":
        return { ...state, loading: false, question: action.payload };
      case "VIEW_QUESTION_FAIL":
        return { ...state, loading: true, question: null, error: action.payload };
      default:
        return state;
    }
  };
  
  export default viewQuestionReducer;
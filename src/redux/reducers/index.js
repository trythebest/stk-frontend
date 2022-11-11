import { combineReducers } from "redux";
import authReducer from "./authReducer";
import allQuestionReducer from "./allQuestionsReducer";
import viewQuestionReducer from "./viewQuestionReducer";
import currentUserDetailsReducer from "./currentUserReducer";
import { allUsersReducer } from "./allUsers";
import searchResultsReducer from "./searchResultReducer";

export default combineReducers({
  //Combining all reducers and making an single state
  auth: authReducer,
  allQuestions: allQuestionReducer,
  viewQuestion: viewQuestionReducer,
  currentUser: currentUserDetailsReducer,
  allUsers: allUsersReducer,
  searchResults: searchResultsReducer,
});
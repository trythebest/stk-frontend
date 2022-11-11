import axios from "../../API/axios";

// If getAllQuestions action is triggered
export const getAllQuestions = () => async (dispatch) => {
  // action will have a default dispatch method for sending the data to the reducer, and that dispatch is considered to be an action having two properties as type and payload
  try {
    dispatch({ type: "GET_QUESTIONS_REQUEST" }); // dispatching the questions request

    const { data } = await axios.get("/question");

    dispatch({ type: "GET_QUESTIONS_SUCCESS", payload: data }); // dispatching the questions data once its success
  } catch (error) {
    dispatch({ type: "GET_QUESTIONS_FAIL", payload: error.message }); //If anything above goes wrong dispatching the questions fail request
  }
};
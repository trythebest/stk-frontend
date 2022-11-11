import axios from "../../API/axios";

// action will have a default dispatch method for sending the data to the reducer, and that dispatch is considered to be an action having two properties as type and payload

export const getQuestionById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "VIEW_QUESTION_REQUEST" });

    const { data } = await axios.get(`/question/${id}`); // Getting the current question id as parameter and making the request

    dispatch({ type: "VIEW_QUESTION_SUCCESS", payload: data[0] });
  } catch (error) {
    dispatch({ type: "VIEW_QUESTION_FAIL", payload: error });
  }
};
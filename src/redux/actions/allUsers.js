import axios from "../../API/axios";

export const getAllUsers = () => async (dispatch) => {
  // action will have a default dispatch method for sending the data to the reducer, and that dispatch is considered to be an action having two properties as type and payload

  try {
    dispatch({ type: "GET_USERS_REQUEST" }); // dispatching the users request

    const { data } = await axios.get("/users");

    dispatch({ type: "GET_USERS_SUCCESS", payload: data }); // if data is available, dispatching  the success with data
  } catch (error) {
    dispatch({ type: "GET_USERS_FAIL", payload: error }); //If anything above goes wrong dispatching the questions fail request
  }
};
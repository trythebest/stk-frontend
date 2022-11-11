import React, { useEffect } from "react";
import QuestionScreen from "./QuestionScreen";
import SideBar from "../SideBar/SideBar";
import "./ViewPage.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionById } from "../../redux/actions/viewQuestion";
import { Box, CircularProgress } from "@mui/material";

const ViewPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionById(id)); // Getting the question id from QuestionCard comp and dispatching the getQuestionById action
  }, [id, dispatch]);

  const { question, loading } = useSelector((state) => state.viewQuestion);

  if (loading || !question)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <div className="home__page">
      <SideBar />
      {/* if the current Question is available, rendering it by QuestionScreen Comp by passing question as prop */}
      {!loading && question && <QuestionScreen question={question} />}
    </div>
  );
};

export default ViewPage;
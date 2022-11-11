import React from "react";
import { Link } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import "./Questions.css";

const Questions = ({ questions }) => {
  //NOTE: taking all the questions as prop from HomeMain Component
  return (
    <div className="questions">
      <div className="questions_top">
        <div className="questions_header">
          <h1>All Questions</h1>
          <Link to="/ask-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="questions_total">
          <h3>{questions.length} Questions</h3>
        </div>
      </div>
      {/* {[...Array(10)].map((_, i) => {
        return <QuestionCard key={i} />;
      })} */}
      {/* NOTE: Mapping the questions, all questions are rendered via QuestionCard */}
      {questions.map((question) => {
        return <QuestionCard question={question} key={question._id} />;
      })}
    </div>
  );
};

export default Questions;
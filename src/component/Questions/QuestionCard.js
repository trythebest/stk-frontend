import { Avatar } from "@mui/material";
import React from "react";
import "./Questions.css";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const QuestionCard = ({ question }) => {
  //NOTE: Taking the individual question from Questions Component as props
  return (
    <div className="question_card">
      <div className="questionCard_left">
        <div className="questionCard_info">
          <div className="info">
            <p>{question.voteQues.length ? question.voteQues.length : 0}</p>
            <span>votes</span>
          </div>
          <div className="info">
            <p>{question.answers.length}</p>
            <span>answers</span>
          </div>
        </div>
      </div>
      <div className="questionCard_right">
        <div className="question_title">
          <Link to={`/view-question/${question._id}`}>{question.title}</Link>
        </div>

        <div className="question_body">
          <p>{parse(question.body)}</p>
        </div>
        <div style={{ display: "flex" }}>
          {question.tags.map((tag, i) => {
            return (
              <p key={i} className="tag_box">
                {tag}
              </p>
            );
          })}
        </div>
        <div className="author_details">
          <Avatar src={question.user?.picture} />
          <p>{question.user?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import ReactQuill from "react-quill";
import "./ViewPage.css";
import axios from "../../API/axios";
import { useSelector, useDispatch } from "react-redux";
import { getQuestionById } from "../../redux/actions/viewQuestion";
import parse from "html-react-parser";
import Editor from "react-quill";
import GradeIcon from "@mui/icons-material/Grade";
import { toast } from "react-toastify";

const QuestionScreen = ({ question }) => {
  // Getting the current question details as prop
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [
      { color: ["#ff0000", "#00ff00", "#0000ff", "#220055"] },
      { background: [] },
    ], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  Editor.modules = {
    syntax: false,
    toolbar: toolbarOptions,
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  Editor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const { title, created_at, body, comments, tags, user, _id, answers } =
    question; // Destructing the required fields from question

  const { user: currentUser } = useSelector((state) => state.auth); //Getting the user from auth state and renaming it as currentUser
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [textComment, setTextComment] = useState("");
  const [textAnswer, setTextAnswer] = useState("");

  const addComment = async (e) => {
    //Handling the addComment event
    e.preventDefault();
    if (textComment !== "") {
      // Sending the comment if its not empty along with the currentUser details
      await axios
        .post(`/comment/${_id}`, { comment: textComment, user: currentUser })
        .then((res) => {
          if (res.status === 201) {
            // If adding comment is success dispatching the getQuestionById action for updating the current state
            toast.success(res.data.message);
            dispatch(getQuestionById(_id));
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const addAnswer = async (e) => {
    //Handling the addAnswer event
    e.preventDefault();

    if (textAnswer !== "") {
      // Sending the answer if its not empty along with the currentUser details
      await axios
        .post(`/answer/${_id}`, {
          answers: textAnswer,
          user: currentUser,
        })
        .then((res) => {
          if (res.status === 201) {
            // If adding answer is success dispatching the getQuestionById action for updating the current state
            toast.success(res.data.message);
            dispatch(getQuestionById(_id));
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const voteQues = async () => {
    //Handling the vote Question event

    // Sending the vote request for the current Question by id along with current User
    await axios
      .post(`/vote/question/${_id}`, { user: currentUser })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          toast(res.data.message);
          dispatch(getQuestionById(_id));
        }
      })
      .catch((err) => console.log(err));
  };

  const voteAns = async (id) => {
    // Handling the vote question answer

    // Sending the vote request for the current answer by id along with current user and question id
    await axios
      .post(`/vote/answer/${id}`, { user: currentUser, question_id: _id })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          toast(res.data.message);
          dispatch(getQuestionById(_id));
        }
      })
      .catch((err) => console.log(err));
  };

  const createdAt = (date) => {
    // Helper function for formatting the date
    const newDate = new Date(date).toLocaleString();
    return newDate;
  };

  return (
    <div className="view-questions">
      <div className="view-questions_top">
        <div className="view-questions_header">
          <h1>{title}</h1>
          {/* Redirected to the askQuestion Page once clicked */}
          <Link to="/ask-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="view-questions_total">
          <h5>Created At :{createdAt(created_at)}</h5>
        </div>
      </div>
      <div className="view-questions_middle">
        <div className="options">
          <p onClick={voteQues} className="rate">
            <GradeIcon />
          </p>
          {/* Rendering the vote Count by the number of votes available in question state */}
          <p>{question.voteQues.length ? question.voteQues.length : 0}</p>
        </div>
        <div className="question-body">
          <div className="question_info">
            <div style={{ maxWidth: "90%" }}>{parse(body)}</div>
            <div style={{ display: "flex" }}>
              {tags.map((tag, i) => {
                return (
                  <p key={i} className="tag_box">
                    {tag}
                  </p>
                );
              })}
            </div>
            <div className="author_details">
              <Avatar src={user?.picture} />
              <p>{user?.name}</p>
            </div>
          </div>
          <div className="comments">
            <div className="comment">
              {/* if comments are available mapping them */}
              {comments.map((comment) => {
                return (
                  <>
                    <p>
                      {comment.comment}
                      <span className="tag_box">{comment.user?.name}-</span>
                      <small>{createdAt(comment.created_at)}</small>
                    </p>
                  </>
                );
              })}
            </div>
            <p
              className="add"
              style={{ width: "fit-content" }}
              onClick={() => setShow(!show)}
            >
              Add a comment
            </p>
            {/* Toggling the comment box by setting a boolean state */}
            {show && (
              <div className="title">
                <textarea
                  style={{
                    margin: "5px 0px",
                    padding: "10px",
                    border: "1px solid rgba(0, 0, 0, 0.2)",
                    borderRadius: "3px",
                    outline: "none",
                  }}
                  type="text"
                  placeholder="Add your comment..."
                  value={textComment}
                  onChange={(e) => setTextComment(e.target.value)}
                  rows={5}
                />
                <button type="submit" onClick={addComment}>
                  Add comment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="view-answers">
        {/* Rendering the vote Count by the number of votes available in question state */}
        <p>{answers.length ? answers.length : "0"} Answers</p>

        {/* if answers are available mapping them */}
        {answers.map((answer) => {
          const html = `${answer.answers}`;
          const options = {
            replace: (domNode) => {
              if (domNode.attribs && domNode.attribs.class === "remove") {
                return <></>;
              }
            },
          };
          const voteCount = question.voteAns?.filter(
            // eslint-disable-next-line
            (count) => count.answer_id == answer._id
          );
          return (
            <div className="view-answer-container">
              <div className="view-answer-left">
                <p onClick={() => voteAns(answer._id)} className="rate">
                  <GradeIcon />
                </p>
                <p>{voteCount.length ? voteCount.length : 0}</p>
              </div>
              <div className="view-answer-right">
                <div style={{ maxWidth: "90%" }}>
                  <p>
                    {parse(html, options)}
                    <small>created at : {createdAt(answer.created_at)}</small>
                  </p>
                </div>
                <div className="author_details">
                  <Avatar src={answer.user?.picture} />
                  <p>{answer.user?.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="main-answer">
        <h3
          style={{
            fontSize: "22px",
            margin: "15px",
            fontWeight: "400",
          }}
        >
          Your Answer
        </h3>
        <ReactQuill
          value={textAnswer}
          onChange={(value) => setTextAnswer(value)}
          className="react-quill"
          modules={Editor.modules}
          theme="snow"
          style={{
            height: "200px",
          }}
        />
        <button type="submit" onClick={addAnswer}>
          Post your answer
        </button>
      </div>
    </div>
  );
};

export default QuestionScreen;
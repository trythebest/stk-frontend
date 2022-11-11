import { Box, Card, Container } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import Editor from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { TagsInput } from "react-tag-input-component";
import "./AskQuestion.css";
import axios from "../../API/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AskQuestion = () => {
  const { user } = useSelector((state) => state.auth); // Getting user from auth state via Redux
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);

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

  //NOTE: Handles submit once the answer is not empty
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "" && body !== "") {
      const data = { title, body: body, tags, user };

      await axios
        .post("/question", data)
        .then((res) => {
          toast.success("Question added Successfully");
          navigate("/");
        })
        .catch((err) => {
          toast.error("Error adding Question");
        });
    }
  };

  return (
    <Container fluid>
      <Box className="askQuestion_box">
        <h1>Ask a public question</h1>
        <Card className="askQuestion_card">
          <div className="title">
            <h3>Title</h3>
            <small>
              Be specific and imagine you're asking a question to another
              question
            </small>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="e.g. Is there an R function for finding the index of an element in a vector"
            />
          </div>
          <div className="body">
            <h3>Body</h3>
            <small>
              Include all the information someone would need to answer your
              question
            </small>
            {/*NOTE: React Quill setup*/}
            <ReactQuill
              value={body}
              onChange={(value) => setBody(value)}
              className="react-quill"
              modules={Editor.modules}
              theme="snow"
            />
          </div>
          <div className="tags">
            <h3>Tags</h3>
            <small>
              Add up to 5 tags to describe what your question is about
            </small>
            {/*NOTE: React Tags component setup*/}
            <TagsInput
              value={tags}
              onChange={setTags}
              placeHolder="press enter to add new tag"
            />
          </div>
        </Card>
        <div className="askQuestion_button">
          <button type="submit" onClick={handleSubmit}>
            Post your question
          </button>
        </div>
      </Box>
    </Container>
  );
};

export default AskQuestion;
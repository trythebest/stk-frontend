import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./pageNotFound.css";

const NotFound = () => {
  //NOTE: If user provides an invalid url path, user will be redirected to 404 page
  const navigate = useNavigate();
  return (
    <div className="notFound">
      <div className="container_error">
        <div className="error">
          <h1>OOPS!</h1>
          <h2>404 - This Page Can't be Found</h2>
        </div>
        <Button
          onClick={() => navigate("/")}
          type="submit"
          color="secondary"
          variant="contained"
        >
          Go to HomePage
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
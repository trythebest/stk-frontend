import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loginWithFaceBook,
  loginWithGitHub,
  loginWithGoogle,
} from "../../redux/actions/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    //if accessToken is found user will be redirected to homepage
    if (accessToken) navigate("/");
    // eslint-disable-next-line
  }, [accessToken]);

  // Handles Google Sign Method
  const handleGoogleSignIn = () => {
    // dispatch fires an action to actions of redux
    dispatch(loginWithGoogle());
  };

  // Handles Facebook Sign Method
  const handleFacebookSignIn = () => {
    dispatch(loginWithFaceBook());
  };

  // Handles Github Sign Method
  const handleGitHubSignIn = () => {
    dispatch(loginWithGitHub());
  };

  return (
    <Container maxWidth="sm">
      <Box className="auth-box" sx={{ height: "100vh" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png"
          alt="logo"
          style={{ height: "100px", width: "100px" }}
        />
        <h3 style={{ margin: "20px 0" }}>
          Sign In Using any one of the following
        </h3>
        <div className="signIn-options">
          <div onClick={handleGoogleSignIn} className="single-option">
            <img
              alt="google"
              src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
            />
            <p>Login with Google</p>
          </div>
          <div onClick={handleFacebookSignIn} className="single-option">
            <img
              alt="facebook"
              src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
            />
            <p>Login with Facebook</p>
          </div>
          <div onClick={handleGitHubSignIn} className="single-option">
            <img
              alt="github"
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            />
            <p>Login with GitHub</p>
          </div>
          {!loading && error && (
            <div className="error_message">
              <p>{error.code}</p>
            </div>
          )}
        </div>
      </Box>
    </Container>
  );
};

export default Auth;
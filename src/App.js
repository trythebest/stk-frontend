import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "./API/axios";
import Header from "./component/Header/Header";
import Main from "./component/HomeMain/HomeMain";
import AskQuestion from "./component/AskQuestion/AskQuestion";
import ViewPage from "./component/ViewQuestion/ViewPage";
import Auth from "./component/Auth/Auth";
import Users from "./component/Users/Users";
import Search from "./component/Search/Search";
import NotFound from "./component/NotFound/pageNotFound";

// const Header = lazy(() => import("./component/Header/Header"));
// const Main = lazy(() => import("./component/HomeMain/HomeMain"));
// const AskQuestion = lazy(() => import("./component/AskQuestion/AskQuestion"));
// const ViewPage = lazy(() => import("./component/ViewQuestion/ViewPage"));
// const Auth = lazy(() => import("./component/Auth/Auth"));
// const Users = lazy(() => import("./component/Users/Users"));
// const Search = lazy(() => import("./component/Search/Search"));
// const NotFound = lazy(() => import("./component/NotFound/pageNotFound"));

function App() {
  const navigate = useNavigate();
  const { accessToken, loading } = useSelector((state) => state.auth); // Getting the access token from auth state
  const { userDetails } = useSelector((state) => state.currentUser); // Getting the current user from the currentUser state

  useEffect(() => {
    if (!loading && !accessToken) {
      //Checking if the access token is available, if not user will be redirected to the auth page
      navigate("/auth");
    }
    // eslint-disable-next-line
  }, [accessToken, loading]);

  useEffect(() => {
    if (accessToken && userDetails) {
      //If user is logged In sending the userDetails for adding him to the database
      axios
        .post("/users/new", { currentUser: userDetails })
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [accessToken, userDetails]);

  return (
    <div className="App">
      <Header />
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/ask-question" element={<AskQuestion />} />
          <Route path="/view-question/:id" element={<ViewPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/users" element={<Users />} />
          <Route path="/search" element={<Search />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      {/* </Suspense> */}
      <ToastContainer />
    </div>
  );
}

export default App;
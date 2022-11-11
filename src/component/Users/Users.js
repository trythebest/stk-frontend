import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../redux/actions/allUsers";
import SideBar from "../SideBar/SideBar";
import "./Users.css";
import UsersBox from "./UsersBox";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers()); //Dispatching the getAllUsers action
  }, [dispatch]);

  const { users, loading } = useSelector((state) => state.allUsers); // Getting all the users from allUsers state

  if (loading || users.length < 1)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <div className="home__page">
      <SideBar />
      <div className="users">
        <div className="users_top">
          <div className="users_header">
            <h1>Users</h1>
            <button onClick={() => navigate(-1)}>Go Back</button>
          </div>
          <div className="users_total">
            {/* If Users are available display their count */}
            <h3>Available Users : {users?.length ? users.length : 0}</h3>
          </div>
        </div>
        <div className="users_box">
          {/* If Users are available display their picture,name and email addresses via UsersBox comp */}
          {!loading &&
            users.map((user) => {
              return <UsersBox key={user._id} user={user} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Users;
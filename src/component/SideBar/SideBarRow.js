import { Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/actions/auth";

const SideBarRow = ({ title, Icon }) => {
  //Getting the title and Icon as prop from sidebar comp

  const dispatch = useDispatch();
  const extra = title.includes("Welcome");
  const handleClick = () => {
    if (title === "Logout") {
      // Dispatching the logout action
      dispatch(logOut());
    }
  };
  return (
    <div onClick={handleClick} className="SideBarRow">
      <Icon className="SideBarRow__Icon" />
      <Typography
        variant="h6"
        className={`${extra ? "user-title" : "SideBarRow__title"}`}
      >
        {title}
      </Typography>
    </div>
  );
};

export default SideBarRow;
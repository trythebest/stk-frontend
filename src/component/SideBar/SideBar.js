import React from "react";
import "./SideBar.css";
import PublicIcon from "@mui/icons-material/Public";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import CameraFrontIcon from "@mui/icons-material/CameraFront";
import SideBarRow from "./SideBarRow";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { user } = useSelector((state) => state.auth);

  //NOTE: Getting the user name from auth state

  return (
    <div className="Sidebar">
      <div className="SideBar_inner">
        {/* NOTE: passing the title of the sidebar row and the icon component as prop */}
        <SideBarRow title={`Welcome ${user?.name}`} Icon={CameraFrontIcon} />
        PUBLIC
        <Link style={{ textDecoration: "none" }} to="/">
          <SideBarRow title="Questions" Icon={PublicIcon} />
        </Link>
        <Link style={{ textDecoration: "none" }} to="/users">
          <SideBarRow title="Users" Icon={PeopleIcon} />
        </Link>
        <hr />
        <SideBarRow title="Logout" Icon={LogoutIcon} />
      </div>
    </div>
  );
};

export default SideBar;
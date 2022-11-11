import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const params = { q: query }; // creating query params as per react-router-dom docs
  const { user } = useSelector((state) => state.auth); // Getting the user profile picture from auth state

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      // creating a search query once user presses enter and navigating to search page
      navigate({
        pathname: "/search",
        search: `?${createSearchParams(params)}`,
      });
    }
  };
  return (
    <div className="header">
      <div onClick={() => navigate("/")} className="header__left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/220px-Stack_Overflow_logo.svg.png"
          alt="logo"
        />
      </div>
      <div className="header__center">
        <SearchIcon />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          onKeyDown={handleSearch}
        />
      </div>
      <div className="header__right">
        <Avatar src={user?.picture} className="header__logo" />
      </div>
    </div>
  );
};

export default Header;
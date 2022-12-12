import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useDatabase } from "../DatabaseContext";

const Account = () => {
  const [postTitle, setPostTitle] = useState("");
  const { currentUser, logout } = useAuth();
  const { addElementsToDoc } = useDatabase();

  const handleClick = () => {
    logout();
  };

  const handleChange = (e) => {
    setPostTitle(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();

    const dataObject = {
      author: currentUser.user.email,
      date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      title: postTitle,
    };

    try {
      addElementsToDoc(dataObject);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="account-section">
      <h1>Witaj {currentUser.user.email}</h1>
      <div>
        <NavLink to={"/"}>Strona główna</NavLink>
        <button onClick={handleClick}>Wyloguj</button>
      </div>

      <form className="login-form">
        <h2>New post</h2>
        <label className="form-label">Title</label>
        <input
          type={"text"}
          placeholder={"eg. Dinner with Mary"}
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" onClick={handleSubmit}>
          Add post
        </button>
      </form>
    </div>
  );
};

export default Account;

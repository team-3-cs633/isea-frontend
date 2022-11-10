import React, { useState } from "react";
import CalendarPage from "./CalendarPage";
import { apiCallWithVariables } from "../utils/utils";
import "./views.css";

/**
 * The display for when there is no logged in user.
 *
 * Provides:
 * - A calendar view for users
 * - Account and password formfields for logging in or creating an account
 *
 * @param {*} props the props passed down from the Main function
 * @returns the landing page display
 */
export default function LandingPage(props) {
  const loginURL = process.env.REACT_APP_BASE_URL + "/users/login";
  const userURL = process.env.REACT_APP_BASE_URL + "/users";
  const [username, handleUsernameChange] = useState("");
  const [password, handlePasswordChange] = useState("");

  /**
   * Update state based on http request success.
   *
   * @param {*} data the response data from the rquest
   */
  function onSuccessFunction(data) {
    props.handleUserLogin(data);
    handleUsernameChange("");
    handlePasswordChange("");
  }

  /**
   * Handle user login.
   *
   * @param {*} event the onclick event from a button click
   */
  function handleUserLogin(event) {
    event.preventDefault();

    let data = {
      username: username,
      password: password,
    };
    apiCallWithVariables(loginURL, "POST", data, onSuccessFunction);
  }

  /**
   * Handle user creation.
   *
   * @param {*} event the onclick event from a button click
   * @returns null
   */
  function handleUserCreation(event) {
    if (username.trim().length === 0 || password.trim().length === 0) {
      alert("Username or Password field is blank");
      return;
    }
    event.preventDefault();

    let data = {
      username: username,
      password: password,
    };
    apiCallWithVariables(userURL, "POST", data, onSuccessFunction);
  }

  return (
    <div className="main-app-grid">
      <div></div>
      <div></div>
      <div className="view-grid">
        <div>
          <CalendarPage
            events={props.events}
            handleSelectedIdChange={props.handleSelectedIdChange}
          />
        </div>
        <div className="login-display-wrapper">
          <div className="login-display">
            <div className="user-login">
              <span className="username">
                <input
                  className="login-input"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => handleUsernameChange(event.target.value)}
                />
              </span>
              <span className="password">
                <input
                  className="login-input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => handlePasswordChange(event.target.value)}
                />
              </span>
              <span className="login">
                <button
                  className="login-button"
                  onClick={(event) => handleUserLogin(event)}
                >
                  Login
                </button>
              </span>
              <span className="create">
                <button
                  className="create-button"
                  onClick={(event) => handleUserCreation(event)}
                >
                  Create
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

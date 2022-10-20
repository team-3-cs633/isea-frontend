import React, { useState } from 'react';
import CalendarPage from './CalendarPage';
import { BASE_URL, apiCallWithVariables } from '../utils/utils';
import './views.css';

export default function LandingPage(props) {
  const loginURL = BASE_URL + "/users/login"
  const userURL = BASE_URL + "/users"
  const [username, handleUsernameChange] = useState("");
  const [password, handlePasswordChange] = useState("");

  function onSuccessFunction(data) {
    props.handleUserLogin(data);
    handleUsernameChange("");
    handlePasswordChange("");
  }

  function handleUserLogin(event) {
    event.preventDefault();

    let data = {
      username: username,
      password: password,
    };
    apiCallWithVariables(loginURL, "POST", data, onSuccessFunction);
  }

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
    <div>
      <div className="search-placeholder"></div>
      <div className="view-grid">
        <div>
          <CalendarPage
            events={props.events}
            handleSelectedIdChange={props.handleSelectedIdChange}
          />
        </div>
        <div>
          <div className="login-display">
            <div className="user-login">
              <span className="username">
                <input className="login-input" type="text" placeholder="Username"
                  value={username} onChange={(event) => handleUsernameChange(event.target.value)} />
              </span>
              <span className="password">
                <input className="login-input" type="password" placeholder="Password"
                  value={password} onChange={(event) => handlePasswordChange(event.target.value)} />
              </span>
              <span className="login">
                <button className="login-button" onClick={(event) => handleUserLogin(event)}>Login</button>
              </span>
              <span className="create">
                <button className="create-button" onClick={(event) => handleUserCreation(event)}>Create</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { apiCall, apiCallWithVariables } from '../utils/utils';
import EventsRemovalPage from '../events/EventsRemovalPage';
import UsersRemovalPage from '../users/UsersRemovalPage';
import './views.css';

export default function AdminPage(props) {
  const userURL = process.env.REACT_APP_BASE_URL + "/users";
  const [page, handlePageChange] = useState("home");
  const [users, handleUsersChange] = useState([]);

  useEffect(() => {
    userQuery();
    // eslint-disable-next-line
  }, []);

  function userQuery() {
    let url = userURL;
    apiCall(url, "GET", handleUpdateUsersFromQuery);
    console.log(users)
  }

  function handleUpdateUsersFromQuery(data) {
    handleUsersChange(data);
  }

  function handleRemoveUser(userId) {
    let url = userURL

    let body = {
      "user_id": userId,
      "requester_id": props.user.id,
    };

    apiCallWithVariables(url, "DELETE", body, userQuery);
  }

  function displayPage() {
    if (page === "events") {
      return (
        <EventsRemovalPage
          events={props.events}
          handleRemoveEvent={props.handleRemoveEvent}
        />
      );
    }

    if (page === "users") {
      return (
        <UsersRemovalPage
          users={users}
          handleRemoveUser={handleRemoveUser}
        />
      );
    }
  }

  return (
    <div className="">
      <div className="two-button-column">
        <button className="nav-button" onClick={() => handlePageChange("users")}>Manage Users</button>
        <button className="nav-button" onClick={() => handlePageChange("events")}>Manage Events</button>
      </div>
      {displayPage()}
    </div>
  );
}

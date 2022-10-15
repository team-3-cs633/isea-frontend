import React, { useState, useEffect } from 'react';
import { apiCall, apiCallWithVariables, BASE_URL } from '../utils/utils';
import EventsRemovalPage from '../events/EventsRemovalPage';
import UsersRemovalPage from '../users/UsersRemovalPage';
import './views.css';

export default function AdminPage(props) {
  const eventURL = BASE_URL + "/events";
  const userURL = BASE_URL + "/users";
  const [page, handlePageChange] = useState("home");
  const [events, handleEventsChange] = useState([]);
  const [users, handleUsersChange] = useState([]);

  useEffect(() => {
    eventQuery();
    userQuery();
    // eslint-disable-next-line
  }, []);

  function eventQuery() {
    let url = eventURL;
    apiCall(url, "GET", handleUpdateEventsFromQuery);
  }

  function userQuery() {
    let url = userURL;
    apiCall(url, "GET", handleUpdateUsersFromQuery);
  }

  function handleUpdateUsersFromQuery(data) {
    handleUsersChange(data);
  }

  function handleUpdateEventsFromQuery(data) {
    handleEventsChange(data);
  }

  function handleRemoveUser(userId) {
    let url = userURL

    let body = {
      "user_id": userId,
      "requester_id": props.user.id,
    };

    apiCallWithVariables(url, "DELETE", body, userQuery);
  }

  function handleRemoveEvent(eventId) {
    let url = eventURL

    let body = {
      "event_id": eventId,
      "requester_id": props.user.id,
    };

    apiCallWithVariables(url, "DELETE", body, eventQuery);
  }

  function displayPage() {
    if (page === "events") {
      return (
        <EventsRemovalPage
          events={events}
          handleRemoveEvent={handleRemoveEvent}
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
        <button className="" onClick={() => handlePageChange("users")}>Manage Users</button>
        <button className="" onClick={() => handlePageChange("events")}>Manage Events</button>
      </div>
      {displayPage()}
    </div>
  );
}

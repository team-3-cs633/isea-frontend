import React, { useState, useEffect } from "react";
import { apiCall, apiCallWithVariables } from "../utils/utils";
import EventsRemovalPage from "../events/EventsRemovalPage";
import UsersRemovalPage from "../users/UsersRemovalPage";
import "./views.css";

/**
 * The display for an Application Administrator.
 *
 * @param {*} props the props passed down from the Main function
 * @returns the admin page display
 */
export default function AdminPage(props) {
  const userURL = process.env.REACT_APP_BASE_URL + "/users";
  const [page, handlePageChange] = useState("home");
  const [users, handleUsersChange] = useState([]);

  /**
   * Query for user data on load.
   */
  useEffect(() => {
    userQuery();
    // eslint-disable-next-line
  }, []);

  /**
   * Query for user data.
   *
   * This is here and not in main because only the admin has access
   * to user information and it did not need to be pulled into the main component
   */
  function userQuery() {
    let url = userURL;
    apiCall(url, "GET", handleUpdateUsersFromQuery);
  }

  /**
   * Update the users based on a query response.
   *
   * @param {*} data the new user data from the query after a change
   */
  function handleUpdateUsersFromQuery(data) {
    handleUsersChange(data);
  }

  /**
   * Remove a user from the list of valid users.
   *
   * @param {*} userId the id of the user to remove
   */
  function handleRemoveUser(userId) {
    let url = userURL;

    let body = {
      user_id: userId,
      requester_id: props.user.id,
    };

    apiCallWithVariables(url, "DELETE", body, userQuery);
  }

  /**
   * Select the management component to display.
   *
   * @returns the removal page based on the current user selection
   */
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
        <UsersRemovalPage users={users} handleRemoveUser={handleRemoveUser} />
      );
    }
  }

  return (
    <div className="view-top-nav-grid">
      <div className="two-button-column">
        <button
          className={page === "users" ? "nav-button clicked" : "nav-button"}
          onClick={() => handlePageChange("users")}
        >
          Manage Users
        </button>
        <button
          className={page === "events" ? "nav-button clicked" : "nav-button"}
          onClick={() => handlePageChange("events")}
        >
          Manage Events
        </button>
      </div>
      <div>{displayPage()}</div>
    </div>
  );
}

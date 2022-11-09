import React, { useState, useEffect } from "react";
import { apiCall, apiCallWithVariables } from "../utils/utils";
import EventsRemovalPage from "../events/EventsRemovalPage";
import UsersRemovalPage from "../users/UsersRemovalPage";
import userIcon from "../../icons/user_icon.png";
import updateIcon from "../../icons/update_icon.png";
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
   * Get the registration data of a user and append the count to the user object.
   *
   * @param {*} user the user data
   * @returns the user object with the updated metric data
   */
  function handleUserRegistrationQuery(user) {
    let url = userURL + "/" + user.id + "/registration";
    apiCall(url, "GET", updateUserMetric.bind(user));
    return user;
  }

  async function updateUserMetric(data) {
    this["metric"] = data.length;
    return await this;
  }

  /**
   * Get the number of events a coordinator has created.
   *
   * @param {*} user the coordinator user object
   * @param {*} data the events data
   * @returns the number of events a coordinator has created
   */
  function getCoordinatorEventCount(user, data) {
    let result = data.filter((item) => item.create_user_id === user.id);
    return result.length;
  }

  /**
   * Update the users based on a query response.
   *
   * @param {*} data the new user data from the query after a change
   */
  async function handleUpdateUsersFromQuery(data) {
    let result = data.map((item) => {
      if (item.user_role_id === process.env.REACT_APP_COORDINATOR_ROLE_UUID) {
        let eventCount = getCoordinatorEventCount(item, props.events);
        item["metric"] = eventCount;
      } else if (item.user_role_id === process.env.REACT_APP_USER_ROLE_UUID) {
        let updated = handleUserRegistrationQuery(item);
        item = updated;
      }

      return item;
    });

    return handleUsersChange(result);
  }

  function updateUsersAfterRemoval(data) {
    handleUsersChange((oldData) =>
      oldData.filter((item) => item.id !== data.id)
    );
  }

  /**
   * Remove a user from the list of valid users.
   *
   * @param {*} userId the id of the user to remove
   */
  function handleRemoveUser(userId, toSubmit) {
    let url = userURL;

    let body = {
      user_id: userId,
      requester_id: props.user.id,
    };

    if (toSubmit) {
      apiCallWithVariables(url, "DELETE", body, updateUsersAfterRemoval);
    }
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
          <img src={userIcon} alt="users" width="15" height="15" />
          <div>Manage Users</div>
        </button>
        <button
          className={page === "events" ? "nav-button clicked" : "nav-button"}
          onClick={() => handlePageChange("events")}
        >
          <img src={updateIcon} alt="events" width="15" height="15" />
          <div>Manage Events</div>
        </button>
      </div>
      <div>{displayPage()}</div>
    </div>
  );
}

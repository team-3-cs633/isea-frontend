import React from "react";
import "./users.css";

/**
 * The page for handling display for user removal.
 *
 * @param {*} props the props passed in from the parent component
 * @returns the display of users for removal
 */
export default function UsersRemovalPage(props) {
  function isAdmin(user) {
    return user.user_role_id === process.env.REACT_APP_ADMIN_ROLE_UUID
      ? true
      : false;
  }

  return (
    <div className="events-list">
      {props.users.map((currentUser) => {
        return (
          <div key={currentUser.id}>
            <button
              className={
                isAdmin(currentUser) ? "admin-display" : "event-select-button"
              }
              onClick={() =>
                props.handleRemoveUser(currentUser.id, !isAdmin(currentUser))
              }
            >
              <div className="users-display-grid">
                <div className="user-name-display">{currentUser.username}</div>
                <div
                  className={
                    "user-role-display" +
                    (currentUser.user_role_id ===
                    process.env.REACT_APP_ADMIN_ROLE_UUID
                      ? " admin"
                      : currentUser.user_role_id ===
                        process.env.REACT_APP_COORDINATOR_ROLE_UUID
                      ? " coordinator"
                      : " user")
                  }
                >
                  {currentUser.role_name}
                </div>
                <div className="user-metric-display">
                  {currentUser.user_role_id !==
                    process.env.REACT_APP_ADMIN_ROLE_UUID && (
                    <div>
                      <b> {currentUser.metric} </b>{" "}
                      {currentUser.user_role_id ===
                      process.env.REACT_APP_COORDINATOR_ROLE_UUID
                        ? "events listed"
                        : "registered events"}
                    </div>
                  )}
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}

import React from "react";

/**
 * The page for handling display for user removal.
 *
 * @param {*} props the props passed in from the parent component
 * @returns the display of users for removal
 */
export default function UsersRemovalPage(props) {
  return (
    <div className="events-list">
      {props.users.map((currentUser) => {
        return (
          <div key={currentUser.id}>
            <button
              className="event-select-button"
              onClick={() => props.handleRemoveUser(currentUser.id)}
            >
              <b>UserName:</b> {currentUser.username}| <b>User Role:</b>{" "}
              {currentUser.role_name}
            </button>
          </div>
        );
      })}
    </div>
  );
}

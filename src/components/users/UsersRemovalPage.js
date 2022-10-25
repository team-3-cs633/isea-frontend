import React from 'react';


export default function UsersRemovalPage(props) {
  return (
    <div className="events-list">
      {props.users.map(currentUser => {
        return (
          <div key={currentUser.id}>
            <button className="event-select-button"
              onClick={() => props.handleRemoveUser(currentUser.id)}>
              <b>UserName:</b> {currentUser.username}
              | <b>User Role:</b> {currentUser.role_name}
            </button>
          </div>
        );
      })}
    </div>
  );
}

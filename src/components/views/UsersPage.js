import React from 'react';
import './views.css';

export default function UsersPage(props) {
  return (
    <div className="">
      {props.users.map(currentUser => {
        return (
          <div key={currentUser.id}>
            <button className="event-select-button"
              onClick={() => props.handleRemoveUser(currentUser.id)}>
              <b>UserName:</b> {currentUser.username} 
                | <b>User Role:</b> {currentUser.user_role_id}
            </button>
          </div>
        );
      })}
    </div>
  );
}

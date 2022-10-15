import React from 'react';
import UserEventPage from './UserEventPage';
import CalendarPage from './CalendarPage';
import CoordinatorPage from './CoordinatorPage';
import AdminPage from './AdminPage';
import './views.css';

export default function HomePage(props) {
  function displayPage() {
    if (props.user.user_role_id === process.env.REACT_APP_USER_ROLE_UUID) {
      return (
        <UserEventPage
          user={props.user}
        />
      );
    }

    if (props.user.user_role_id === process.env.REACT_APP_ADMIN_ROLE_UUID) {
      return (
        <AdminPage
          user={props.user} 
        />
      );
    }

    if (props.user.user_role_id === process.env.REACT_APP_COORDINATOR_ROLE_UUID) {
      return (
        <CoordinatorPage
          user={props.user}
        />
      );
    }
  }

  return (
    <div>
      <div className="view-grid">
        <div>
          <CalendarPage />
        </div>
        <div>
          {displayPage()}
        </div>
      </div>
      <button className='logout-button' onClick={() => props.handleUserLogout()}>Logout</button>
    </div>
  );
}

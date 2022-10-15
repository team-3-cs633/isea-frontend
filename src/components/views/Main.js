import React, { useState } from 'react';
import UserPage from './UserPage';
import CalendarPage from './CalendarPage';
import CoordinatorPage from './CoordinatorPage';
import AdminPage from './AdminPage';
import LandingPage from './LandingPage';
import './views.css';

export default function Main(props) {
  const [isLoggedIn, handleIsLoggedInChange] = useState(false);
  const [user, handleUserChange] = useState(null);

  function handleUserLogin(data) {
    if (!data.error) {
      handleIsLoggedInChange(true);
      handleUserChange(data);
    }
  }

  function handleUserLogout() {
    handleIsLoggedInChange(false);
    handleUserChange(null);
  }

  function displayPage() {
    if (user.user_role_id === process.env.REACT_APP_USER_ROLE_UUID) {
      return (
        <UserPage
          user={user}
        />
      );
    }

    if (user.user_role_id === process.env.REACT_APP_ADMIN_ROLE_UUID) {
      return (
        <AdminPage
          user={user}
        />
      );
    }

    if (user.user_role_id === process.env.REACT_APP_COORDINATOR_ROLE_UUID) {
      return (
        <CoordinatorPage
          user={user}
        />
      );
    }
  }

  if (isLoggedIn && user !== null) {
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
        <button className='logout-button' onClick={() => handleUserLogout()}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <LandingPage
          handleUserLogin={handleUserLogin}
        />
      </div>
    );
  }
}

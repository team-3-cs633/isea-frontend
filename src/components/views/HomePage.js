import React from 'react';
import UserEventPage from './UserEventPage';
import CalendarPage from './CalendarPage';
import './views.css';

export default function HomePage(props) {
  return (
    <div>
      <div className="view-grid">
        <div>
          <CalendarPage />
        </div>
        <div>
          <UserEventPage
            user={props.user}
          />
        </div>
      </div>
      <button className='logout-button' onClick={() => props.handleUserLogout()}>Logout</button>
    </div>

  );
}

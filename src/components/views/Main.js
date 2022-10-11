import React, {useState} from 'react';
import HomePage from './HomePage';
import LandingPage from './LandingPage';
import './views.css';

export default function Main(props) {
  const [isLoggedIn, handleIsLoggedInChange] = useState(false);
  const [user, handleUserChange] = useState(null);

  function handleUserLogin(data) {
    handleIsLoggedInChange(true);
    handleUserChange(data);
  }

  function handleUserLogout() {
    handleIsLoggedInChange(false);
    handleUserChange(null);
  }

  if (isLoggedIn && user !== null) {
    return (
      <div>
        <HomePage
          user={user}
          handleUserLogout={handleUserLogout}
        />
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

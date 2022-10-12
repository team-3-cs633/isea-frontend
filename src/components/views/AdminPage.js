import React from 'react';
import {BASE_URL} from '../utils/utils';
import EventsPage from './EventsPage';
import UsersPage from './UsersPage';
import './views.css';

export default function UserEventPage(props) {
  const eventURL = BASE_URL + "/events"
  const userURL = BASE_URL + "/users"

  return (
    <div className="">
      <EventsPage />
      <UsersPage />
    </div>
  );
}

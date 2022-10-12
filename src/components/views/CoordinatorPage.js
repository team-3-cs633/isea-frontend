import React from 'react';
import {BASE_URL} from '../utils/utils';
import ManageEventsList from '../events/ManageEventsList';
import ManageEventsForms from '../events/ManageEventsForms';
import './views.css';

export default function CoordinatorPage(props) {
  const eventURL = BASE_URL + "/events"
  const userURL = BASE_URL + "/users"

  return (
    <div className="">
      <ManageEventsList />
      <ManageEventsForms />
    </div>
  );
}

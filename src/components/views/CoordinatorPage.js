import React, {useState, useEffect} from 'react';
import {apiCall, apiCallWithVariables, BASE_URL} from '../utils/utils';
import ManageEventsList from '../events/ManageEventsList';
import EventForm from '../events/EventForm';
import './views.css';

export default function CoordinatorPage(props) {
  const eventURL = BASE_URL + "/events"
  const [page, handlePageChange] = useState("home");
  const [events, handleEventsChange] = useState([]);
  const [selectedId, handleSelectedIdChange] = useState(null);

  useEffect(() => {
    eventQuery();
  // eslint-disable-next-line
  },[]);

  function eventQuery() {
    let url = eventURL;
    apiCall(url, "GET", handleUpdateEventsFromQuery);
  }

  function handleUpdateEventsFromQuery(data) {
    handleEventsChange(data);
  }

  function handleUpdateEvent(event) {
    let url = eventURL

    let body = {
      "event_id": 1,
      "create_user_id": props.user.id,
    };

    apiCallWithVariables(url, "DELETE", body, eventQuery);
  }

  function handleCreateEvent() {
    let url = eventURL

    let body = {
      "create_user_id": props.user.id,
    };

    apiCallWithVariables(url, "POST", body, eventQuery);
  }

  function displayPage() {
    if (page === "createEvent") {
      return (
        <EventForm
          handleCreateEvent={handleCreateEvent}
        />
      );
    }

    if (page === "manageEvent") {
      return (
        <ManageEventsList
          events={events}
          handleUpdateEvent={handleUpdateEvent}
          selectedId={selectedId}
          handleSelectedIdChange={handleSelectedIdChange}
        />
      );
    }
  }

  return (
    <div className="">
      <div className="two-button-column">
        <button className="" onClick={() => handlePageChange("createEvent")}>Create Event</button>
        <button className="" onClick={() => handlePageChange("manageEvent")}>Manage Events</button>
      </div>
      {displayPage()}
    </div>
  );
}

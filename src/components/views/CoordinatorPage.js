import React, { useState, useEffect } from 'react';
import { apiCall, apiCallWithVariables, BASE_URL } from '../utils/utils';
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
  }, []);

  function eventQuery() {
    let url = eventURL;
    apiCall(url, "GET", handleUpdateEventsFromQuery);
  }

  function handleUpdateEventsFromQuery(data) {
    handleEventsChange(data.filter(item => item.create_user_id === props.user.id))
  }

  function handlePageUpdate(data) {
    handlePageChange(data)
    handleSelectedIdChange(null);
  }

  function handleUpdateEventFormSubmit(json) {
    handleUpdateEvent(json);
    handlePageUpdate("manageEvent");
  }

  function handleCreateEventFormSubmit(json) {
    handleCreateEvent(json);
  }

  function handleUpdateEvent(body) {
    let url = eventURL + "/" + selectedId;
    apiCallWithVariables(url, "POST", body, eventQuery);
  }

  function handleCreateEvent(body) {
    apiCallWithVariables(eventURL, "POST", body, eventQuery);
  }

  function handleRemoveEvent(eventId) {
    let url = eventURL

    let body = {
      "event_id": eventId,
      "requester_id": props.user.id,
    };

    apiCallWithVariables(url, "DELETE", body, eventQuery);
  }

  function displayPage() {
    if (page === "createEvent") {
      return (
        <EventForm
          user={props.user}
          handleEventFormSubmit={handleCreateEventFormSubmit}
        />
      );
    }

    if (page === "manageEvent") {
      return (
        <ManageEventsList
          user={props.user}
          events={events}
          handleUpdateEvent={handleUpdateEvent}
          selectedId={selectedId}
          handleSelectedIdChange={handleSelectedIdChange}
          handleRemoveEvent={handleRemoveEvent}
          handleEventFormSubmit={handleUpdateEventFormSubmit}
        />
      );
    }
  }

  return (
    <div className="">
      <div className="two-button-column">
        <button className="" onClick={() => handlePageUpdate("createEvent")}>Create Event</button>
        <button className="" onClick={() => handlePageUpdate("manageEvent")}>Manage Events</button>
      </div>
      {displayPage()}
    </div>
  );
}

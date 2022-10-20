import React, { useState } from 'react';
import ManageEventsList from '../events/ManageEventsList';
import EventForm from '../events/EventForm';
import './views.css';

export default function CoordinatorPage(props) {
  const [page, handlePageChange] = useState("home");

  function handlePageUpdate(data) {
    handlePageChange(data)
    props.handleSelectedIdChange(null);
  }

  function handleUpdateEventFormSubmit(json) {
    props.handleUpdateEvent(json, props.selectedId);
    handlePageUpdate("manageEvent");
  }

  function displayPage() {
    if (page === "createEvent") {
      return (
        <EventForm
          user={props.user}
          handleEventFormSubmit={props.handleCreateEventFormSubmit}
        />
      );
    }

    if (page === "manageEvent") {
      return (
        <ManageEventsList
          user={props.user}
          events={props.events}
          selectedId={props.selectedId}
          handleSelectedIdChange={props.handleSelectedIdChange}
          handleRemoveEvent={props.handleRemoveEvent}
          handleEventFormSubmit={handleUpdateEventFormSubmit}
        />
      );
    }
  }

  return (
    <div className="">
      <div className="two-button-column">
        <button className="nav-button" onClick={() => handlePageUpdate("createEvent")}>Create Event</button>
        <button className="nav-button" onClick={() => handlePageUpdate("manageEvent")}>Manage Events</button>
      </div>
      {displayPage()}
    </div>
  );
}

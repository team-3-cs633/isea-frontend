import React, { useState } from 'react';
import ManageEventsList from '../events/ManageEventsList';
import EventForm from '../events/EventForm';
import './views.css';

/**
 * The display for an Event Coordinator.
 * 
 * @param {*} props the props passed down from the Main function 
 * @returns the coordinator page display
 */
export default function CoordinatorPage(props) {
  const [page, handlePageChange] = useState("home");

  /**
   * Update the page on button select.
   * 
   * @param {*} data the page name to display
   */
  function handlePageUpdate(data) {
    handlePageChange(data)
    props.handleSelectedIdChange(null);
  }

  /**
   * Handle updating events on submit.
   * 
   * @param {*} json the data to update
   */
  function handleUpdateEventFormSubmit(json) {
    props.handleUpdateEvent(json, props.selectedId);
    handlePageUpdate("manageEvent");
  }

  /**
   * Display the component based on user selection.
   * 
   * @returns the page to display, either the event form for a new event or the 
   * page for managing existing events
   */
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

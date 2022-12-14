import React, { useState } from "react";
import ManageEventsList from "../events/ManageEventsList";
import EventForm from "../events/EventForm";
import createIcon from "../../icons/create_icon.png";
import updateIcon from "../../icons/update_icon.png";
import "./views.css";

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
    handlePageChange(data);
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
    <div className="view-top-nav-grid">
      <div className="two-button-column">
        <button
          className={
            page === "createEvent" ? "nav-button clicked" : "nav-button"
          }
          onClick={() => handlePageUpdate("createEvent")}
        >
          <img src={createIcon} alt="create" width="15" height="15" />
          <div>Create Event</div>
        </button>
        <button
          className={
            page === "manageEvent" ? "nav-button clicked" : "nav-button"
          }
          onClick={() => handlePageUpdate("manageEvent")}
        >
          <img src={updateIcon} alt="update" width="15" height="15" />
          <div>Manage Events</div>
        </button>
      </div>
      <div>{displayPage()}</div>
    </div>
  );
}

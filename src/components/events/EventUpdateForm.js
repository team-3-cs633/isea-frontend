import React from "react";
import EventForm from "./EventForm";
import "./events.css";

/**
 * A wrapper around the event form to allow for updating and deleting existing events.
 *
 * @param {*} props the props passed down from the parent component
 * @returns the complete event update form
 */
export default function EventUpdateForm(props) {
  return (
    <div className="">
      <div>
        <EventForm
          event={props.event}
          user={props.user}
          handleEventFormSubmit={props.handleEventFormSubmit}
        />
      </div>
      <div className="submit-button-display">
        <div></div>
        <button
          className="delete-button"
          onClick={() => props.handleRemoveEvent(props.event.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

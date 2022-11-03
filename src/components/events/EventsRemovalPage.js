import React from "react";
import "./events.css";

/**
 * The page for handling display for event removal.
 *
 * @param {*} props the props passed in from the parent component
 * @returns the display of event for removal
 */
export default function EventsRemovalPage(props) {
  return (
    <div className="event-list">
      {props.events.map((currentEvent) => {
        return (
          <div key={currentEvent.id}>
            <button
              className="event-select-button"
              onClick={() => props.handleRemoveEvent(currentEvent.id)}
            >
              <b>Description:</b> {currentEvent.description}| <b>Category:</b>{" "}
              {currentEvent.category}
            </button>
          </div>
        );
      })}
    </div>
  );
}

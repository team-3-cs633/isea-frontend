import React from "react";
import EventUpdateForm from "./EventUpdateForm";
import EventButton from "./EventButton";
import expandIcon from "../../icons/expand_icon.png";
import closeIcon from "../../icons/close_icon.png";
import "./events.css";

/**
 * A events management page for the Event Coordinator view.
 *
 * Provides a list of events, that when selected the update form will be displayed
 * to allow for inline updates to event information
 *
 * @param {*} props the props passed in from the parent component
 * @returns the manage events list display
 */
export default function ManageEventsList(props) {
  return (
    <div className="event-list">
      {props.events.map((currentEvent) => {
        let listItem = (
          <div>
            <div key={currentEvent.id}>
              <EventButton
                handleSelectedIdChange={props.handleSelectedIdChange}
                currentEvent={currentEvent}
                imageIcon={
                  currentEvent.id !== props.selectedId ? expandIcon : closeIcon
                }
              />
            </div>
            {currentEvent.id === props.selectedId && (
              <EventUpdateForm
                key={currentEvent.id}
                user={props.user}
                event={currentEvent}
                handleRemoveEvent={props.handleRemoveEvent}
                handleEventFormSubmit={props.handleEventFormSubmit}
              />
            )}
          </div>
        );

        return listItem;
      })}
    </div>
  );
}

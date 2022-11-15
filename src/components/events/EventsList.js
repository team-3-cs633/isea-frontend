import React from "react";
import EventDisplay from "./EventDisplay";
import EventButton from "./EventButton";
import expandIcon from "../../icons/expand_icon.png";
import closeIcon from "../../icons/close_icon.png";
import "./events.css";

/**
 * A events display page for the BU Student view.
 *
 * Provides a list of events, that when selected will display additional event information
 *
 * @param {*} props the props passed in from the parent component
 * @returns the user (BU Student) events list display
 */
export default function EventList(props) {
  return (
    <div className="event-list">
      {props.events.map((currentEvent) => {
        let listItem = (
          <div key={currentEvent.id}>
            <div>
              <EventButton
                handleSelectedIdChange={props.handleSelectedIdChange}
                currentEvent={currentEvent}
                selectedId={props.selectedId}
                imageIcon={
                  currentEvent.id !== props.selectedId ? expandIcon : closeIcon
                }
              />
            </div>
            {currentEvent.id === props.selectedId && (
              <EventDisplay
                key={currentEvent.id}
                event={currentEvent}
                handleRegisterForEvent={props.handleRegisterForEvent}
                handleFavoriteEvent={props.handleFavoriteEvent}
                handleShareEvent={props.handleShareEvent}
                metrics={props.metrics}
                favorites={props.favorites}
                registrations={props.registrations}
              />
            )}
          </div>
        );

        return listItem;
      })}
    </div>
  );
}

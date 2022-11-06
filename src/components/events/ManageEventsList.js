import React from 'react';
import EventUpdateForm from './EventUpdateForm';
import { readableDate, readableTime } from '../utils/utils';
import './events.css';

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
      {props.events.map(currentEvent => {
        let result = currentEvent.id !== props.selectedId ? (
          <div key={currentEvent.id}>
            <button className="event-select-button"
              onClick={() => props.handleSelectedIdChange(currentEvent.id)}>
              <b>Event:</b> {currentEvent.description} |
              | <b>Date</b>: {readableDate(currentEvent.start_time)} @{readableTime(currentEvent.start_time)}  -- <b>to </b>
                -- {readableDate(currentEvent.end_time)} @{readableTime(currentEvent.end_time)}
            </button>
          </div>
        ) : (
          <EventUpdateForm
            key={currentEvent.id}
            user={props.user}
            event={currentEvent}
            handleRemoveEvent={props.handleRemoveEvent}
            handleEventFormSubmit={props.handleEventFormSubmit}
          />
        )

        return result;
      })}
    </div>
  );
}

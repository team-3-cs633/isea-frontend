import React from 'react';
import EventUpdateForm from './EventUpdateForm';
import { readableDate, readableTime } from '../utils/utils';
import './events.css';

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

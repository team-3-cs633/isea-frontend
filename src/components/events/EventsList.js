import React from 'react';
import EventDisplay from './EventDisplay';
import { readableDate, readableTime } from '../utils/utils';
import './events.css';

export default function EventList(props) {
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
        )

        return result;
      })}
    </div>
  );
}

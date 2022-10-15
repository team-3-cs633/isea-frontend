import React from 'react';
import EventForm from './EventForm';
import './events.css';

export default function EventUpdateForm(props) {
  return (
    <div className="">
      <div>
        <button className="delete-button" onClick={() => props.handleRemoveEvent(props.event.id)}>Delete Event</button>
      </div>
      <div>
        <EventForm
          event={props.event}
          user={props.user}
          handleEventFormSubmit={props.handleEventFormSubmit}
        />
      </div>
    </div>
  );
}

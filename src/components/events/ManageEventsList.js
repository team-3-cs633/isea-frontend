import React from 'react';
import EventUpdateForm from './EventUpdateForm';
import './events.css';

export default function ManageEventsList(props) {
  return (
    <div className="event-list">
      {props.events.map(currentEvent => {
        let result = currentEvent.id !== props.selectedId ? (
          <div key={currentEvent.id}>
            <button className="event-select-button"
              onClick={() => props.handleSelectedIdChange(currentEvent.id)}>
              <b>Event:</b> {currentEvent.description} 
                | <b>Date:</b> {currentEvent.start_time} - {currentEvent.end_time}
            </button>
          </div>
        ) : (
          <EventUpdateForm
            key={currentEvent.id}
            event={currentEvent}
          />
        )
        
        return result; 
      })}
    </div>
  );
}

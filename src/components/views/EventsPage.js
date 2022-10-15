import React from 'react';
import './views.css';

export default function EventsPage(props) {
  return (
    <div className="">
      {props.events.map(currentEvent => {
        return (
          <div key={currentEvent.id}>
            <button className="event-select-button"
              onClick={() => props.handleRemoveEvent(currentEvent.id)}>
              <b>Description:</b> {currentEvent.description} 
                | <b>Category:</b> {currentEvent.category}
            </button>
          </div>
        );
      })}
    </div>
  );
}

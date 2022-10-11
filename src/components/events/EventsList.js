import React from 'react';
import EventDisplay from './EventDisplay';
import './events.css';

export default function EventList(props) {
  return (
    <div className="">
      {props.events.map(currentEvent => {
        let result = currentEvent.id !== props.selectedId ? (
          <div key={currentEvent.id}>
            <button className=""
              onClick={() => props.handleSelectedIdChange(currentEvent.id)}>
              Event: {currentEvent.description} 
                | Date: {currentEvent.start_time} - {currentEvent.end_time}
            </button>
          </div>
        ) : <EventDisplay event={currentEvent} />
        
        return result; 
      })}
    </div>
  );
}

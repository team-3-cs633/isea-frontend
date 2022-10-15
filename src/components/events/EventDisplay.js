import React from 'react';
import './events.css';

export default function EventDisplay(props) {

  function isRegistered() {
    return props.registrations.includes(props.event.id) ? true : false;
  };

  function isFavorite() {
    return props.favorites.includes(props.event.id) ? true : false;
  };

  return (
    <div className="event-grid">
      <div className='single-event-grid'>
        <span>
          <b>Registrations:</b> {props.metrics.registrations} - 
          - <b>Favorites:</b> {props.metrics.favorites} - 
          - <b>Shares:</b> {props.metrics.shares}
        </span>
        <span><b>Description</b>: {props.event.description}</span>
        <span><b>Category</b>: {props.event.category}</span>
        <span><b>Location</b>: {props.event.location}</span>
        <span><b>Date</b>: {props.event.start_time} - {props.event.end_time}</span>
        <span><b>Cost</b>: {props.event.cost}</span>
        <span><b>Link</b>: {props.event.link ? props.event.link : "N/A"}</span>
      </div>
      <div>
        <button
          className="event-action"
          onClick={() => props.handleRegisterForEvent(props.event.id, !isRegistered())}>{!isRegistered()? "Register": "UnRegister"}
        </button>
        <button
          className="event-action"
          onClick={() => props.handleFavoriteEvent(props.event.id, !isFavorite())}>{!isFavorite()? "Favorite": "Unfavorite"}
        </button>
        <button
          className="event-action"
          onClick={() => props.handleShareEvent(props.event.id)}>Share
        </button>
      </div>
    </div>
  );
}
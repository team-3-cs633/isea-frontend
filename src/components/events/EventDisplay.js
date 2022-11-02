import React, { useState } from 'react';
import { readableDate, readableTime } from '../utils/utils';
import './events.css';

export default function EventDisplay(props) {
  const [to, handleToChange] = useState("");
  const [shareEnabled, handleShareEnabledChange] = useState(false);

  function isRegistered() {
    return props.registrations.includes(props.event.id) ? true : false;
  };

  function isFavorite() {
    return props.favorites.includes(props.event.id) ? true : false;
  };

  function isFuture(time) {
    return time >= Date.now() ? true : false;
  }

  function handleShareEvent(event, to) {
    props.handleShareEvent(event, to);
    handleToChange("");
    handleShareEnabledChange(false);
  }

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
        <span>
          <b>Date</b>: {readableDate(props.event.start_time)} @{readableTime(props.event.start_time)}  -- <b>to </b>
          -- {readableDate(props.event.end_time)} @{readableTime(props.event.end_time)}
        </span>
        <span><b>Cost</b>: {props.event.cost}</span>
        <span><b>Link</b>: {props.event.event_link ? <a href={props.event.event_link}>{props.event.event_link}</a> : "N/A"}</span>
      </div>
      <div>
        {isFuture(props.event.start_time) &&
          <button
            className="event-action"
            onClick={() => props.handleRegisterForEvent(props.event.id, !isRegistered())}>
            {!isRegistered() ? "Register" : "UnRegister"}
          </button>
        }
        <button
          className="event-action"
          onClick={() => props.handleFavoriteEvent(props.event.id, !isFavorite())}>
          {!isFavorite() ? "Favorite" : "Unfavorite"}
        </button>
        <button
          className="event-action"
          onClick={() => handleShareEnabledChange(!shareEnabled)}> {shareEnabled ? "Hide Share" : "Share"}
        </button>
        {shareEnabled &&
          <div>
            <input className="login-input" type="text" placeholder="recipient email" Username
              value={to} onChange={(event) => handleToChange(event.target.value)} />
            <button
              className="share-submit"
              onClick={() => handleShareEvent(props.event.id, to)}>Submit
            </button>
          </div>
        }
      </div>
    </div>
  );
}

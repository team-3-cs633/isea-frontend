import React, { useState } from 'react';
import { readableDate, readableTime } from '../utils/utils';
import './events.css';

/**
 * Display event information and provide access to user events.
 * 
 * Provides a display of the event information and buttons which enable
 * the functionalities around events
 * - register / unregister
 * - favorite / unfavorite
 * - share
 * 
 * @param {*} props the props passed in from the parent component
 * @returns the event detailed information display
 */
export default function EventDisplay(props) {
  const [to, handleToChange] = useState("");
  const [shareEnabled, handleShareEnabledChange] = useState(false);

  /**
   * Check to see if an event is registered.
   * 
   * @returns true if the user is registered to the event, false if not
   */
  function isRegistered() {
    return props.registrations.includes(props.event.id) ? true : false;
  };

  /**
   * Check to see if an event is favorited.
   * 
   * @returns true if the user has favorited the event, false if not
   */
  function isFavorite() {
    return props.favorites.includes(props.event.id) ? true : false;
  };

  /**
   * Check to see if the input time is in the future.
   * 
   * @param {*} time the epoch ms time
   * @returns true if the time is in the future, false if not
   */
  function isFuture(time) {
    return time >= Date.now() ? true : false;
  }

  /**
   * Handle when an event is shared.
   * 
   * Combined multipel state changes and execution of the event so they 
   * are updated together.
   * 
   * @param {*} event the event to share
   * @param {*} to the recipient of the shared event
   */
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

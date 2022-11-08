import React from "react";
import { readableDate, readableTime } from "../utils/utils";

/**
 * A reusable event button display component.
 *
 * @param {*} props the props from the parent component
 * @returns a button display for an event
 */
export default function EventButton(props) {
  return (
    <button
      className="event-select-button"
      onClick={() => props.handleSelectedIdChange(props.currentEvent.id)}
    >
      <div className="event-button-display">
        <div>
          <b>Event:</b> {props.currentEvent.description} | | <b>Date</b>:{" "}
          {readableDate(props.currentEvent.start_time)} @
          {readableTime(props.currentEvent.start_time)} -- <b>to </b>
          -- {readableDate(props.currentEvent.end_time)} @
          {readableTime(props.currentEvent.end_time)}
        </div>
        <div>
          {<img src={props.imageIcon} alt="icon" width="12" height="12" />}
        </div>
      </div>
    </button>
  );
}

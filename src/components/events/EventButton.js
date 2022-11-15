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
      className={
        props.selectedId === props.currentEvent.id
          ? "event-select-button clicked"
          : "event-select-button"
      }
      onClick={() => props.handleSelectedIdChange(props.currentEvent.id)}
    >
      <div className="event-button-display">
        <div className="event-button-text-grid">
          <div>
            <b>Event:</b> {props.currentEvent.description}
          </div>
          <div>
            <b>Date:</b> {readableDate(props.currentEvent.start_time)}{" "}
          </div>
          <div>
            <b>Time:</b> {readableTime(props.currentEvent.start_time)}{" "}
          </div>
        </div>
        <div>
          {<img src={props.imageIcon} alt="icon" width="12" height="12" />}
        </div>
      </div>
    </button>
  );
}

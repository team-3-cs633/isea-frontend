import React from 'react';
import './events.css';

export default function EventDisplay(props) {
  return (
    <div className="">
      <div>
        <button>Register Now</button>
        <button>Favorite</button>
        <button>Share</button>
      </div>
      <div className="">
        <span> Description: {props.event.description} </span>
        <span> Category: {props.event.category} </span>
        <span> Location: {props.event.location} </span>
        <span> Date: {props.event.start_time} - {props.event.end_time}</span>
        <span> Cost: {props.event.cost} </span>
        <span> Link: {props.event.link} </span>
      </div>
    </div>
  );
}

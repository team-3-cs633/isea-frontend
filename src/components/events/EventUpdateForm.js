import React from 'react';
import './events.css';

export default function EventUpdateForm(props) {
  return (
    <div className="">
      <div>
        A Page For Updating Event Information:
      </div>
      <div>
        Event: {props.event.description}
      </div>
    </div>
  );
}

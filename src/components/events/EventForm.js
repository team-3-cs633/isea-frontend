import React, { useState } from 'react';
import './events.css';

export default function EventForm(props) {
  const [description, handleDescriptionChange] = useState("");
  const [category, handleCategoryChange] = useState("");
  const [location, handleLocationChange] = useState("");
  const [cost, handleCostChange] = useState("");
  const [startTime, handleStartTimeChange] = useState("");
  const [endTime, handleEndTimeChange] = useState("");
  const [eventLink, handleEventLinkChange] = useState("");

  function handeEventSubmit() {

  }

  return (
    <div>
      <form onSubmit={handeEventSubmit}>
        <div className="form-grid">
          <span> Description </span>
          <span>
            <input type="text"
              value={description} onChange={(event) => handleDescriptionChange(event.target.value)} />
          </span>
          <span> Category </span>
          <span>
            <input type="text"
              value={category} onChange={(event) => handleCategoryChange(event.target.value)} />
          </span>
          <span> Location </span>
          <span>
            <input type="text"
              value={location} onChange={(event) => handleLocationChange(event.target.value)} />
          </span>
          <span> Cost </span>
          <span>
            <input type="text"
              value={cost} onChange={(event) => handleCostChange(event.target.value)} />
          </span>
          <span> Start Time </span>
          <span>
            <input type="text"
              value={startTime} onChange={(event) => handleStartTimeChange(event.target.value)} />
          </span>
          <span> End Time </span>
          <span>
            <input type="text"
              value={endTime} onChange={(event) => handleEndTimeChange(event.target.value)} />
          </span>
          <span> Event Link</span>
          <span>
            <input type="text"
              value={eventLink} onChange={(event) => handleEventLinkChange(event.target.value)} />
          </span>
        </div>
        <div>
          <span>
            <input type="submit" value="submit"/>
          </span>
        </div>
      </form>
    </div>
  );
}

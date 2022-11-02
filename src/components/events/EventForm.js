import React, { useState, useEffect } from 'react';
import './events.css';

/**
 * A form for creating and updating events.
 * 
 * @param {*} props the props passed in from the parent component
 * @returns the event form display
 */
export default function EventForm(props) {
  const [description, handleDescriptionChange] = useState("");
  const [category, handleCategoryChange] = useState("");
  const [location, handleLocationChange] = useState("");
  const [cost, handleCostChange] = useState("");
  const [startTime, handleStartTimeChange] = useState("");
  const [endTime, handleEndTimeChange] = useState("");
  const [eventLink, handleEventLinkChange] = useState("");

  /**
   * Check to see if props.event exists.
   * 
   * If it does, the form fields need to be updated to reflect the 
   * events current values
   */
  useEffect(() => {
    if (props.event) {
      handleDescriptionChange(props.event.description);
      handleCategoryChange(props.event.category);
      handleLocationChange(props.event.location);
      handleCostChange(props.event.cost);
      handleStartTimeChange(props.event.start_time);
      handleEndTimeChange(props.event.end_time);
      handleEventLinkChange(props.event.event_link);
    } else {
      resetFormFields();
    }
    // eslint-disable-next-line
  }, [props.event]);

  /**
   * Reset the formfields to empty strings.
   */
  function resetFormFields() {
    handleDescriptionChange("");
    handleCategoryChange("");
    handleLocationChange("");
    handleCostChange("");
    handleStartTimeChange("");
    handleEndTimeChange("");
    handleEventLinkChange("");
  }

  /**
   * Submit the event data.
   * 
   * This can either be the creation of a new event
   * or the updating of an existing event
   * 
   * This is determined by the function passed in as props 
   * named 'handleEventFormSubmit'
   * @param {*} event the event that is triggered by the form field submission
   */
  function handeEventSubmit(event) {
    event.preventDefault();

    let data = {
      "description": description,
      "category": category,
      "location": location,
      "cost": cost,
      "start_time": startTime,
      "end_time": endTime,
      "event_link": eventLink,
    };

    data["update_time"] = Date.now()

    if (props.event) {
      data["user_id"] = props.user.id
    } else {
      data["create_user_id"] = props.user.id
    }

    props.handleEventFormSubmit(data);

    if (!props.event) {
      resetFormFields();
    }
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
            <input type="submit" className="event-create-button" value="submit" />
          </span>
        </div>
      </form>
    </div>
  );
}

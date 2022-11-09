import React, { useState, useEffect } from "react";
import clockIcon from "../../icons/clock_icon.png";
import "./events.css";

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
  const [eventLink, handleEventLinkChange] = useState("");
  const [startMonth, handleStartMonthChange] = useState("");
  const [startDay, handleStartDayChange] = useState("");
  const [startTime, handleStartTimeChange] = useState("");
  const [endMonth, handleEndMonthChange] = useState("");
  const [endDay, handleEndDayChange] = useState("");
  const [endTime, handleEndTimeChange] = useState("");

  /**
   * Check to see if props.event exists.
   *
   * If it does, the form fields need to be updated to reflect the
   * events current values
   */
  useEffect(() => {
    if (props.event) {
      let startDateObject = new Date(parseInt(props.event.start_time));
      let endDateObject = new Date(parseInt(props.event.end_time));
      handleStartMonthChange(startDateObject.getMonth());
      handleStartDayChange(startDateObject.getDate());
      handleStartTimeChange(getTimeFromDateObject(startDateObject));
      handleEndMonthChange(endDateObject.getMonth());
      handleEndDayChange(endDateObject.getDate());
      handleEndTimeChange(getTimeFromDateObject(endDateObject));
      handleDescriptionChange(props.event.description);
      handleCategoryChange(props.event.category);
      handleLocationChange(props.event.location);
      handleCostChange(props.event.cost);
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
    handleEventLinkChange("");
    handleStartMonthChange("");
    handleStartDayChange("");
    handleStartTimeChange("");
    handleEndMonthChange("");
    handleEndDayChange("");
    handleEndTimeChange("");
  }

  /**
   * Get the time from a date object.
   * 
   * @param {*} dateObject the Date object to extract the time from
   * @returns  hh:mm
   */
  function getTimeFromDateObject(dateObject) {
    let hours =
      dateObject.getHours() < 10
        ? "0" + dateObject.getHours()
        : dateObject.getHours();
    let minutes =
      dateObject.getMinutes() < 10
        ? "0" + dateObject.getMinutes()
        : dateObject.getMinutes();
    return hours + ":" + minutes;
  }

  /**
   * Get a month string from an integer value.
   *
   * @param {*} monthInt the month index to return
   * @returns the month string
   */
  function getMonthString(monthInt) {
    let months = [
      "Janurary",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months[monthInt];
  }

  /**
   * Get a Date object from separate parts.
   *
   * @param {*} month the month of the date
   * @param {*} day the day of the date
   * @param {*} time the hour and minute of the day
   * @returns a date object
   */
  function getDateFromStringParts(month, day, time) {
    let now = new Date();
    let dateString =
      day + " " + getMonthString(month) + " " + now.getFullYear() + " " + time;

    return Date.parse(dateString);
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

    if (startDay <= 0 || startDay > 31) {
      return;
    }

    if (endDay <= 0 || endDay > 31) {
      return;
    }

    let startTimeFull = getDateFromStringParts(startMonth, startDay, startTime);
    let endTimeFull = getDateFromStringParts(endMonth, endDay, endTime);

    if (!(startTimeFull && endTimeFull)) {
      return;
    }

    let data = {
      description: description,
      category: category,
      location: location,
      cost: cost,
      start_time: startTimeFull,
      end_time: endTimeFull,
      event_link: eventLink,
    };

    data["update_time"] = Date.now();

    if (props.event) {
      data["user_id"] = props.user.id;
    } else {
      data["create_user_id"] = props.user.id;
    }

    props.handleEventFormSubmit(data);

    if (!props.event) {
      resetFormFields();
    }
  }

  /**
   * Create a date input field.
   *
   * @param {*} valuePairs the variables and associated update functions to the input fields
   * @returns a date input field
   */
  function dateInputField(valuePairs) {
    return (
      <div className="date-input-grid">
        <span className="right-aligned">
          <b>{valuePairs[0][0]}</b>
        </span>
        <span>
          <select
            value={valuePairs[0][1]}
            onChange={(event) => valuePairs[0][2](event.target.value)}
            className="month-select-box"
          >
            <option value={""}> Month </option>
            <option value={"0"}> Jan </option>
            <option value={"1"}> Feb </option>
            <option value={"2"}> Mar </option>
            <option value={"3"}> Apr </option>
            <option value={"4"}> May </option>
            <option value={"5"}> Jun </option>
            <option value={"6"}> Jul </option>
            <option value={"7"}> Aug </option>
            <option value={"8"}> Sep </option>
            <option value={"9"}> Oct </option>
            <option value={"10"}> Nov </option>
            <option value={"11"}> Dec </option>
          </select>
        </span>
        <span>
          <input
            className="date-input-field"
            type="number"
            placeholder="Day"
            value={valuePairs[1][0]}
            onChange={(event) => valuePairs[1][1](event.target.value)}
          />
        </span>
      </div>
    );
  }

  /**
   * Create a time input field.
   * 
   * @param {*} valuePairs the variables and associated update functions to the input fields
   * @returns a time input field
   */
  function timeInputField(valuePairs) {
    return (
      <div className="time-input-grid">
        <span>
          <img src={clockIcon} alt="update" width="15" height="15" />{" "}
          <b>{valuePairs[0]}</b>
        </span>
        <span>
          <select
            value={valuePairs[1]}
            onChange={(event) => valuePairs[2](event.target.value)}
            className="time-input-field"
            size={4}
          >
            <option value={"00:00"}> 00:00 </option>
            <option value={"00:30"}> 00:30 </option>
            <option value={"01:00"}> 01:00 </option>
            <option value={"01:30"}> 01:30 </option>
            <option value={"02:00"}> 02:00 </option>
            <option value={"02:30"}> 02:30 </option>
            <option value={"03:00"}> 03:00 </option>
            <option value={"03:30"}> 03:30 </option>
            <option value={"04:00"}> 04:00 </option>
            <option value={"04:30"}> 04:30 </option>
            <option value={"05:00"}> 05:00 </option>
            <option value={"05:30"}> 05:30 </option>
            <option value={"06:00"}> 06:00 </option>
            <option value={"06:30"}> 06:30 </option>
            <option value={"07:00"}> 07:00 </option>
            <option value={"07:30"}> 07:30 </option>
            <option value={"08:00"}> 08:00 </option>
            <option value={"08:30"}> 08:30 </option>
            <option value={"09:00"}> 09:00 </option>
            <option value={"09:30"}> 09:30 </option>
            <option value={"10:00"}> 10:00 </option>
            <option value={"10:30"}> 10:30 </option>
            <option value={"11:00"}> 11:00 </option>
            <option value={"11:30"}> 11:30 </option>
            <option value={"12:00"}> 12:00 </option>
            <option value={"12:30"}> 12:30 </option>
            <option value={"13:00"}> 13:00 </option>
            <option value={"13:30"}> 13:30 </option>
            <option value={"14:00"}> 14:00 </option>
            <option value={"14:30"}> 14:30 </option>
            <option value={"15:00"}> 15:00 </option>
            <option value={"15:30"}> 15:30 </option>
            <option value={"16:00"}> 16:00 </option>
            <option value={"16:30"}> 16:30 </option>
            <option value={"17:00"}> 17:00 </option>
            <option value={"17:30"}> 17:30 </option>
            <option value={"18:00"}> 18:00 </option>
            <option value={"18:30"}> 18:30 </option>
            <option value={"19:00"}> 19:00 </option>
            <option value={"19:30"}> 19:30 </option>
            <option value={"20:00"}> 20:00 </option>
            <option value={"20:30"}> 20:30 </option>
            <option value={"21:00"}> 21:00 </option>
            <option value={"21:30"}> 21:30 </option>
            <option value={"22:00"}> 22:00 </option>
            <option value={"22:30"}> 22:30 </option>
            <option value={"23:00"}> 23:00 </option>
            <option value={"23:30"}> 23:30 </option>
          </select>
        </span>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handeEventSubmit}>
        <div className="event-form-grid">
          <div className="from-form-field">
            {dateInputField([
              ["From", startMonth, handleStartMonthChange],
              [startDay, handleStartDayChange],
            ])}
          </div>
          <div className="to-form-field">
            {dateInputField([
              ["To", endMonth, handleEndMonthChange],
              [endDay, handleEndDayChange],
            ])}
          </div>
          <div className="start-form-field">
            {timeInputField(["Start Time", startTime, handleStartTimeChange])}
          </div>
          <div className="stop-form-field">
            {timeInputField(["Stop Time", endTime, handleEndTimeChange])}
          </div>
          <div className="location-form-field">
            <input
              type="text"
              className="location-input-box"
              value={location}
              placeholder="Location"
              onChange={(event) => handleLocationChange(event.target.value)}
            />
          </div>
          <div className="description-form-field">
            <div>
              <b>Description</b>
            </div>
            <textarea
              className="description-input-box"
              value={description}
              placeholder="Description"
              onChange={(event) => handleDescriptionChange(event.target.value)}
            />
          </div>
          <div className="category-form-field">
            <input
              type="text"
              className="category-input-box"
              value={category}
              placeholder="Category"
              onChange={(event) => handleCategoryChange(event.target.value)}
            />
          </div>
          <div className="cost-form-field">
            <input
              type="text"
              className="cost-input-box"
              value={cost}
              placeholder="Cost"
              onChange={(event) => handleCostChange(event.target.value)}
            />
          </div>
          <div className="link-form-field">
            <input
              type="text"
              className="link-input-box"
              value={eventLink}
              placeholder="Event Link"
              onChange={(event) => handleEventLinkChange(event.target.value)}
            />
          </div>
        </div>
        <div className="submit-button-display">
          <span></span>
          <span>
            <input
              type="submit"
              className="event-create-button"
              value={props.event ? "Modify" : "Create"}
            />
          </span>
        </div>
      </form>
    </div>
  );
}

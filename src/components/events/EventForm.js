import React, { useState, useEffect } from "react";
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
  const [startHour, handleStartHourChange] = useState("");
  const [startMinute, handleStartMinuteChange] = useState("");
  const [endMonth, handleEndMonthChange] = useState("");
  const [endDay, handleEndDayChange] = useState("");
  const [endHour, handleEndHourChange] = useState("");
  const [endMinute, handleEndMinuteChange] = useState("");

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
      handleStartHourChange(startDateObject.getHours());
      handleStartMinuteChange(
        startDateObject.getMinutes() === 0 ? "00" : startDateObject.getMinutes()
      );
      handleEndMonthChange(endDateObject.getMonth());
      handleEndDayChange(endDateObject.getDate());
      handleEndHourChange(endDateObject.getHours());
      handleEndMinuteChange(
        endDateObject.getMinutes() === 0 ? "00" : endDateObject.getMinutes()
      );
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
    handleStartHourChange("");
    handleStartMinuteChange("");
    handleEndMonthChange("");
    handleEndDayChange("");
    handleEndHourChange("");
    handleEndMinuteChange("");
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
   * @param {*} hour the hour of the day
   * @param {*} minute the minute of the hour
   * @returns a date object
   */
  function getDateFromStringParts(month, day, hour, minute) {
    let now = new Date();
    let dateString =
      day +
      " " +
      getMonthString(month) +
      " " +
      now.getFullYear() +
      " " +
      hour +
      ":" +
      minute;

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

    let startTime = getDateFromStringParts(
      startMonth,
      startDay,
      startHour,
      startMinute
    );
    let endTime = getDateFromStringParts(endMonth, endDay, endHour, endMinute);

    if (!(startTime && endTime)) {
      return;
    }

    let data = {
      description: description,
      category: category,
      location: location,
      cost: cost,
      start_time: startTime,
      end_time: endTime,
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
   * @returns a date imput field
   */
  function dateInputField(valuePairs) {
    return (
      <div className="date-input-grid">
        <span>Month</span>
        <span>
          <select
            value={valuePairs[0][0]}
            onChange={(event) => valuePairs[0][1](event.target.value)}
          >
            <option value={""}> Select </option>
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
        <span>Day</span>
        <span>
          <input
            className="date-input-field"
            type="text"
            value={valuePairs[1][0]}
            onChange={(event) => valuePairs[1][1](event.target.value)}
          />
        </span>
        <span>Hour</span>
        <span>
          <select
            value={valuePairs[2][0]}
            onChange={(event) => valuePairs[2][1](event.target.value)}
          >
            <option value={""}> Select </option>
            <option value={"0"}> Midnight </option>
            <option value={"1"}> 1 AM </option>
            <option value={"2"}> 2 AM </option>
            <option value={"3"}> 3 AM </option>
            <option value={"4"}> 4 AM </option>
            <option value={"5"}> 5 AM </option>
            <option value={"6"}> 6 AM </option>
            <option value={"7"}> 7 AM </option>
            <option value={"8"}> 8 AM </option>
            <option value={"9"}> 9 AM </option>
            <option value={"10"}> 10 AM </option>
            <option value={"11"}> 11 AM </option>
            <option value={"12"}> Noon </option>
            <option value={"13"}> 1 PM </option>
            <option value={"14"}> 2 PM </option>
            <option value={"15"}> 3 PM </option>
            <option value={"16"}> 4 PM </option>
            <option value={"17"}> 5 PM </option>
            <option value={"18"}> 6 PM </option>
            <option value={"19"}> 7 PM </option>
            <option value={"20"}> 8 PM </option>
            <option value={"21"}> 9 PM </option>
            <option value={"22"}> 10 PM </option>
            <option value={"23"}> 11 PM </option>
          </select>
        </span>
        <span>Minute</span>
        <span>
          <select
            value={valuePairs[3][0]}
            onChange={(event) => valuePairs[3][1](event.target.value)}
          >
            <option value={""}> Select </option>
            <option value={"00"}> 00 </option>
            <option value={"15"}> 15 </option>
            <option value={"30"}> 30 </option>
            <option value={"45"}> 45 </option>
          </select>
        </span>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handeEventSubmit}>
        <div className="form-grid">
          <span> Description </span>
          <span>
            <input
              type="text"
              value={description}
              onChange={(event) => handleDescriptionChange(event.target.value)}
            />
          </span>
          <span> Category </span>
          <span>
            <input
              type="text"
              value={category}
              onChange={(event) => handleCategoryChange(event.target.value)}
            />
          </span>
          <span> Location </span>
          <span>
            <input
              type="text"
              value={location}
              onChange={(event) => handleLocationChange(event.target.value)}
            />
          </span>
          <span> Cost </span>
          <span>
            <input
              type="text"
              value={cost}
              onChange={(event) => handleCostChange(event.target.value)}
            />
          </span>
          <span> Start Time </span>
          <span>
            {dateInputField([
              [startMonth, handleStartMonthChange],
              [startDay, handleStartDayChange],
              [startHour, handleStartHourChange],
              [startMinute, handleStartMinuteChange],
            ])}
          </span>
          <span> End Time </span>
          <span>
            {dateInputField([
              [endMonth, handleEndMonthChange],
              [endDay, handleEndDayChange],
              [endHour, handleEndHourChange],
              [endMinute, handleEndMinuteChange],
            ])}
          </span>
          <span> Event Link</span>
          <span>
            <input
              type="text"
              value={eventLink}
              onChange={(event) => handleEventLinkChange(event.target.value)}
            />
          </span>
        </div>
        <div>
          <span>
            <input
              type="submit"
              className="event-create-button"
              value="submit"
            />
          </span>
        </div>
      </form>
    </div>
  );
}

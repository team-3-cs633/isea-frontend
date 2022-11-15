import React from "react";
import "./views.css";

/**
 * The display for the calendar view.
 *
 * The calendar is a 5x7 grid
 * - The columns are the days of the week, starting from Sunday and ending on Saturday
 * - The rows are based on the distance from now
 *
 * The calendar will only display future events, where the current day is on the top column
 * and the remaining future dates continue in the typical top to bottom left to right format
 *
 * @param {*} props the props passed down from the parent component
 * @returns the calendar page display
 */
export default function CalendarPage(props) {
  /**
   * Filter events to display for a grid cell.
   *
   * @param {*} events the potential events to display
   * @param {*} weekDay the weekday index of the cell (0=sunday, .. 6=saturday)
   * @param {*} index the row index of the grid
   * @returns a list of events with a calendar date or an empty string if there are no matching dates
   */
  function filterEventsByDateCell(events, weekDay, index) {
    let currentEvents = events.filter((item) =>
      getValidCalendarSpotItem(parseInt(item.start_time), weekDay, index)
    );

    return (
      <div>
        <div>
          {currentEvents.length > 0
            ? setCalendarDate(parseInt(currentEvents[0].start_time))
            : ""}
        </div>
        <div className="scroll-y-wrapper">
          {" "}
          {currentEvents.map((currentEvent) => {
            return (
              <button
                className="calendar-select-button"
                key={currentEvent.id}
                onClick={() => props.handleSelectedIdChange(currentEvent.id)}
              >
                {currentEvent.description}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /**
   * Set the date in a calendar grid box.
   *
   * @param {*} epoch the time in epoch ms
   * @returns a calendar date to display as month - day
   */
  function setCalendarDate(epoch) {
    let date = new Date(epoch);

    return (
      <div className="calendar-item">
        {date.getMonth() + 1} - {date.getDate()}
      </div>
    );
  }

  /**
   * Determine if the event is valid for the current calendar spot (grid cell).
   *
   * @param {*} epoch the epoch ms timestamp of an event start time
   * @param {*} weekDay the weekday index of the cell (0=sunday, .. 6=saturday)
   * @param {*} index the row index of the grid
   * @returns true if the event time matches the parameters required for display, false if not
   */
  function getValidCalendarSpotItem(epoch, weekDay, index) {
    let thirtyMonths = [1, 3, 5, 7, 9, 11];

    let now = new Date();
    let currentMonth = now.getMonth();
    let date = new Date(epoch);

    let indexOffset = now.getDay();
    let indexCalculated;

    // Determine the row index based on the current now date and the events date
    //
    // If the current date is less than now, the first equation does not work so we need
    // to start at a base number to then calculate the index
    // Since this is based on the number of days in a month, it is currently set to work
    // for all months except Feb.
    if (now.getDate() <= date.getDate() && currentMonth === date.getMonth()) {
      indexCalculated = Math.floor(
        (date.getDate() - now.getDate() + indexOffset) / 7
      );
    } else {
      let base;

      if (thirtyMonths.includes(now.getMonth())) {
        base = 30;
      } else {
        base = 31;
      }

      indexCalculated = Math.floor(
        (base - now.getDate() + indexOffset + date.getDate()) / 7
      );
    }

    if (!(indexCalculated === index)) {
      return false;
    }

    if (!(now <= date)) {
      return false;
    }
    if (!(date.getDay() === weekDay)) {
      return false;
    }

    if (![currentMonth, currentMonth + 1].includes(date.getMonth())) {
      return false;
    }

    return true;
  }

  return (
    <div className="calendar-complete">
      <div className="calendar-weekdays">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>
      <div className="calendar-main-grid">
        <span>{filterEventsByDateCell(props.events, 0, 0)}</span>
        <span>{filterEventsByDateCell(props.events, 1, 0)}</span>
        <span>{filterEventsByDateCell(props.events, 2, 0)}</span>
        <span>{filterEventsByDateCell(props.events, 3, 0)}</span>
        <span>{filterEventsByDateCell(props.events, 4, 0)}</span>
        <span>{filterEventsByDateCell(props.events, 5, 0)}</span>
        <span>{filterEventsByDateCell(props.events, 6, 0)}</span>
        <span>{filterEventsByDateCell(props.events, 0, 1)}</span>
        <span>{filterEventsByDateCell(props.events, 1, 1)}</span>
        <span>{filterEventsByDateCell(props.events, 2, 1)}</span>
        <span>{filterEventsByDateCell(props.events, 3, 1)}</span>
        <span>{filterEventsByDateCell(props.events, 4, 1)}</span>
        <span>{filterEventsByDateCell(props.events, 5, 1)}</span>
        <span>{filterEventsByDateCell(props.events, 6, 1)}</span>
        <span>{filterEventsByDateCell(props.events, 0, 2)}</span>
        <span>{filterEventsByDateCell(props.events, 1, 2)}</span>
        <span>{filterEventsByDateCell(props.events, 2, 2)}</span>
        <span>{filterEventsByDateCell(props.events, 3, 2)}</span>
        <span>{filterEventsByDateCell(props.events, 4, 2)}</span>
        <span>{filterEventsByDateCell(props.events, 5, 2)}</span>
        <span>{filterEventsByDateCell(props.events, 6, 2)}</span>
        <span>{filterEventsByDateCell(props.events, 0, 3)}</span>
        <span>{filterEventsByDateCell(props.events, 1, 3)}</span>
        <span>{filterEventsByDateCell(props.events, 2, 3)}</span>
        <span>{filterEventsByDateCell(props.events, 3, 3)}</span>
        <span>{filterEventsByDateCell(props.events, 4, 3)}</span>
        <span>{filterEventsByDateCell(props.events, 5, 3)}</span>
        <span>{filterEventsByDateCell(props.events, 6, 3)}</span>
        <span>{filterEventsByDateCell(props.events, 0, 4)}</span>
        <span>{filterEventsByDateCell(props.events, 1, 4)}</span>
        <span>{filterEventsByDateCell(props.events, 2, 4)}</span>
        <span>{filterEventsByDateCell(props.events, 3, 4)}</span>
        <span>{filterEventsByDateCell(props.events, 4, 4)}</span>
        <span>{filterEventsByDateCell(props.events, 5, 4)}</span>
        <span>{filterEventsByDateCell(props.events, 6, 4)}</span>
      </div>
    </div>
  );
}

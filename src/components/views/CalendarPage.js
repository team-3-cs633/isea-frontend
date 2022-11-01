import React from 'react';
import './views.css';

export default function CalendarPage(props) {

  function filterEventsByDateCell(events, weekDay, index) {
    let currentEvents = events.filter(
      item => getValidCalendarSpotItem(parseInt(item.start_time), weekDay, index)
    );

    return (
      <div>
        <div>
          {currentEvents.length > 0 ?
            setCalendarDate(parseInt(currentEvents[0].start_time), weekDay, index)
            :
            ""
          }
        </div>
        <div> {
          currentEvents.map(currentEvent => {
            return (
              <button className="calendar-select-button"
                key={currentEvent.id}
                onClick={() => props.handleSelectedIdChange(currentEvent.id)}>
                {currentEvent.description}
              </button>
            )
          })}
        </div>
      </div>
    );
  }

  function setCalendarDate(epoch, weekDay, index) {
    let now = new Date();
    let currentMonth = now.getMonth();
    let date = new Date(epoch);

    if (Math.floor(
      ((date.getDate() - 1 + (date.getDay() < 3 ? date.getDay() + 6 : date.getDay())) / 7)) === index
      && date.getDay() === weekDay && (date.getMonth() === currentMonth || date.getMonth() === currentMonth + 1)) {
      return <div className="calendar-item">{date.getDate()}</div>
    }

    return "";
  }

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
      indexCalculated = Math.floor(((date.getDate() - now.getDate()) + indexOffset) / 7);
    } else {
      let base;

      if (thirtyMonths.includes(now.getMonth())) {
        base = 30;
      } else {
        base = 31
      }

      indexCalculated = Math.floor((base - now.getDate() + indexOffset + date.getDate()) / 7);
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

    if (!(date.getMonth() === currentMonth) || !(date.getMonth() === currentMonth + 1)) {
      return false;
    }

    return true;
  }

  return (
    <div>
      <div className="calendar-weekdays">
        <span>Sunday</span>
        <span>Monday</span>
        <span>Tuesday</span>
        <span>Wednesday</span>
        <span>Thursday</span>
        <span>Friday</span>
        <span>Saturday</span>
      </div>
      <div className="calendar-scroll-wrapper">
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
    </div>
  );
}

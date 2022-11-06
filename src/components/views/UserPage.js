import React from 'react';
import EventList from '../events/EventsList';
import './views.css';

/**
 * The display for a user (BU Student).
 * 
 * @param {*} props the props passed down from the Main function 
 * @returns the user page display
 */
export default function UserPage(props) {
  return (
    <div className="view-top-nav-grid">
      <div className='three-button-column'>
        <button
          className="nav-button"
          onClick={() => props.handleEventQuery()}>All Events
        </button>
        <button
          className="nav-button"
          onClick={() => props.handleUserEventQuery("registration")}>Registered Events
        </button>
        <button
          className="nav-button"
          onClick={() => props.handleUserEventQuery("favorite")}>Favorite Events
        </button>
      </div>
      <div>
        <EventList
          events={props.events}
          user={props.user}
          selectedId={props.selectedId}
          metrics={props.metrics}
          registrations={props.registrations}
          favorites={props.favorites}
          handleSelectedIdChange={props.handleSelectedIdChange}
          handleRegisterForEvent={props.handleRegisterForEvent}
          handleFavoriteEvent={props.handleFavoriteEvent}
          handleShareEvent={props.handleShareEvent}
        />
      </div>
    </div>
  );
}

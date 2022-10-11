import React, {useState, useEffect} from 'react';
import EventList from '../events/EventsList';
import {BASE_URL, apiCall} from '../utils/utils';
import './views.css';

export default function UserEventPage(props) {
  const eventURL = BASE_URL + "/events"
  const [selectedId, handleSelectedIdChange] = useState(null);
  const [events, handleEventsChange] = useState([]);

  useEffect(() => {
    handleUserEventQuery(props.user.id)
  // eslint-disable-next-line
  },[props.user.id]);

  function handleUpdateEventList(data) {
    handleEventsChange(data);
  }

  function handleUserEventQuery(data) {
    let url = eventURL;

    if (data !== props.user.id) {
      url = url + "/" + props.user.id + "/" + data;
    }

    apiCall(url, "GET", handleUpdateEventList);
  }

  return (
    <div className="">
      <div>
        <button className="" onClick={() => handleUserEventQuery("registration")}>Registered Events</button>
        <button className="" onClick={() => handleUserEventQuery("favorite")}>Favorite Events</button>
      </div>
        <EventList
          events={events}
          user={props.user}
          selectedId={selectedId}
          handleSelectedIdChange={handleSelectedIdChange}
        />
    </div>
  );
}

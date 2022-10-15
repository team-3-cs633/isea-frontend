import React, { useState, useEffect } from 'react';
import EventList from '../events/EventsList';
import { BASE_URL, apiCall, apiCallWithVariables } from '../utils/utils';
import './views.css';

export default function UserPage(props) {
  const eventURL = BASE_URL + "/events"
  const userURL = BASE_URL + "/users"
  const [selectedId, handleSelectedIdChange] = useState(null);
  const [events, handleEventsChange] = useState([]);
  const [metrics, handleMetricsChange] = useState({});
  const [registrations, handleChangeRegistered] = useState([])
  const [favorites, handleChangeFavorites] = useState([])

  useEffect(() => {
    handleEventQuery();
    handleUserRegistrationQuery();
    handleUserFavoriteQuery();
    // eslint-disable-next-line
  }, [props.user.id]);

  useEffect(() => {
    if (selectedId !== null) {
      handleEventMetricsQuery();
    }
    // eslint-disable-next-line
  }, [selectedId]);

  function handleUpdateEventList(data) {
    handleEventsChange(data);
    handleSelectedIdChange(null);
  }

  function handleDoNothing(data) {
    return;
  }

  function handleUpdateEventMetrics(data) {
    handleMetricsChange(data);
  }

  function handleInitializeRegistrations(data) {
    let registeredEvents = data.map(item => item.id);
    handleChangeRegistered(registeredEvents);
  }

  function handleInitializeFavorites(data) {
    let favoritedEvents = data.map(item => item.id);
    handleChangeFavorites(favoritedEvents);
  }

  function handleUpdateAddRegistrations(data) {
    handleChangeRegistered(oldData => [...oldData, data.event_id]);

    if (selectedId !== null) {
      handleEventMetricsQuery();
    }
  }

  function handleUpdateRemoveRegistrations(data) {
    handleChangeRegistered(oldData => oldData.filter(item => item !== data.event_id));

    if (selectedId !== null) {
      handleEventMetricsQuery();
    }
  }

  function handleUpdateAddFavorites(data) {
    handleChangeFavorites(oldData => [...oldData, data.event_id]);

    if (selectedId !== null) {
      handleEventMetricsQuery();
    }
  }

  function handleUpdateRemoveFavorites(data) {
    handleChangeFavorites(oldData => oldData.filter(item => item !== data.event_id));

    if (selectedId !== null) {
      handleEventMetricsQuery();
    }
  }

  function handleEventQuery() {
    let url = eventURL;
    apiCall(url, "GET", handleUpdateEventList);
  }

  function handleUserRegistrationQuery() {
    let url = userURL + "/" + props.user.id + "/registration";
    apiCall(url, "GET", handleInitializeRegistrations);
  }

  function handleUserFavoriteQuery() {
    let url = userURL + "/" + props.user.id + "/favorite";
    apiCall(url, "GET", handleInitializeFavorites);
  }

  function handleUserEventQuery(data) {
    let url = userURL;

    if (data !== props.user.id) {
      url = url + "/" + props.user.id + "/" + data;
    }
    apiCall(url, "GET", handleUpdateEventList);
  }

  function handleEventMetricsQuery() {
    let url = eventURL + "/" + selectedId + "/metrics"
    apiCall(url, "GET", handleUpdateEventMetrics);
  }

  function handleRegisterForEvent(data, add) {
    if (add) {
      let url = eventURL + "/registration";

      let body = {
        "event_id": data,
        "user_id": props.user.id,
      };

      apiCallWithVariables(url, "POST", body, handleUpdateAddRegistrations);
    } else {
      let url = eventURL + "/" + data + "/registration/" + props.user.id;
      apiCall(url, "POST", handleUpdateRemoveRegistrations);
    }
  }

  function handleFavoriteEvent(data, add) {
    if (add) {
      let url = eventURL + "/favorite";

      let body = {
        "event_id": data,
        "user_id": props.user.id,
      };

      apiCallWithVariables(url, "POST", body, handleUpdateAddFavorites);
    } else {
      let url = eventURL + "/" + data + "/favorite/" + props.user.id;
      apiCall(url, "POST", handleUpdateRemoveFavorites);
    }
  }

  function handleShareEvent(data) {
    let url = eventURL + "/share";

    let body = {
      "event_id": data,
    };

    apiCallWithVariables(url, "POST", body, handleDoNothing);
    handleEventMetricsQuery();
  }

  return (
    <div className="view-top-nav-grid">
      <div className='three-button-column'>
        <button
          className=""
          onClick={() => handleEventQuery()}>All Events
        </button>
        <button
          className=""
          onClick={() => handleUserEventQuery("registration")}>Registered Events
        </button>
        <button
          className=""
          onClick={() => handleUserEventQuery("favorite")}>Favorite Events
        </button>
      </div>
      <div>
        <EventList
          events={events}
          user={props.user}
          selectedId={selectedId}
          metrics={metrics}
          registrations={registrations}
          favorites={favorites}
          handleSelectedIdChange={handleSelectedIdChange}
          handleRegisterForEvent={handleRegisterForEvent}
          handleFavoriteEvent={handleFavoriteEvent}
          handleShareEvent={handleShareEvent}
        />
      </div>
    </div>
  );
}

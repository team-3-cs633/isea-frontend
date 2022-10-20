import React, { useState, useEffect } from 'react';
import UserPage from './UserPage';
import CalendarPage from './CalendarPage';
import CoordinatorPage from './CoordinatorPage';
import AdminPage from './AdminPage';
import LandingPage from './LandingPage';
import { apiCall, apiCallWithVariables, BASE_URL, handleUpdateOnSearch } from '../utils/utils';
import SearchBar from '../utils/SearchBar';
import './views.css';

export default function Main() {
  const eventURL = BASE_URL + "/events"
  const userURL = BASE_URL + "/users"
  const [isLoggedIn, handleIsLoggedInChange] = useState(false);
  const [user, handleUserChange] = useState(null);
  const [events, handleEventsChange] = useState([]);
  const [coordinatorEvents, handleCoordinatorEventsChange] = useState([]);
  const [selectedId, handleSelectedIdChange] = useState(null);
  const [metrics, handleMetricsChange] = useState({});
  const [registrations, handleChangeRegistered] = useState([])
  const [favorites, handleChangeFavorites] = useState([])
  const [searchEvents, handleChangeSearchEvents] = useState([]);
  const [resetSearch, handleResetSearch] = useState(false);

  useEffect(() => {
    handleEventQuery();
    
    if (user !== null) {
      handleUserRegistrationQuery();
      handleUserFavoriteQuery();
    }
    // eslint-disable-next-line
  }, [user]);

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

  function handleUpdateEventListOnlyFuture(data) {
    handleEventsChange(getFutureEvents(data));
    handleSelectedIdChange(null);
  }

  function getFutureEvents(data) {
    return data.filter(item => parseInt(item.end_time) >= Date.now());
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
    let url = userURL + "/" + user.id + "/registration";
    apiCall(url, "GET", handleInitializeRegistrations);
  }

  function handleUserFavoriteQuery() {
    let url = userURL + "/" + user.id + "/favorite";
    apiCall(url, "GET", handleInitializeFavorites);
  }

  function handleUserEventQuery(data) {
    let url = userURL;

    if (data !== user.id) {
      url = url + "/" + user.id + "/" + data;
    }

    if (data === "registration") {
      apiCall(url, "GET", handleUpdateEventListOnlyFuture);
    } else {
      apiCall(url, "GET", handleUpdateEventList);
    }
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
        "user_id": user.id,
      };

      apiCallWithVariables(url, "POST", body, handleUpdateAddRegistrations);
    } else {
      let url = eventURL + "/" + data + "/registration/" + user.id;
      apiCall(url, "POST", handleUpdateRemoveRegistrations);
    }
  }

  function handleFavoriteEvent(data, add) {
    if (add) {
      let url = eventURL + "/favorite";

      let body = {
        "event_id": data,
        "user_id": user.id,
      };

      apiCallWithVariables(url, "POST", body, handleUpdateAddFavorites);
    } else {
      let url = eventURL + "/" + data + "/favorite/" + user.id;
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
  
  useEffect(() => {
    eventQuery();
    // eslint-disable-next-line
  }, []);

  function handleUserLogin(data) {
    if (!data.error) {
      handleIsLoggedInChange(true);
      handleUserChange(data);
      eventQueryAtLogin(data);
    }
  }

  function handleUserLogout() {
    handleIsLoggedInChange(false);
    handleUserChange(null);
  }

  function eventQueryAtLogin(loginUser) {
    let url = eventURL;

    if (loginUser !== null) {
      apiCall(url, "GET", handleUpdateEventsFromQueryAtLogin.bind(loginUser));
    } else {
      apiCall(url, "GET", handleUpdateEventsFromQuery);
    }
  }

  function eventQuery() {
    let url = eventURL;
    apiCall(url, "GET", handleUpdateEventsFromQuery);
  }

  function handleUpdateEventsFromQuery(data) {
    if (user != null) {
      handleCoordinatorEventsChange(data.filter(item => item.create_user_id === user.id))
    }
    handleEventsChange(data);
    handleChangeSearchEvents(data);
  }

  function handleUpdateEventsFromQueryAtLogin(data) {
    handleCoordinatorEventsChange(data.filter(item => item.create_user_id === this.id))
    handleEventsChange(data);
  }

  function handleCreateEventFormSubmit(json) {
    handleCreateEvent(json);
  }

  function handleUpdateEvent(body, selectedId) {
    let url = eventURL + "/" + selectedId;
    apiCallWithVariables(url, "POST", body, eventQuery);
  }

  function handleCreateEvent(body) {
    apiCallWithVariables(eventURL, "POST", body, eventQuery);
  }

  function handleRemoveEvent(eventId) {
    let url = eventURL

    let body = {
      "event_id": eventId,
      "requester_id": user.id,
    };

    apiCallWithVariables(url, "DELETE", body, eventQuery);
  }

  useEffect(() => {
    handleChangeSearchEvents(events)
    handleResetSearch(old => !old);
    
    if (user != null) {
      handleCoordinatorEventsChange(events.filter(item => item.create_user_id === user.id))
    }
  // eslint-disable-next-line
  }, [events])

  function handleUpdateEventsList(data) {
    let updated =  handleUpdateOnSearch(events, data);
    handleCoordinatorEventsChange(updated.filter(item => item.create_user_id === user.id))
    handleChangeSearchEvents(updated);
  }

  function displayPage() {
    if (user.user_role_id === process.env.REACT_APP_USER_ROLE_UUID) {
      return (
        <UserPage
          user={user}
          events={searchEvents}
          selectedId={selectedId}
          metrics={metrics}
          registrations={registrations}
          favorites={favorites}
          handleSelectedIdChange={handleSelectedIdChange}
          handleRegisterForEvent={handleRegisterForEvent}
          handleFavoriteEvent={handleFavoriteEvent}
          handleShareEvent={handleShareEvent}
          handleUserEventQuery={handleUserEventQuery}
          handleEventQuery={handleEventQuery}
        />
      );
    }

    if (user.user_role_id === process.env.REACT_APP_ADMIN_ROLE_UUID) {
      return (
        <AdminPage
          user={user}
          events={events}
          handleRemoveEvent={handleRemoveEvent}
        />
      );
    }

    if (user.user_role_id === process.env.REACT_APP_COORDINATOR_ROLE_UUID) {
      return (
        <CoordinatorPage
          user={user}
          events={coordinatorEvents}
          selectedId={selectedId}
          handleRemoveEvent={handleRemoveEvent}
          handleSelectedIdChange={handleSelectedIdChange}
          handleCreateEventFormSubmit={handleCreateEventFormSubmit}
          handleUpdateEvent={handleUpdateEvent}
        />
      );
    }
  }

  if (isLoggedIn && user !== null) {
    return (
      <div>
        <div>
          <SearchBar
            handleUpdateOnSearch={handleUpdateEventsList}
            resetSearch={resetSearch}
          />
        </div>
        <div className="view-grid">
          <div>
            <CalendarPage
              events={searchEvents}
              handleSelectedIdChange={handleSelectedIdChange}
            />
          </div>
          <div>
            {displayPage()}
          </div>
        </div>
        <button className='logout-button' onClick={() => handleUserLogout()}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <LandingPage
          events={events}
          handleUserLogin={handleUserLogin}
          handleSelectedIdChange={handleSelectedIdChange}
        />
      </div>
    );
  }
}

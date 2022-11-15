import React, { useState, useEffect } from "react";
import UserPage from "./UserPage";
import CalendarPage from "./CalendarPage";
import CoordinatorPage from "./CoordinatorPage";
import AdminPage from "./AdminPage";
import LandingPage from "./LandingPage";
import {
  apiCall,
  apiCallWithVariables,
  handleUpdateOnSearch,
} from "../utils/utils";
import SearchBar from "../utils/SearchBar";
import "./views.css";

/**
 * Handles the main application display to render.
 *
 * The login status and the user role determine which final page is displayed
 *
 * Maintains the high level data for events and users
 * - Allows for all downstream components to update based on a single data source
 *
 * @returns the main application display
 */
export default function Main() {
  const eventURL = process.env.REACT_APP_BASE_URL + "/events";
  const userURL = process.env.REACT_APP_BASE_URL + "/users";
  const [isLoggedIn, handleIsLoggedInChange] = useState(false);
  const [user, handleUserChange] = useState(null);
  const [events, handleEventsChange] = useState([]);
  const [coordinatorEvents, handleCoordinatorEventsChange] = useState([]);
  const [selectedId, handleSelectedIdChange] = useState(null);
  const [metrics, handleMetricsChange] = useState({});
  const [registrations, handleChangeRegistered] = useState([]);
  const [favorites, handleChangeFavorites] = useState([]);
  const [searchEvents, handleChangeSearchEvents] = useState([]);
  const [resetSearch, handleResetSearch] = useState(false);

  /**
   * Execute on mount.
   */
  useEffect(() => {
    eventQuery();
    // eslint-disable-next-line
  }, []);

  /**
   * Execute when the user changes.
   */
  useEffect(() => {
    handleEventQuery();

    if (user !== null) {
      handleUserRegistrationQuery();
      handleUserFavoriteQuery();
    }
    // eslint-disable-next-line
  }, [user]);

  /**
   * Execute when the selectedId changes.
   */
  useEffect(() => {
    if (selectedId !== null) {
      handleEventMetricsQuery();
    }
    // eslint-disable-next-line
  }, [selectedId]);

  /**
   * Execute when the events change.
   */
  useEffect(() => {
    handleChangeSearchEvents(events);
    handleResetSearch((old) => !old);

    if (user != null) {
      handleCoordinatorEventsChange(
        events.filter((item) => item.create_user_id === user.id)
      );
    }
    // eslint-disable-next-line
  }, [events]);

  /**
   * Update the selected id, unless its already selected, then unselect it.
   *
   * @param {*} id the id of the event button clicked
   */
  function handleSelectedIdChangeOnClick(id) {
    let value;

    if (id === selectedId) {
      value = null;
    } else {
      value = id;
    }

    handleSelectedIdChange(value);
  }

  /**
   * Update the event list.
   *
   * @param {*} data the events array to update
   */
  function handleUpdateEventList(data) {
    handleEventsChange(data);
    handleSelectedIdChange(null);
  }

  /**
   * Update events list to be only favorites.
   *
   * @param {*} data the events array to use to filter for favorites
   */
  function handleUpdateEventListOnlyFuture(data) {
    handleEventsChange(getFutureEvents(data));
    handleSelectedIdChange(null);
  }

  /**
   * Get future events.
   *
   * @param {*} data the events array
   * @returns events that are in the future
   */
  function getFutureEvents(data) {
    return data.filter((item) => parseInt(item.end_time) >= Date.now());
  }

  /**
   * Wrapper for using the api functions without using the response data.
   *
   * @param {*} data the http response data
   */
  function handleFunctionWrapper(data) {
    if (!data.errors) {
      handleEventMetricsQuery();
    }
  }

  /**
   * Update the event metrics.
   *
   * @param {*} data the metrics data to update
   */
  function handleUpdateEventMetrics(data) {
    handleMetricsChange(data);
  }

  /**
   * Initialize the registrations array.
   *
   * @param {*} data the list of events to extract ids from for the registration array
   */
  function handleInitializeRegistrations(data) {
    let registeredEvents = data.map((item) => item.id);
    handleChangeRegistered(registeredEvents);
  }

  /**
   * Initialize the favorites array.
   *
   * @param {*} data the list of events to extract ids from for the favorites array
   */
  function handleInitializeFavorites(data) {
    let favoritedEvents = data.map((item) => item.id);
    handleChangeFavorites(favoritedEvents);
  }

  /**
   * Add an event to the registrations array.
   *
   * @param {*} data the event to add to the registration array
   */
  function handleUpdateAddRegistrations(data) {
    handleChangeRegistered((oldData) => [...oldData, data.event_id]);

    if (selectedId !== null) {
      handleEventMetricsQuery();
    }
  }

  /**
   * Remove an event from the registrations array.
   *
   * @param {*} data  the event to remove from registration array
   */
  function handleUpdateRemoveRegistrations(data) {
    handleChangeRegistered((oldData) =>
      oldData.filter((item) => item !== data.event_id)
    );

    if (selectedId !== null) {
      handleEventMetricsQuery();
    }
  }

  /**
   * Add an event to the favorites array.
   *
   * @param {*} data the event to add to the favorites array
   */
  function handleUpdateAddFavorites(data) {
    handleChangeFavorites((oldData) => [...oldData, data.event_id]);

    if (selectedId !== null) {
      handleEventMetricsQuery();
    }
  }

  /**
   * Remove an event from the favorites array.
   *
   * @param {*} data the favorite event to remove from the array
   */
  function handleUpdateRemoveFavorites(data) {
    handleChangeFavorites((oldData) =>
      oldData.filter((item) => item !== data.event_id)
    );

    if (selectedId !== null) {
      handleEventMetricsQuery();
    }
  }

  /**
   * Get all events.
   */
  function handleEventQuery() {
    let url = eventURL;
    apiCall(url, "GET", handleUpdateEventList);
  }

  /**
   * Get user registered events.
   */
  function handleUserRegistrationQuery() {
    let url = userURL + "/" + user.id + "/registration";
    apiCall(url, "GET", handleInitializeRegistrations);
  }

  /**
   * Get user favorite events.
   */
  function handleUserFavoriteQuery() {
    let url = userURL + "/" + user.id + "/favorite";
    apiCall(url, "GET", handleInitializeFavorites);
  }

  /**
   * Get user events of a specific type.
   *
   * @param {*} data the type of user data to get, either registration or favorite
   */
  function handleUserEventQuery(data) {
    let url = userURL;

    if (data !== user.id) {
      url = url + "/" + user.id + "/" + data;
    }

    if (data === "favorite") {
      apiCall(url, "GET", handleUpdateEventListOnlyFuture);
    } else {
      apiCall(url, "GET", handleUpdateEventList);
    }
  }

  /**
   * Query for event metrics.
   */
  function handleEventMetricsQuery() {
    let url = eventURL + "/" + selectedId + "/metrics";
    apiCall(url, "GET", handleUpdateEventMetrics);
  }

  /**
   * Register for an event.
   *
   * @param {*} data the event id to register
   * @param {*} add true if adding a registration, false if removing
   */
  function handleRegisterForEvent(data, add) {
    if (add) {
      let url = eventURL + "/registration";

      let body = {
        event_id: data,
        user_id: user.id,
      };

      apiCallWithVariables(url, "POST", body, handleUpdateAddRegistrations);
    } else {
      let url = eventURL + "/" + data + "/registration/" + user.id;
      apiCall(url, "POST", handleUpdateRemoveRegistrations);
    }
  }

  /**
   * Favorite an event.
   *
   * @param {*} data the event id to favorite
   * @param {*} add true if adding a favorite, false if removing a favorite
   */
  function handleFavoriteEvent(data, add) {
    if (add) {
      let url = eventURL + "/favorite";

      let body = {
        event_id: data,
        user_id: user.id,
      };

      apiCallWithVariables(url, "POST", body, handleUpdateAddFavorites);
    } else {
      let url = eventURL + "/" + data + "/favorite/" + user.id;
      apiCall(url, "POST", handleUpdateRemoveFavorites);
    }
  }

  /**
   * Share an event.
   *
   * @param {*} eventId the event id to share
   * @param {*} to the recipient of the share message
   * @returns null
   */
  function handleShareEvent(eventId, to) {
    let url = eventURL + "/share";

    if (to === "") {
      return;
    }

    let body = {
      event_id: eventId,
      user_id: user.id,
      to: to,
    };

    apiCallWithVariables(url, "POST", body, handleFunctionWrapper);
  }

  /**
   * Handle user login.
   *
   * @param {*} data the https response data
   */
  function handleUserLogin(data) {
    if (!data.error) {
      handleIsLoggedInChange(true);
      handleUserChange(data);
      eventQueryAtLogin(data);
    }
  }

  /**
   * Logout the user.
   */
  function handleUserLogout() {
    handleIsLoggedInChange(false);
    handleUserChange(null);
  }

  /**
   * Query for events at login form submit
   *
   * @param {*} loginUser the user that has logged in
   */
  function eventQueryAtLogin(loginUser) {
    let url = eventURL;

    if (loginUser !== null) {
      apiCall(url, "GET", handleUpdateEventsFromQueryAtLogin.bind(loginUser));
    } else {
      apiCall(url, "GET", handleUpdateEventsFromQuery);
    }
  }

  /**
   * Query for events to display.
   */
  function eventQuery() {
    let url = eventURL;
    apiCall(url, "GET", handleUpdateEventsFromQuery);
  }

  /**
   * Update events when a query is run.
   *
   * @param {*} data the events to display
   */
  function handleUpdateEventsFromQuery(data) {
    if (user != null) {
      handleCoordinatorEventsChange(
        data.filter((item) => item.create_user_id === user.id)
      );
    }
    handleEventsChange(data);
    handleChangeSearchEvents(data);
  }

  /**
   * Update the events at user login.
   *
   * @param {*} data the list of events to display
   */
  function handleUpdateEventsFromQueryAtLogin(data) {
    handleCoordinatorEventsChange(
      data.filter((item) => item.create_user_id === this.id)
    );
    handleEventsChange(data);
  }

  /**
   * Create an event on form submit.
   *
   * Had to separate because it is being passed as a prop, and was not updating
   * properly without the wrapper
   *
   * @param {*} json the event data to create
   */
  function handleCreateEventFormSubmit(json) {
    handleCreateEvent(json);
  }

  /**
   * Update an event.
   *
   * @param {*} body the event data to update
   * @param {*} selectedId the id of the event to update
   */
  function handleUpdateEvent(body, selectedId) {
    let url = eventURL + "/" + selectedId;
    apiCallWithVariables(url, "POST", body, eventQuery);
  }

  /**
   * Create an event.
   *
   * @param {*} body the event creation data to submit
   */
  function handleCreateEvent(body) {
    apiCallWithVariables(eventURL, "POST", body, eventQuery);
  }

  /**
   * Remove an event from the active events.
   *
   * @param {*} eventId the event to remove
   */
  function handleRemoveEvent(eventId) {
    let url = eventURL;

    let body = {
      event_id: eventId,
      requester_id: user.id,
    };

    apiCallWithVariables(url, "DELETE", body, eventQuery);
  }

  /**
   * Update the events list based on the search parameters.
   *
   * @param {*} data the search parameters
   */
  function handleUpdateEventsList(data) {
    let updated = handleUpdateOnSearch(events, data);
    handleCoordinatorEventsChange(
      updated.filter((item) => item.create_user_id === user.id)
    );
    handleChangeSearchEvents(updated);
  }

  /**
   * Determine the page to display based on the user role.
   *
   * @returns the page to display
   */
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
          handleSelectedIdChange={handleSelectedIdChangeOnClick}
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
          handleSelectedIdChange={handleSelectedIdChangeOnClick}
          handleCreateEventFormSubmit={handleCreateEventFormSubmit}
          handleUpdateEvent={handleUpdateEvent}
        />
      );
    }
  }

  if (isLoggedIn && user !== null) {
    return (
      <div className="main-app-grid">
        <div className="logout-grid-cell">
          <button className="logout-button" onClick={() => handleUserLogout()}>
            Logout
          </button>
        </div>
        <div className="search-grid-cell">
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
          <div>{displayPage()}</div>
        </div>
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

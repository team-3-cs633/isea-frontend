import React, { useState } from "react";
import EventList from "../events/EventsList";
import allIcon from "../../icons/all_icon.png";
import registerIcon from "../../icons/register_icon.png";
import favoriteIcon from "../../icons/favorite_icon.png";
import suggestionIcon from "../../icons/suggestion_icon.png";
import "./views.css";

/**
 * The display for a user (BU Student).
 *
 * @param {*} props the props passed down from the Main function
 * @returns the user page display
 */
export default function UserPage(props) {
  const [page, handlePageChange] = useState("all");

  function handleButtonClick(pageType) {
    if (pageType === "all") {
      props.handleEventQuery();
    } else {
      props.handleUserEventQuery(pageType);
    }

    handlePageChange(pageType);
  }

  return (
    <div className="view-top-nav-grid">
      <div className="four-button-column">
        <button
          className={page === "all" ? "nav-button clicked" : "nav-button"}
          onClick={() => handleButtonClick("all")}
        >
          <img src={allIcon} alt="all" width="15" height="15" />
          <div>All Events</div>
        </button>
        <button
          className={
            page === "registration" ? "nav-button clicked" : "nav-button"
          }
          onClick={() => handleButtonClick("registration")}
        >
          <img src={registerIcon} alt="registration" width="15" height="15" />
          <div>Registered Events</div>
        </button>
        <button
          className={page === "favorite" ? "nav-button clicked" : "nav-button"}
          onClick={() => handleButtonClick("favorite")}
        >
          <img src={favoriteIcon} alt="favorite" width="15" height="15" />
          <div>Favorite Events</div>
        </button>
        <button
          className={
            page === "suggestion" ? "nav-button clicked" : "nav-button"
          }
          onClick={() => handleButtonClick("suggestion")}
        >
          <img src={suggestionIcon} alt="suggestion" width="15" height="15" />
          <div>Suggested Events</div>
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

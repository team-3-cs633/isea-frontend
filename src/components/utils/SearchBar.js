import React, { useState, useEffect } from "react";
import searchIcon from "../../icons/search_icon.png";

/**
 * A reusable searchbar component.
 *
 * @param {*} props the props from the parent component
 * @returns a search bar with a single input field
 */
export default function SearchBar(props) {
  const [formField, handleChangeFormField] = useState("");

  /**
   * Reset the form field when the search should be reset.
   */
  useEffect(() => {
    handleChangeFormField("");
  }, [props.resetSearch]);

  /**
   * Update the data on search.
   *
   * @param {*} data the search parameters for searching through the array of data
   */
  function handleUpdateOnSearch(data) {
    props.handleUpdateOnSearch(data);
    handleChangeFormField(data);
  }

  return (
    <div className="search-form-grid">
      <span>
        {" "}
        <img src={searchIcon} alt="search" width="20" height="20" />
      </span>
      <span>
        <input
          className="search-input"
          type="text"
          value={formField}
          placeholder="Search"
          onChange={(event) => handleUpdateOnSearch(event.target.value)}
        />
      </span>
    </div>
  );
}

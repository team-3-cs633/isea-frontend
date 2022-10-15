import React, { useState, useEffect } from 'react';

export default function SearchBar(props) {

  const [formField, handleChangeFormField] = useState("");

  useEffect(() => {
    handleChangeFormField("");
  }, [props.resetSearch])

  function handleUpdateOnSearch(data) {
    props.handleUpdateOnSearch(data);
    handleChangeFormField(data);
  }

  return (
    <div className="form-grid">
      <span> <b>Search:</b></span>
      <span>
        <input type="text"
          value={formField}
          onChange={(event) => handleUpdateOnSearch(event.target.value)}
        />
      </span>
    </div>
  );
}

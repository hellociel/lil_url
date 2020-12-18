import React, { Component } from "react";

function Form(props) {
  return (
    <div className="form">
      <form>
        <label>URL</label>
        <br></br>
        <textarea
          id="input"
          rows="1"
          cols="20"
          wrap="hard"
          type="text"
          placeholder="Paste in your URL here."
          onChange={props.onChange}
        ></textarea>
      </form>
    </div>
  );
}

export default Form;

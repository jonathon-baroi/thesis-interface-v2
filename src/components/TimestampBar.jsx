import React from "react";

const TimestampBar = () => {
  return (
    <>
      <div className="timestampbar">
        <div className="actions">
          <div className="plus">
            <button>+</button>
          </div>
          <div className="youtube-controls">
            <button>{"<-"}</button>
            <button>Play</button>
            <button>{"->"}</button>
          </div>
        </div>
        <div className="defaults">
          <h1>Default Parameters</h1>
          <div className="default-field">
            <h4>Emotion</h4>
            <input></input>
          </div>
          <div className="default-field">
            <h4>Gender</h4>
            <input></input>
          </div>
          <div className="default-field">
            <h4>Duration</h4>
            <input></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimestampBar;

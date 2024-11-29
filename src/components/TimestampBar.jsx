import React from "react";

const TimestampBar = () => {
  return (
    <>
      <div className="timestampbar">
        <button>+</button>
        <button>{"<-"}</button>
        <button>Play</button>
        <button>{"->"}</button>
        <h1>Default Parameters</h1>
        <h4>Emotion</h4>
        <input></input>
        <h4>Gender</h4>
        <input></input>
        <h4>Duration</h4>
        <input></input>
      </div>
    </>
  );
};

export default TimestampBar;

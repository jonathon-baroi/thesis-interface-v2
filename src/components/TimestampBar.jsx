import React from "react";
import { useState } from "react";
import Timestamp from "./Timestamp";
import { v4 as uuidv4 } from "uuid";

const TimestampBar = ({
  isPlaying,
  playerRef,
  playVideo,
  pauseVideo,
  getCurrentTime,
}) => {
  const [timestamps, setTimestamps] = useState([
    //{ emotion: "Neutral", gender: "Male", duration: 3 }
  ]);

  const [currentTime, setCurrentTime] = useState(0);
  const [seekArray, setSeekArray] = useState([1, 1]);
  const [defaultEmotion, setDefaultEmotion] = useState("Neutral");
  const [defaultDuration, setDefaultDuration] = useState(3);
  const [defaultGender, setDefaultGender] = useState("Male");
  const [defaultTimeOffset, setDefaultTimeOffset] = useState(0);

  const [selectedGenderButton, setSelectedGenderButton] = useState(0);
  const genderButtons = ["Male", "Female"];

  const handleClickGender = (index) => {
    setSelectedGenderButton(index); // Update the selected button index
    setDefaultGender(genderButtons[index]);
  };

  const [selectedEmotionButton, setSelectedEmotionButton] = useState(0);
  const emotionButtons = [
    "Neutral",
    "Angry",
    "Sad",
    "Happy",
    "Fear",
    "Surprise",
    "Disgust",
  ];

  const handleClickEmotion = (index) => {
    setSelectedEmotionButton(index); // Update the selected button index
    setDefaultEmotion(emotionButtons[index]);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const milliseconds = Math.floor((timeInSeconds % 1) * 1000); // Extract milliseconds
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}.${milliseconds
      .toString()
      .padStart(3, "0")}`;
  };

  const seekLeft = (offset) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime - offset, true); // true to allow precise seeking
    }
  };
  const seekRight = (offset) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + offset, true); // true to allow precise seeking
    }
  };

  const addTimestamp = () => {
    setTimestamps([
      ...timestamps,
      {
        emotion: defaultEmotion,
        gender: defaultGender,
        duration: defaultDuration,
        startTime: playerRef.current.getCurrentTime(),
        id: uuidv4(),
      },
    ]);
  };

  return (
    <>
      <div className="whole-timestamp">
        {/* 
      <div>Emotion: {defaultEmotion}</div>
      <div>Duration: {defaultDuration}</div>
      <div>Gender: {defaultGender}</div>
      <div>TimeOffset: {defaultTimeOffset}</div>
      */}
        <div className="timestampbar">
          <div className="actions">
            <div className="plus">
              <button onClick={addTimestamp}>+</button>
            </div>
            <div className="youtube-controls">
              <div className="seek">
                <button onClick={() => seekLeft(seekArray[0])}>{"<-"}</button>
                <input
                  onChange={(e) =>
                    setSeekArray([Number(e.target.value), seekArray[1]])
                  }
                  type="number"
                  value={Number(seekArray[0])}
                />
              </div>
              <button
                onClick={() => {
                  isPlaying ? pauseVideo() : playVideo();
                }}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
              <div className="seek">
                <button onClick={() => seekRight(seekArray[1])}>{"->"}</button>
                <input
                  onChange={(e) =>
                    setSeekArray([seekArray[0], Number(e.target.value)])
                  }
                  type="number"
                  value={Number(seekArray[1])}
                />
              </div>
            </div>
          </div>
          <div className="defaults">
            <h1>Default Parameters</h1>
            <div className="default-field">
              <h4>Emotion</h4>
              {emotionButtons.map((label, index) => (
                <button
                  className={
                    selectedEmotionButton === index ? "selected-button" : ""
                  }
                  key={index}
                  onClick={() => handleClickEmotion(index)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="default-field">
              <h4>Gender</h4>
              {genderButtons.map((label, index) => (
                <button
                  className={
                    selectedGenderButton === index ? "selected-button" : ""
                  }
                  key={index}
                  onClick={() => handleClickGender(index)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="default-field"></div>
            <div className="default-field">
              <h4>Duration(sec)</h4>
              <input
                value={defaultDuration}
                onChange={(e) => setDefaultDuration(Number(e.target.value))}
                placeholder="Set Default Duration"
                type="number"
              ></input>
            </div>
            <div className="default-field">
              <h4>Negative Start Offset(sec)</h4>
              <input
                value={defaultTimeOffset}
                onChange={(e) => {
                  setDefaultTimeOffset(Number(e.target.value));
                  //console.log(e.target.value); // Check if negative values are logged
                }}
                placeholder="Negative Start Offset"
                type="number"
              ></input>
            </div>
            {/**/}
            <button
              onClick={() => {
                setCurrentTime(getCurrentTime);
              }}
            >
              {formatTime(currentTime)}
            </button>
          </div>
        </div>
        <div className="timestamp-container">
          {/*<div style={{ height: "200px" }}></div>*/}
          <ul className="timestamp-list">
            {timestamps.map((timestamp) => (
              <li key={timestamp.id}>
                <Timestamp
                  index={timestamps.indexOf(timestamp)} // Pass the index or timestamp.id
                  timestamps={timestamps}
                  setTimestamps={setTimestamps}
                  playerRef={playerRef}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TimestampBar;

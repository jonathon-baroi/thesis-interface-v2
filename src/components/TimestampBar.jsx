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
  timestamps,
  setTimestamps,
}) => {
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
    var temp = playerRef.current.getCurrentTime() + defaultTimeOffset;
    if (temp < 0) {
      temp = 0;
    }
    setTimestamps([
      {
        emotion: defaultEmotion,
        gender: defaultGender,
        duration: defaultDuration,
        startTime: temp,
        id: uuidv4(),
      },
      ...timestamps,
    ]);
  };

  return (
    <>
      <div className="whole-timestamp ">
        {/* 
      <div>Emotion: {defaultEmotion}</div>
      <div>Duration: {defaultDuration}</div>
      <div>Gender: {defaultGender}</div>
      <div>TimeOffset: {defaultTimeOffset}</div>
      */}
        <div className="timestampbar ">
          <div className="defaults">
            <h1>Default Parameters</h1>
            <div className="default-field">
              {emotionButtons.map((label, index) => (
                <button
                  className={`option-button ${
                    selectedEmotionButton === index ? "selected-button" : ""
                  }`}
                  key={index}
                  onClick={() => handleClickEmotion(index)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="default-field">
              {genderButtons.map((label, index) => (
                <button
                  className={`option-button ${
                    selectedGenderButton === index ? "selected-button" : ""
                  }`}
                  key={index}
                  onClick={() => handleClickGender(index)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="default-field"></div>
            <div className="flex-ver">
              <div className="flex-ver ">
                <div className="flex-hor  padding-right">
                  <h4>Duration(sec.....) </h4>
                  <input
                    value={defaultDuration}
                    onChange={(e) => setDefaultDuration(Number(e.target.value))}
                    placeholder="Set Default Duration"
                    type="number"
                  ></input>
                </div>
              </div>
              <div className="flex-ver>">
                <div className="flex-hor  padding-right">
                  <h4>Start Offset(sec)</h4>
                  <input
                    value={defaultTimeOffset}
                    onChange={(e) => {
                      const newValue = e.target.value;

                      // Allow "-" to be temporarily entered
                      if (newValue === "-" || newValue === "") {
                        setDefaultTimeOffset(newValue); // Temporarily store the invalid input
                      } else {
                        setDefaultTimeOffset(Number(newValue)); // Convert valid input to a number
                      }
                    }}
                    placeholder="Start Offset"
                    type="number"
                  />
                </div>
              </div>
            </div>
            {/*
            <button
              onClick={() => {
                setCurrentTime(getCurrentTime);
              }}
            >
              {formatTime(currentTime)}
            </button>*/}
          </div>
          <div className="actions">
            <div className="youtube-controls">
              <div className="seek" style={{ padding: "5px" }}>
                <button
                  className="play-button"
                  onClick={() => seekLeft(seekArray[0])}
                >
                  {"<-"}
                </button>
                <input
                  onChange={(e) => {
                    var temp = Number(e.target.value);
                    if (temp < 0) {
                      temp = 0;
                    }
                    setSeekArray([temp, seekArray[1]]);
                  }}
                  type="number"
                  value={Number(seekArray[0])}
                />
              </div>
              <div style={{ padding: "5px" }}>
                <button
                  className="play-button"
                  onClick={() => {
                    isPlaying ? pauseVideo() : playVideo();
                  }}
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
              </div>
              <div className="seek" style={{ padding: "5px" }}>
                <button
                  className="play-button"
                  onClick={() => seekRight(seekArray[1])}
                >
                  {"->"}
                </button>
                <input
                  onChange={(e) => {
                    var temp = Number(e.target.value);
                    if (temp < 0) {
                      temp = 0;
                    }
                    setSeekArray([seekArray[0], temp]);
                  }}
                  type="number"
                  value={Number(seekArray[1])}
                />
              </div>
            </div>
            <div className="plus">
              <button
                className="play-button"
                role="button"
                onClick={addTimestamp}
              >
                ADD TIMESTAMP AT CURRENT POSITION
              </button>
            </div>
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

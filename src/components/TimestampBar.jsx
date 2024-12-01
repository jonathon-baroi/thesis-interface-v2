import React from "react";
import { useState } from "react";

const TimestampBar = ({
  isPlaying,
  playerRef,
  playVideo,
  pauseVideo,
  getCurrentTime,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [seekArray, setSeekArray] = useState([-1, 1]);
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
      playerRef.current.seekTo(currentTime + offset, true); // true to allow precise seeking
    }
  };
  const seekRight = (offset) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + offset, true); // true to allow precise seeking
    }
  };

  return (
    <>
      <div>Emotion: {defaultEmotion}</div>
      <div>Duration: {defaultDuration}</div>
      <div>Gender: {defaultGender}</div>
      <div>TimeOffset: {defaultTimeOffset}</div>
      <div className="timestampbar">
        <div className="actions">
          <div className="plus">
            <button>+</button>
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
            <h4>Add Time Offset(sec)</h4>
            <input
              value={defaultTimeOffset}
              onChange={(e) => setDefaultTimeOffset(Number(e.target.value))}
              placeholder="Set Default Time Offset"
              type="number"
            ></input>
          </div>
          <button
            onClick={() => {
              setCurrentTime(getCurrentTime);
            }}
          >
            {formatTime(currentTime)}
          </button>
        </div>
      </div>
    </>
  );
};

export default TimestampBar;

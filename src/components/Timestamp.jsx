import React from "react";
import "../timestamp.css";
import { useState, useEffect } from "react";
const Timestamp = ({ index, timestamps, setTimestamps, playerRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0); // State for the slider value
  const [onlyStartTime, setOnlyStartTime] = useState(
    timestamps[index].startTime
  );
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const microseconds = Math.round(
      (timeInSeconds - Math.floor(timeInSeconds)) * 1e6
    );

    return `${hours}h ${minutes}m ${seconds}s ${microseconds}μs`;
  };

  const getStartTime = () => {
    return timestamps[index].startTime;
  };

  const setStartTime = (onlyStartTime, sliderValue) => {
    var updatedTime = sliderValue + onlyStartTime;
    if (updatedTime < 0) {
      updatedTime = 0;
    }
    setTimestamps(
      timestamps.map((timestamp, idx) => {
        return idx === index
          ? { ...timestamp, startTime: updatedTime }
          : timestamp;
      })
    );
  };

  const playForDuration = (startTime, duration) => {
    if (playerRef.current) {
      const playbackRate = playerRef.current.getPlaybackRate();
      const adjustedDuration = duration / playbackRate;

      playerRef.current.seekTo(startTime, true);
      playerRef.current.playVideo();
      setIsPlaying(true);
      setTimeout(() => {
        if (playerRef.current) {
          playerRef.current.pauseVideo();
          setIsPlaying(false);
        }
      }, adjustedDuration * 1000);
    }
  };

  const [min, setMin] = useState(-3); // Minimum value of the slider
  const [max, setMax] = useState(3); // Maximum value of the slider
  const [step, setStep] = useState(0.1);

  const getEmotion = () => {
    return timestamps[index].emotion;
  };

  const setEmotion = (emotion) => {
    setTimestamps(
      timestamps.map((timestamp, idx) => {
        return idx === index ? { ...timestamp, emotion } : timestamp;
      })
    );
  };

  const getDuration = () => {
    return timestamps[index].duration;
  };

  const setDuration = (duration) => {
    setTimestamps(
      timestamps.map((timestamp, idx) => {
        return idx === index ? { ...timestamp, duration } : timestamp;
      })
    );
  };

  const getGender = () => {
    return timestamps[index].gender;
  };
  const setGender = (gender) => {
    setTimestamps(
      timestamps.map((timestamp, idx) => {
        return idx === index ? { ...timestamp, gender } : timestamp;
      })
    );
  };

  const deleteSelf = () => {
    if (window.confirm("Are you sure you want to delete this timestamp?")) {
      setTimestamps(timestamps.filter((_, idx) => idx !== index));
    }
  };

  const emotionButtons = [
    "Neutral",
    "Angry",
    "Sad",
    "Happy",
    "Fear",
    "Surprise",
    "Disgust",
  ];
  const [selectedEmotionButton, setSelectedEmotionButton] = useState(() => {
    return emotionButtons.findIndex(
      (emotionButton) => emotionButton === getEmotion()
    );
  });

  const genderButtons = ["Male", "Female"];

  const [selectedGenderButton, setSelectedGenderButton] = useState(() => {
    return genderButtons.findIndex(
      (genderButton) => genderButton === getGender()
    );
  });

  const handleClickGender = (idx) => {
    setSelectedGenderButton(idx); // Update the selected button index
    setGender(genderButtons[idx]);
    //setTimestampGender(genderButtons[index]);
  };

  const handleClickEmotion = (idx) => {
    setSelectedEmotionButton(idx); // Update the selected button index
    setEmotion(emotionButtons[idx]);
    //setTimestampEmotion(emotionButtons[index]);
  };

  return (
    <div className="timestamp padding10">
      <div>{timestamps.length - index}</div>
      <div className="flex-hor flex-end">
        <div style={{ paddingBottom: "30px" }}>
          <button
            className="option-button delete-color"
            onClick={deleteSelf}
            style={{ backgroundColor: "#a80000" }}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="flex-hor">
        <div className="flex-ver">
          <div className="flex-hor">
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
          <div className="flex-hor">
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
        </div>
      </div>
      <div className="start-duration-stuff">
        <div className="column-flex">
          <div className="up-down-container">
            <h4>Start Time</h4>

            <input
              type="number"
              step="0.1" // Allows floating-point numbers up to two decimal places
              onChange={(e) => {
                const newOnlyStartTime = parseFloat(e.target.value) || 0;
                setOnlyStartTime(newOnlyStartTime);
                setStartTime(newOnlyStartTime, sliderValue);
              }}
              value={onlyStartTime}
            />
          </div>
          <div className="up-down-container">
            <div>
              <span>{min}</span>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={sliderValue}
                onChange={(e) => {
                  const newSliderValue = parseFloat(e.target.value);
                  setSliderValue(newSliderValue);
                  setStartTime(onlyStartTime, newSliderValue);
                }}
                className="neutral-slider"
              />
              <span>{max}</span>
            </div>

            <div className="current-value">
              <div className="slider-value">Offset: {sliderValue}</div>
            </div>
            <button
              className="option-button"
              onClick={() => {
                setSliderValue(0);
                setStartTime(onlyStartTime, 0);
              }}
            >
              Reset
            </button>
            <div className="up-down-container">
              <h4>Actual Start Time</h4>
              <div>{formatTime(getStartTime())}</div>
            </div>
          </div>
        </div>
        <div className="column-flex" style={{ alignItems: "center" }}>
          <div className="up-down-container">
            <h4>Duration</h4>
            <input
              type="number"
              step="0.1" // Allows floating-point numbers up to two decimal places
              onChange={(e) => setDuration(parseFloat(e.target.value) || 0)} // Use parseFloat
              value={getDuration()}
            />
          </div>
          <div style={{ paddingTop: "20px" }}>
            <button
              className={`option-button ${isPlaying ? "playing" : ""}`}
              onClick={() => playForDuration(getStartTime(), getDuration())}
              style={{ width: "150px", height: "150px", fontSize: "50px" }}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timestamp;

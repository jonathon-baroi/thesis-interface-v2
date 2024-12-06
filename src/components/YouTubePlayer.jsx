import React, { useState } from "react";
import YouTube from "react-youtube";
import "../YouTubePlayer.css";

const YouTubePlayer = ({
  playerRef,
  setIsPlaying,
  setVideoUrl,
  handleVideoChange,
  inputUrl,
  setInputURL,
  videoId,
}) => {
  const onPlayerReady = (event) => {
    console.log("Player is ready");
    playerRef.current = event.target;
    //event.target.pauseVideo();
  };

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  const onPlayerStateChange = (event) => {
    //console.log("Player state changed:", event.data);
    if (event.data === 1) setIsPlaying(true); // Playing
    if (event.data === 2) setIsPlaying(false); // Paused
  };

  return (
    <div className="youtube-container-full">
      <h1>Thesis Interface V2</h1>
      <div className="youtube-bar">
        <div style={{ padding: "10px 50px", justifyContent: "space-between" }}>
          <input
            id="videoUrl"
            type="text"
            value={inputUrl}
            onChange={(e) => {
              setInputURL(e.target.value);
            }}
            style={{ width: "400px" }}
          />

          <div style={{ paddingLeft: "20px" }}>
            <button
              className="option-button"
              onClick={handleVideoChange(inputUrl)}
            >
              Load Video
            </button>
          </div>
        </div>
      </div>
      <div className="youtube-player-wrapper">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />
      </div>
    </div>
  );
};

export default YouTubePlayer;

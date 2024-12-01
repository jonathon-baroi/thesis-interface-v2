import React, { useState } from "react";
import YouTube from "react-youtube";
import "../YouTubePlayer.css";

const YouTubePlayer = ({ playerRef, setIsPlaying }) => {
  const [videoId, setVideoId] = useState("dQw4w9WgXcQ"); // Default video ID

  const onPlayerReady = (event) => {
    console.log("Player is ready");
    playerRef.current = event.target;
    //event.target.pauseVideo();
  };

  const onPlayerStateChange = (event) => {
    console.log("Player state changed:", event.data);
    if (event.data === 1) setIsPlaying(true); // Playing
    if (event.data === 2) setIsPlaying(false); // Paused
  };

  const handleVideoChange = () => {
    const url = document.getElementById("videoUrl").value;
    const extractedId = extractVideoId(url); // Extract the ID from the URL
    if (extractedId) setVideoId(extractedId);
    else alert("Invalid YouTube URL");
  };

  const extractVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="youtube-container-full">
      <h1>Enter The URL</h1>
      <div className="youtube-bar">
        <input
          id="videoUrl"
          type="text"
          defaultValue="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
        <button onClick={handleVideoChange}>Load Video</button>
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

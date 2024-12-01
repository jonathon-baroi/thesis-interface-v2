import { useState, useRef } from "react";
import "./App.css";
import TimestampBar from "./components/TimestampBar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import YouTubePlayer from "./components/YouTubePlayer";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState();
  const playVideo = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      setIsPlaying(true);
      console.log("Playing!");
    }
  };
  const pauseVideo = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
      console.log("Paused!");
    }
  };
  const getCurrentTime = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      console.log("Current time:", currentTime);
      return currentTime;
    } else {
      console.log("Player is not ready");
      return 0;
    }
  };
  return (
    <>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={30} minSize={20}>
          <YouTubePlayer
            isPlaying={isPlaying}
            playerRef={playerRef}
            setIsPlaying={setIsPlaying}
          />
        </Panel>
        <PanelResizeHandle className="divider" />
        <Panel defaultSize={30} minSize={20}>
          <TimestampBar
            isPlaying={isPlaying}
            playerRef={playerRef}
            playVideo={playVideo}
            pauseVideo={pauseVideo}
            getCurrentTime={getCurrentTime}
            setIsPlaying={setIsPlaying}
          />
        </Panel>
      </PanelGroup>
    </>
  );
}

export default App;

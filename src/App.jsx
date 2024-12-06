import { useState, useRef } from "react";
import "./App.css";
import TimestampBar from "./components/TimestampBar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import YouTubePlayer from "./components/YouTubePlayer";
import YouTube from "react-youtube";
function App() {
  const [videoId, setVideoId] = useState("dQw4w9WgXcQ"); // Default video ID
  const [inputUrl, setInputURL] = useState(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  );

  const handleVideoChange = (url) => {
    //console.log("THE URL IS FIRST: ", url);
    const extractedId = extractVideoId(url); // Extract the ID directly from the passed URL
    if (extractedId) setVideoId(extractedId);
    else alert("Invalid YouTube URL");
  };

  const extractVideoId = (url) => {
    //console.log("THE URL IS: ", url);
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState();
  const fileInputRef = useRef(null); // Reference to the hidden file input
  const playVideo = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      setIsPlaying(true);
      console.log("Playing!");
    }
  };
  const openFilePicker = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input click
  };
  const [timestamps, setTimestamps] = useState([
    //{ emotion: "Neutral", gender: "Male", duration: 3 }
  ]);
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
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  );
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          console.log("Uploaded JSON Data:", jsonData);

          // Map over the timestamps and adjust the key names
          const updatedTimestamps = jsonData.timestamps.map((timestamp) => ({
            ...timestamp,
            startTime: timestamp.start, // Rename 'start' to 'startTime'
            // Optionally, you can also remove the old 'start' key if needed
          }));

          setTimestamps(updatedTimestamps); // Update timestamps state
          const newUrl = jsonData.videoUrl; // Get the new URL from the JSON
          setInputURL(newUrl); // Update input URL state
          handleVideoChange(newUrl); // Pass the new URL directly
        } catch (error) {
          console.error("Invalid JSON file:", error);
          alert("Failed to parse JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const downloadJSON = () => {
    // Map the timestamps array to include only the required fields
    const jsonData = {
      videoUrl: inputUrl,
      timestamps: timestamps.map(
        ({ emotion, gender, duration, startTime, id }) => ({
          start: startTime,
          duration,
          emotion,
          gender,
          id,
        })
      ),
    };

    // Convert the data to a JSON string
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Function to handle file upload

    // Function to open the file picker

    // Create a Blob object
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "timestamps.json"; // Name of the downloaded file
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };
  return (
    <>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={30} minSize={20}>
          <YouTubePlayer
            isPlaying={isPlaying}
            playerRef={playerRef}
            setIsPlaying={setIsPlaying}
            setVideoUrl={setVideoUrl}
            handleVideoChange={handleVideoChange}
            inputUrl={inputUrl}
            setInputURL={setInputURL}
            videoId={videoId}
          />
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "center",

              padding: "60px",
            }}
          >
            <div style={{ paddingRight: "100px" }}>
              <button
                className="option-button more-width"
                onClick={downloadJSON}
              >
                SAVE JSON
              </button>
            </div>
            <div>
              {/* Hidden File Input */}
              <input
                type="file"
                accept="application/json"
                ref={fileInputRef} // Attach reference
                style={{ display: "none" }} // Hide the input
                onChange={handleFileUpload} // Handle file selection
              />
              {/* Button to Open File Picker */}
              <button
                className="option-button more-width"
                onClick={openFilePicker}
              >
                LOAD JSON
              </button>
              {/* Display Uploaded Timestamps
            <div style={{ marginTop: "20px" }}>
              <h2>Uploaded Data:</h2>
              <pre>{JSON.stringify(timestamps, null, 2)}</pre>
            </div>*/}
            </div>
          </div>
        </Panel>
        <PanelResizeHandle className="divider" />
        <Panel defaultSize={30} minSize={30}>
          <TimestampBar
            isPlaying={isPlaying}
            playerRef={playerRef}
            playVideo={playVideo}
            pauseVideo={pauseVideo}
            getCurrentTime={getCurrentTime}
            setIsPlaying={setIsPlaying}
            timestamps={timestamps}
            setTimestamps={setTimestamps}
          />
        </Panel>
      </PanelGroup>
    </>
  );
}

export default App;

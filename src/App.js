import React, { useState, useEffect, useRef} from "react";
import './App.css';
import Button from "./components/Button.js";
import Dropdown from "./components/Dropdown.js";
import ImageTable from "./components/ImageTable.js";
import InputBox from "./components/InputBox.js";

const backend = "http://127.0.0.1:3000";
// const backend = "https://mvs-data-vis.onrender.com";

const titleStyles = {
  "fontFamily": "monaco, monospace",
  "padding": "10px",
  "border": "none",
  "borderRadius": "10px",
  "boxShadow": "0 0 5px rgba(0, 0, 0, 0.3)",
  "cursor": "pointer",
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center' 
}

function App() {
  const [images, setImages] = useState([]);
  const [currIndex, setIndex] = useState('000000');
  const [scenes, setScenes] = useState([]);
  const [poses, setPoses] = useState([]);
  const [scene, setScene] = useState('');
  const [pose, setPose] = useState('');
  const inputRef = useRef(null);

  // Changes images when index changes
  function updateFilepath(index) {
    if (index < 0) return;
    const newIndex = String(index).padStart(6, '0');
    const url = `${backend}/${scene}/${pose}/${newIndex}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (!data.success) return;
        setIndex(newIndex);
        setImages(data.image_data);
      }).catch(error => console.error(error));
  }

  useEffect(() => {
    fetch(`${backend}/getscenes`)
      .then(response => response.json())
      .then(data => {
        if (!data.success) return;
        setScenes(data.scenes);
      }).catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (!scene) return;
    fetch(`${backend}/getposes/${scene}`)
      .then(response => response.json())
      .then(data => {
        if (!data.success) return;
        setPoses(data.poses);
      }).catch(error => console.error(error));
  }, [scene]);

  const changeScene = (event) => {
    setScene(event.target.value);
  };

  const changePose = (event) => {
    setPose(event.target.value);
  };

  return (
    <div className="App">
      <div style={titleStyles}>
        <img src="icon.png" alt="Logo" style={{ height: 50, marginRight: 10 }} />
        <h1>MVS Data Visualizer</h1>
      </div>
      <ImageTable images={images} />

      {/* BOTTOM HALF OF GUI*/}
      <div className="table">
        <div className="column2">
          <Dropdown options={scenes} value={scene} onChange={changeScene} id="scene"/>
          <Dropdown options={poses} value={pose} onChange={changePose} id="pose"/>
          <Button onClick={() => updateFilepath(currIndex)}>Go!</Button>
        </div>
        <div className="column2">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <br></br>
            <InputBox value={currIndex} setValue = {setIndex} id="currIndex" reference={inputRef}/>
            <br></br>
            <div style={{ display: "flex", justifyContent: "space-between"}}>
              <Button onClick={() => updateFilepath(parseInt(currIndex) - 1)}>Previous</Button>
              <Button onClick={() => updateFilepath(parseInt(currIndex) + 1)}>Next</Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
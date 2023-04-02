import React, { useState, useRef} from "react";
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
  const [scene, setScene] = useState('');
  const [pose, setPose] = useState('');
  const inputRef = useRef(null);

  function updateFilepath(scene, pose, index) {
    const url = `${backend}/${scene}/${pose}/${index}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data.success) return;

        setScene(scene);
        setPose(pose);
        setImages(data.image_data);
      })
      .catch(error => console.error(error));
  }

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
          <Dropdown imagePath={imagePath} setPath={setPath} id="imagePath"/>
          <Button onClick={() => updateFilepath(scene, pose, currIndex)}>Go!</Button>
        </div>
        <div className="column2">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <br></br>
            <InputBox value={currIndex} setValue = {setIndex} id="currIndex" reference={inputRef}/>
            <br></br>
            <div style={{ display: "flex", justifyContent: "space-between"}}>
              <Button onClick={() => updateFilepath(scene, pose, parseInt(currIndex) - 1)}>Previous</Button>
              <Button onClick={() => updateFilepath(scene, pose, parseInt(currIndex) + 1)}>Next</Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
import React, { useState, useEffect } from "react";
import './App.css';
import Button from "./components/Button.js";
import Dropdown from "./components/Dropdown.js";
import ImageTable from "./components/ImageTable.js";
import InputBox from "./components/InputBox.js";
import Upload from "./components/Upload.js";
import SendData from "./utils/sendData.js";

// export const backend = "http://localhost:9233";
export const backend = "https://35.245.142.242";

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
  const [imageObjects, setImageObjects] = useState({});
  const [transformations, setTransformations] = useState({});
  const [distances, setDistances] = useState({});
  const [bf, setbf] = useState(0);
  const [currIndex, setIndex] = useState('000000');
  const [scenes, setScenes] = useState([]);
  const [poses, setPoses] = useState([]);
  const [scene, setScene] = useState('');
  const [pose, setPose] = useState('');
  const [upload, setUploaded] = useState(false);

  // Changes images when index changes
  function updateFilepath(index) {
    if (index < 0) return;
    const newIndex = String(index).padStart(6, '0');
    const url = `${backend}/${scene}/${pose}/${newIndex}`;
    //get images
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data.success) return;
        setIndex(newIndex);
        setImages(data.image_data);
      }).catch(error => console.error(error));
    //get camera models
    fetch(`${backend}/cameras`)
      .then(response => response.json())
      .then(data => {
        if (!data.success) return;
        setImageObjects(data.camera_models);
      }).catch(error => console.error(error));
    //get transformations
    fetch(`${backend}/transformations`)
      .then(response => response.json())
      .then(data => {
        if (!data.success) return;
        setTransformations(data.transformations);
      }).catch(error => console.error(error));
    //get distances
    fetch(`${backend}/distances/${scene}/${pose}/${newIndex}`)
      .then(response => response.json())
      .then(data => {
        if (!data.success) return;
        setDistances(data.distances);
        setbf(data.bf);
      }).catch(error => console.error(error));
  }

  //check if dataset is initially set
  useEffect(() => {
    fetch(`${backend}/upload`)
      .then(response => response.json())
      .then(data => {
        setUploaded(data.success);
      }).catch(error => console.error(error));
  }, [])

  //for scene dropdown menu
  useEffect(() => {
    if (!upload) return;
    fetch(`${backend}/getscenes`)
      .then(response => response.json())
      .then(data => {
        if (!data.success) return;
        setScenes(data.scenes);
      }).catch(error => console.error(error));
  }, [upload]);

  // for pose dropdown menu
  useEffect(() => {
    if (!scene) return;
    fetch(`${backend}/getposes/${scene}`)
      .then(response => response.json())
      .then(data => {
        if (!data.success) return;
        setPoses(data.poses);
      }).catch(error => console.error(error));
  }, [scene]);

  const changeScene = (event) => {setScene(event.target.value);};

  const changePose = (event) => {setPose(event.target.value);};

  return (
    <div className="App">
      <div style={titleStyles}>
        <img src="icon.png" alt="Logo" style={{ height: 50, marginRight: 10 }} />
        <h1>MVS Data Visualizer</h1>
      </div>
      <ImageTable imageData={images} imageObjects={imageObjects} 
        transformations={transformations} distances={distances} bf={bf}/>

      {/* BOTTOM HALF OF GUI*/}
      <div className="table">
        <div className="bottomColumn">
          <Dropdown options={scenes} value={scene} onChange={changeScene} id="scene"/>
          <Dropdown options={poses} value={pose} onChange={changePose} id="pose"/>
          <Button onClick={() => updateFilepath(currIndex)}>Go!</Button>
        </div>
        <div className="bottomColumn">
          <Upload onUpload={SendData} setUploaded={setUploaded}/>
        </div>
        <div className="bottomColumn">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <br></br>
            <InputBox value={currIndex} setValue = {setIndex} id="currIndex" onChange={updateFilepath}/>
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
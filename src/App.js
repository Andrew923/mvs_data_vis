import React, { useState } from "react";
import './App.css';

function update_filepath(path) {
  console.log(path);
}

function update_index(index) {
  console.log(index);
}

const styles = {
  "font-family": "monaco, monospace",
  "max-width": "300px",
  "padding": "10px",
  "border": "none",
  "border-radius": "10px",
  "box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)",
  "cursor": "pointer",
  "transition": "transform 0.18s ease-in-out",
};

function InputBox({ default_value, id}) {
  const [value, setValue] = useState(default_value);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <input type="text" value={value} id={id} onChange={handleChange}
     style={styles}/>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} style={styles} 
     onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
     onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
      {children}
    </button>
  );
}

function Image(props) {

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = rect.bottom - e.clientY;

    if (relativeX >= 0 && relativeY >= 0 && relativeX < rect.width && relativeY < rect.height
        && rect.width > 50 && rect.height > 50) {
      props.onMouseMove({ x: relativeX, y: relativeY, cx: relativeX, cy: e.clientY});
    } 
    
  };

  const crosshair = {
    position: "absolute",
    backgroundColor: "red"
  };

  return (
    <div onMouseMove={handleMouseMove} style={{padding: "0px", position: "relative"}}>
      <img
        src={props.src}
        alt=""
        style={{
          maxWidth: "100%",
          height: "auto"
        }}
      />
      <p style={{
          position: "absolute",
          top: "0",
          left: "0",
          backgroundColor: "white",
          padding: "5px",
          border: "1px solid black"
        }}
      >
        {`x: ${props.crosshairPosition.x}, y: ${props.crosshairPosition.y}`}
      </p>
      <div style={{
          ...crosshair,
          top: props.crosshairPosition.cy,
          left: 0,
          width: "100%",
          height: 1,
        }}>
      </div>
      <div style={{
          ...crosshair,
          top: 0,
          left: props.crosshairPosition.cx,
          width: 1,
          height: "100%",
        }}>
      </div>
    </div>
  );
}

function ImageTable(props) {
  const [crosshairPosition, setCrosshairPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (position) => {
    setCrosshairPosition(position);
  };

  const images = props.images.map((image, index) => (
    <div key={index} className="column">
      <Image src={image} onMouseMove={handleMouseMove} crosshairPosition={crosshairPosition}/>
    </div>
  ));

  const numColumns = Math.min(props.images.length, 4);

  const columnWidth = `${100 / numColumns}%`;

  const columns = [];

  for (let i = 0; i < numColumns; i++) {
    const columnImages = images.slice(i * Math.ceil(images.length / numColumns), (i + 1) * Math.ceil(images.length / numColumns));
    columns.push(
      <div key={i} className="column" style={{ width: columnWidth }}>
        {columnImages}
      </div>
    );
  }

  return <div className="table">{columns}</div>;
}

function App() {
  const images = [
    "images/cam0/000000_Fisheye.png",
    "images/cam1/000000_Fisheye.png",
    "images/cam2/000000_Fisheye.png"
  ]
  return (
    <div className="App">
      <ImageTable images={images} />

      {/* BOTTOM HALF OF GUI*/}
      <div className="table">
        <div className="column2">
          <InputBox default_value="image" id="image_path"/>
          <Button onClick={() => update_filepath(document.getElementById("image_path").value)}>Enter</Button>
        </div>
        <div className="column2">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <br></br>
            <InputBox  default_value="000000" id="curr_index"/>
            <br></br>
            <div style={{ display: "flex", justifyContent: "space-between"}}>
              <Button onClick={() => update_index(document.getElementById("curr_index").value)}>Previous</Button>
              <Button onClick={() => update_index(document.getElementById("curr_index").value)}>Next</Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;

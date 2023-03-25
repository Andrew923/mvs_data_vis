import React, { useState, useEffect, useRef} from "react";
import './App.css';

const styles = {
  "fontFamily": "monaco, monospace",
  "maxWidth": "300px",
  "padding": "10px",
  "border": "none",
  "borderRadius": "10px",
  "boxShadow": "0 0 5px rgba(0, 0, 0, 0.3)",
  "cursor": "pointer",
  "transition": "transform 0.18s ease-in-out",
};

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

function InputBox({ value, setValue, id, reference}) {

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <input type="text" value={value} id={id} onChange={handleChange}
     ref={reference} style={styles}/>
  );
}

function Dropdown({imagePath, setPath, id}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/getoptions')
      .then(response => response.json())
      .then(data => setOptions(data.folders))
      .catch(error => console.error(error));
  }, []);

  function handleOptionChange(event) {
    setPath(event.target.value);
  }

  return (
      <select id={id} style={styles} value={imagePath} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
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
      props.onMouseMove({ x: relativeX, y: relativeY, cx: e.clientX - rect.left, cy: e.clientY - rect.top});
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
          ...styles,
          position: "absolute",
          top: "0",
          left: "0",
          backgroundColor: "white",
          padding: "5px",
          border: "1px solid black",
          opacity: 0.8,
          "pointerEvents": "none"
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

  const array = props.images || [];

  const images = array.map((image, index) => (
    <div key={index} className="column">
      <Image src={'data:image/jpeg;base64,' + image} onMouseMove={handleMouseMove} crosshairPosition={crosshairPosition}/>
    </div>
  ));

  const numColumns = Math.min(array.length, 4);

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
  const [images, setImages] = useState([]);
  const [currIndex, setIndex] = useState('000000');
  const [imagePath, setPath] = useState('');
  const inputRef = useRef(null);

  const backend = "https://mvs-data-vis.onrender.com/";

  function updateFilepath(path, index) {
    const url = `${backend}/${path}/${index}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
          setPath(path);
          setImages(data.image_data);
        })
        .catch(error => console.error(error));
  }

  function updateIndex(newIndex, path) {
    const url = `${backend}/indices/${path}`;
    if (parseInt(newIndex) < 0) {return;}

    const index = parseInt(newIndex).toString().padStart(6, '0');
    fetch(url)
        .then(response => response.json())
        .then(data => {
          const min = data.minIndex;
          const max = data.maxIndex;
          if (parseInt(index) >= min && parseInt(index) <= max) {
            setIndex(index);
            updateFilepath(imagePath, currIndex);
            inputRef.current.value = index;
          }
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
          <Button onClick={() => updateFilepath(imagePath, currIndex)}>Enter</Button>
        </div>
        <div className="column2">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <br></br>
            <InputBox value={currIndex} setValue = {setIndex} id="currIndex" reference={inputRef}/>
            <br></br>
            <div style={{ display: "flex", justifyContent: "space-between"}}>
              <Button onClick={() => updateIndex(parseInt(currIndex) - 1, imagePath)}>Previous</Button>
              <Button onClick={() => updateIndex(parseInt(currIndex) + 1, imagePath)}>Next</Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;

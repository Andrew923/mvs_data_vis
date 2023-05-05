import React, { useState} from "react";
import Image from "./Image.js";
import transform from "../utils/transform.js";

function ImageTable({imageData, imageObjects, transformations, distances, bf}) {
    const [crosshair, setCrosshair] = useState({ x: 0, y: 0, px: 0, py: 0});
    const [trueIndex, setIndex] = useState("");
    const [size, setSize] = useState({});
  
    const handleMouseMove = (position) => {
      setCrosshair(position);
    };
    
    const cameraIndices = Object.keys(imageData) || [];

    const images = cameraIndices.map((index) => {
      const data = imageData[index];
      const camera =  imageObjects[index];

      // Transformation matrix is from true index to current index
      const transformation = index !== trueIndex ? transformations[`${index}-${trueIndex}`] : null;
      const truth = transformation ? 
        transform(crosshair, camera, transformation, 
          distances[index], bf, size) : crosshair;
      
      return (
        <div key={index} className="column">
          <Image src={'data:image/jpeg;base64,' + data} onMouseMove={handleMouseMove} 
            crosshair={crosshair} fields={camera} id={index} setIndex={setIndex} 
            groundTruth={truth} size={size} setSize={setSize}/>
        </div>
      );
    });
  
    const numColumns = Math.min(cameraIndices.length, 4);
  
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

  export default ImageTable;
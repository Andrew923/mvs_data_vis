import React, { useState} from "react";
import Image from "./Image.js"

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

  export default ImageTable;
import React from "react";
import Crosshair from "./Crosshair";

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

function Image(props) {

    const handleMouseMove = (e) => {
      const rect = e.target.getBoundingClientRect();
      props.setSize(rect);

      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      if (relativeX >= 0 && relativeY >= 0 && relativeX < rect.width && relativeY < rect.height
          && rect.width === rect.height) {
        const px = Math.round((relativeX / rect.width) * 2 * props.fields.cx);
        const py = Math.round((relativeY / rect.height) * 2 * props.fields.cy);
        props.onMouseMove({ x: relativeX, y: relativeY, px: px, py: py});
        props.setIndex(props.id);
      }
    };

    return (
      <div>
        <div onMouseMove={handleMouseMove} style={{
          padding: "0px", 
          position: "relative", 
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"}}>
          <img src={props.src} alt="" style={{maxWidth: "100%", height: "auto"}}/>
          {/* crosshair for pixel location */}
          <Crosshair x={props.crosshair.x} y={props.crosshair.y} color="green"/>
          {/* crosshair for ground truth */}
          <Crosshair x={props.groundTruth.x} y={props.groundTruth.y} color="red"/>
        </div>
        <p style={{
              ...styles,
              maxWidth: "100%",
              position: "relative",
              textAlign: "center",
              backgroundColor: "white",
              padding: "5px",
              border: "1px solid black",
              opacity: 0.8,
              "pointerEvents": "none"
            }}
          >
            {`${props.id}`}
            <br></br>
            {`Green x: ${props.crosshair.px}, y: ${props.crosshair.py}`}
            <br></br>
            {`Red x: ${Math.round(props.groundTruth.px)}, y: ${Math.round(props.groundTruth.py)}`}
            
          </p>
      </div>
      
    );
}

export default Image;
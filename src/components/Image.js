import React from "react";
import styles from "../styles.js";

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
      <div onMouseMove={handleMouseMove} style={{
        padding: "0px", 
        position: "relative", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"}}>
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
            position: "relative",
            textAlign: "center",
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

export default Image;
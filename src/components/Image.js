import React from "react";

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
      const relativeX = e.clientX - rect.left;
      const relativeY = rect.bottom - e.clientY;
      if (relativeX >= 0 && relativeY >= 0 && relativeX < rect.width && relativeY < rect.height
          && rect.width === rect.height) {
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
          {`Virtual x: ${props.crosshairPosition.x}, Virtual y: ${props.crosshairPosition.y}`}
        </p>
        <div style={{
            ...crosshair,
            top: props.crosshairPosition.cy,
            left: 0,
            width: "100%",
            height: 1,
            "pointerEvents": "none"
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
import React from "react";

function Crosshair({x, y, color}) {
    const crosshairStyles = {
        position: "absolute",
        backgroundColor: color,
        "pointerEvents": "none"
      };

    return <div>
        <div style={{
            ...crosshairStyles,
            top: y,
            left: 0,
            width: "100%",
            height: 1,
          }}>
        </div>
        <div style={{
            ...crosshairStyles,
            top: 0,
            left: x,
            width: 1,
            height: "100%",
          }}></div>
    </div>
}

export default Crosshair;
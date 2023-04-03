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

function Button({ onClick, children }) {
    return (
      <button onClick={onClick} style={styles} 
       onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
       onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
        {children}
      </button>
    );
}

export default Button;
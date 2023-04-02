import React from "react";
import styles from "../styles.js";

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
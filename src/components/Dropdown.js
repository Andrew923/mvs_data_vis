import React, { useState, useEffect} from "react";
import styles from "../styles.js"
import backend from "../App.js";

function Dropdown({imagePath, setPath, id}) {
    const [options, setOptions] = useState([]);
  
    useEffect(() => {
      fetch(`${backend}/getoptions`)
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

export default Dropdown;
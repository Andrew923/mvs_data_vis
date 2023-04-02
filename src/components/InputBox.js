import React from "react";
import styles from "../styles.js";

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

export default InputBox;
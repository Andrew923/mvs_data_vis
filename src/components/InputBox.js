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

function InputBox({ value, setValue, id, onChange}) {

    const handleChange = (event) => {
      const newValue = event.target.value;
      setValue(newValue);
    };

    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        if (value.length !== 6) alert("Please enter a valid index");
        else onChange(value);
      }
    }
  
    return (
      <input type="text" value={value} id={id} onChange={handleChange}
       onKeyDown={handleKeyPress} style={styles}/>
    );
}

export default InputBox;
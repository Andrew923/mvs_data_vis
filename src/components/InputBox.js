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
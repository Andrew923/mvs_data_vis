import React, { useRef } from "react";
import Button from "./Button.js"

function Upload({ onUpload, setUploaded }) {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        setUploaded(false);
        const files = event.target.files;
        if (files.length > 0) {
            setUploaded(onUpload(files) === true);
        } else console.log("No file selected");
    };

    return (
        <div>
            <Button onClick={handleButtonClick}>Choose Data</Button>
            <input
                type="file"
                webkitdirectory="true"
                onChange={handleFileChange}
                style={{ display: "none" }}
                ref={fileInputRef}
            />
        </div>
    );
}

export default Upload;
import React, { useState, useRef } from "react";
import Button from "./Button.js"

function Upload({ onUpload, setUploaded }) {
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        setUploaded(false);
        const files = event.target.files;
        if (files.length > 0) {
            const success = await onUpload(files, setLoading)
            console.log(`Upload ${success}`);
            setUploaded(success === true);
        } else console.log("No file selected");
    };

    return (
        <div>
            {loading ? <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                :<Button onClick={handleButtonClick}>Choose Data</Button>}
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

// export default Upload;
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";

function Photo({ setFoto }) {
  const webcamRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [cameraOn, setCameraOn] = useState(true);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedPhoto(imageSrc);
    setFoto(imageSrc); 
    setCameraOn(false); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px" }}>
      {cameraOn && (
        <div style={{ width: "100%", maxWidth: "500px", marginBottom: "16px" }}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", padding: "16px" }}> 
      <Button
        variant="contained"
        color="primary"
        onClick={capture}
        style={{ margin: "8px" }}
      >
        Capturar
      </Button>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="upload-photo"
      />
      <label htmlFor="upload-photo">
        <Button
          variant="contained"
          component="span"
          style={{ margin: "8px" }}
        >
          Subir foto
        </Button>
      </label>

      </div>
    </div>
  );
}

export default Photo;

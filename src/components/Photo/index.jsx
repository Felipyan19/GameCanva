import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";

function Photo({ setFoto }) {
  const webcamRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(true);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = dataURItoBlob(imageSrc);
    setFoto(blob);
    setCameraOn(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/png" });
  };

  return (
    <div style={{  padding: "16px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {cameraOn && (
          <div style={{  maxWidth: "500px", marginBottom: "16px" }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}> 
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
    </div>
  );
}

export default Photo;

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";

function Photo({ setFoto, setCameraOn, cameraOn }) {
  const webcamRef = useRef(null);

  const [photoPreview, setPhotoPreview] = useState(null); // Estado para la vista previa de la foto

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = dataURItoBlob(imageSrc);
    setFoto(blob);
    setCameraOn(false);
    setPhotoPreview(imageSrc); // Establecer la vista previa de la foto capturada
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setCameraOn(false);
    setPhotoPreview(URL.createObjectURL(file)); // Establecer la vista previa de la foto seleccionada
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
    <div style={{ padding: "16px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {cameraOn && (
          <div style={{ maxWidth: "70vw", marginBottom: "16px" }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          </div>
        )}
        {photoPreview && ( // Mostrar la vista previa de la foto si está disponible
          <img src={photoPreview} alt="Vista previa de la foto" style={{ maxWidth: "100%" }} />
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

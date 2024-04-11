import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

function Photo() {
  const webcamRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [cameraOn, setCameraOn] = useState(true);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedPhoto(imageSrc);
    localStorage.setItem('capturedPhoto', imageSrc);
    setCameraOn(false); // Apagar la cámara después de capturar la foto
  };

  return (
    <div>
      {cameraOn && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: '100%', maxWidth: '500px' }}
        />
      )}
      {cameraOn && <button onClick={capture}>Capturar</button>}
      {capturedPhoto && <img src={capturedPhoto} alt="Captured" />}
    </div>
  );
}

export default Photo;
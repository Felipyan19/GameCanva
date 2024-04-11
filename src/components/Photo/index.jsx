import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

function Photo() {
  const webcamRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedPhoto(imageSrc);
    localStorage.setItem('capturedPhoto', imageSrc);
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ width: '100%', maxWidth: '500px' }}
      />
      <button onClick={capture}>Capturar</button>
      {capturedPhoto && <img src={capturedPhoto} alt="Captured" />}
    </div>
  );
}

export default Photo;
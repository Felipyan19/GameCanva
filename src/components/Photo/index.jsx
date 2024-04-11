import React, { useRef, useState } from 'react';

function Photo() {
  const videoRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const handleCapture = () => {
    const video = videoRef.current;

    if (video && video.srcObject) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      // Configurar el tamaño del lienzo para que coincida con el tamaño del video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Dibujar el fotograma actual del video en el lienzo
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convertir la imagen del lienzo a base64
      const imageDataURL = canvas.toDataURL('image/jpeg');

      // Guardar la imagen en el localStorage
      localStorage.setItem('capturedPhoto', imageDataURL);

      // Actualizar el estado para mostrar la imagen capturada
      setCapturedPhoto(imageDataURL);
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay />
      <button onClick={handleCapture}>Capturar</button>
      {capturedPhoto && <img src={capturedPhoto} alt="Captured" />}
    </div>
  );
}

export default Photo;
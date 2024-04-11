import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { animateScroll as scroll } from 'react-scroll';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    scroll.scrollToTop({
      duration: 500, // Duración de la animación en milisegundos
      smooth: 'easeInOutQuart', // Tipo de suavizado
    });
  }, [pathname]);

  return null;
}

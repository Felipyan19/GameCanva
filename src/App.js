import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "../src/utils/ScrollToTop";
import Home from "./pages/Home";
import Historico from "./pages/Historico/index";
import Posiciones from "./pages/Posiciones";
import Register from "./pages/Register";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registrarse" element={<Register />} />
        <Route path="/Historico" element={<Historico />} />
        <Route path="/Posiciones" element={<Posiciones />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
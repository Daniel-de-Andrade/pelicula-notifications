import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notificacoes from "../pages/Notificacoes";
import Peliculas from "../pages/Peliculas";
import Usuarios from "../pages/Usuarios";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/peliculas" element={<Peliculas />} />
        <Route path="/notificacoes" element={<Notificacoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;

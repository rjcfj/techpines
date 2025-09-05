import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/dashboard/Dashboard"
import SugerirCreate from "./pages/sugerir/SugerirCreate"
import MusicaList from "./pages/musicas/MusicaList"
import MusicaCreate from "./pages/musicas/MusicaCreate"
import MusicaEdit from "./pages/musicas/MusicaEdit"
import MusicaShow from "./pages/musicas/MusicaShow"

import UsuarioList from "./pages/usuarios/UsuarioList"
import UsuarioCreate from "./pages/usuarios/UsuarioCreate"
import UsuarioEdit from "./pages/usuarios/UsuarioEdit"
import UsuarioShow from "./pages/usuarios/UsuarioShow"
import Login from "./pages/Login"
import Registration from "./pages/Registration"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="musica/link" element={<SugerirCreate />} />
        <Route path="/musica" element={<MusicaList />} />
        <Route path="musica/novo" element={<MusicaCreate />} />
        <Route path="musica/editar/:id" element={<MusicaEdit />} />
        <Route path="musica/mostrar/:id" element={<MusicaShow />} />
        <Route path="/usuario" element={<UsuarioList />} />
        <Route path="usuario/novo" element={<UsuarioCreate />} />
        <Route path="usuario/editar/:id" element={<UsuarioEdit />} />
        <Route path="usuario/mostrar/:id" element={<UsuarioShow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
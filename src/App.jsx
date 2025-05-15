import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material';

import RegistrarMascota from './pages/RegistrarMascota';
import ReportarExtravio from './pages/ReportarExtravio';
import Notificaciones from './pages/Notificaciones';
import CrearUsuario from './pages/CrearUsuario';
import ReportarHallazgo from './pages/ReportarHallazgo';
import Login from './pages/Login';
import ListadoMascotas from './pages/ListadoMascotas';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tokenStorage = JSON.parse(localStorage.getItem('token') ?? null);
    if(!tokenStorage && location.pathname !== '/login' && location.pathname !== '/sigup') {
      if(location.pathname !== '/login') {
        navigate('/sigup');
      }

      navigate('/login');
    }
  }, [navigate, location.pathname]);

  return (
    <>
     {location.pathname !== '/login' && location.pathname !== '/sigup' && (
      <AppBar position="static" color="primary">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PetApp
          </Typography>
          <Button color="inherit" component={Link} to="/agregarmacota">Registrar Mascota</Button>
          <Button color="inherit" component={Link} to="/extravio">Reportar Extravío</Button>
          <Button color="inherit" component={Link} to="/notificaciones">Notificaciones</Button>
          <Button color="inherit" component={Link} to="/hallazgo">Reportar Hallazgo</Button>
        </Toolbar>
      </AppBar>
     )}

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sigup" element={<CrearUsuario />} />
          <Route path="/" element={<ListadoMascotas />} />
          <Route path="/agregarmacota" element={<RegistrarMascota />} />
          <Route path="/extravio" element={<ReportarExtravio />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/hallazgo" element={<ReportarHallazgo />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
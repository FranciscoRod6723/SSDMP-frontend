import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material';

import RegistrarMascota from './pages/RegistrarMascota';
import ReportarExtravio from './pages/ReportarExtravio';
import Notificaciones from './pages/Notificaciones';
import CrearUsuario from './pages/CrearUsuario';
import ReportarHallazgo from './pages/ReportarHallazgo';


function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user) {
      setUsuario(user);
    }
  }, []);

  if (!usuario) {
    return <CrearUsuario onUsuarioCreado={setUsuario} />;
  }

  return (
    <Router>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PetApp
          </Typography>
          <Button color="inherit" component={Link} to="/">Registrar Mascota</Button>
          <Button color="inherit" component={Link} to="/extravio">Reportar Extravío</Button>
          <Button color="inherit" component={Link} to="/notificaciones">Notificaciones</Button>
          <Button color="inherit" component={Link} to="/hallazgo">Reportar Hallazgo</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<RegistrarMascota />} />
          <Route path="/extravio" element={<ReportarExtravio />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/hallazgo" element={<ReportarHallazgo />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

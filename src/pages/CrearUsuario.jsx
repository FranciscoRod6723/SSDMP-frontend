import React, { useState } from 'react';
import API from '../api'; // Asegúrate que tu instancia esté bien
import {
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Alert
} from '@mui/material';

function CrearUsuario({ onUsuarioCreado }) {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ubicacion: '',
  });

  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);
    try {
      await API.post('/usuarios', form); // Ajusta según tu backend real
      localStorage.setItem('usuario', JSON.stringify(form));
      onUsuarioCreado(form);
      setMensaje('Usuario creado correctamente');
    } catch (err) {
      console.error(err);
      setError('Error al crear el usuario');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Crear Usuario
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField name="nombre" label="Nombre" onChange={handleChange} value={form.nombre} required fullWidth />
          <TextField name="email" label="Correo Electrónico" type="email" onChange={handleChange} value={form.email} required fullWidth />
          <TextField name="telefono" label="Teléfono" onChange={handleChange} value={form.telefono} required fullWidth />
          <TextField name="ubicacion" label="Ubicación" onChange={handleChange} value={form.ubicacion} required fullWidth />
          <Button variant="contained" type="submit">Crear Usuario</Button>
          {mensaje && <Alert severity="success">{mensaje}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </form>
    </Paper>
  );
}

export default CrearUsuario;

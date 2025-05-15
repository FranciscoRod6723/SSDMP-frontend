import React, { useState } from 'react';
import API from '../api';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Alert
} from '@mui/material';

function ReportarExtravio() {
  const [form, setForm] = useState({
    mascota_id: '',
    usuario_id: '',
    fecha_reporte: '',
    ubicacion: '',
    recompensa: '',
    descripcion: '',
  });

  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);
    try {
      await API.post('/reportes/extravio', form);
      setMensaje('Reporte de extravío enviado correctamente');
    } catch (error) {
      console.error(error);
      setError('Hubo un error al enviar el reporte');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Reportar Mascota Perdida
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField name="mascota_id" label="ID de la mascota" onChange={handleChange} required fullWidth />
          <TextField name="usuario_id" label="ID del usuario" onChange={handleChange} required fullWidth />
          <TextField name="fecha_reporte" label="Fecha de reporte" type="date" InputLabelProps={{ shrink: true }} onChange={handleChange} required fullWidth />
          <TextField name="ubicacion" label="Ubicación" onChange={handleChange} required fullWidth />
          <TextField name="recompensa" label="Recompensa" type="number" onChange={handleChange} fullWidth />
          <TextField
            name="descripcion"
            label="Descripción del caso"
            multiline
            rows={4}
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" color="primary" type="submit">
            Enviar Reporte
          </Button>
          {mensaje && <Alert severity="success">{mensaje}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </form>
    </Paper>
  );
}

export default ReportarExtravio;

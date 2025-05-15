import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Alert
} from '@mui/material';
import API from '../api';

function ReportarHallazgo() {
  const [form, setForm] = useState({
    descripcion: '',
    ubicacion: '',
    fecha_hallazgo: '',
    mascota_id: '',
    usuario_id: '',
  });

  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  // Cargar ID de usuario desde localStorage si existe
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user) {
      setForm(prev => ({ ...prev, usuario_id: user.email || user.id || '' }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);
    try {
      await API.post('/reportes/hallazgo', form); // Ajusta la ruta si es diferente
      setMensaje('Reporte de hallazgo enviado correctamente');
      setForm({
        descripcion: '',
        ubicacion: '',
        fecha_hallazgo: '',
        mascota_id: '',
        usuario_id: form.usuario_id,
      });
    } catch (err) {
      console.error(err);
      setError('Error al enviar el reporte de hallazgo');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Reportar Hallazgo de Mascota
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="ID de la mascota"
            name="mascota_id"
            value={form.mascota_id}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Ubicación"
            name="ubicacion"
            value={form.ubicacion}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Fecha del hallazgo"
            name="fecha_hallazgo"
            type="date"
            value={form.fecha_hallazgo}
            onChange={handleChange}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Descripción"
            name="descripcion"
            multiline
            rows={3}
            value={form.descripcion}
            onChange={handleChange}
            fullWidth
          />
          <Button type="submit" variant="contained">
            Enviar Reporte
          </Button>
          {mensaje && <Alert severity="success">{mensaje}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </form>
    </Paper>
  );
}

export default ReportarHallazgo;

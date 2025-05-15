import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Stack, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Controllers } from '../controllers';

export default function RegistrarMascota() {
  const [form, setForm] = useState({
    nombre: '',
    raza: '',
    edad: 0,
    ubicacion: '',
    color: '',
    estado: '',
  });

  const navigate = useNavigate();
  const controllers = Controllers('dev');

  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);
    const user_id = JSON.parse(localStorage.getItem('user_id') ?? null);

    const res = await controllers.mascotas.agregar({ ...form, usuario_id: user_id});

    console.log(res)

    if(!res.success) {
      alert(res.message);
    }

    navigate('/');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" mb={2}>Registrar Mascota</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField name='nombre' label="Nombre de la mascota" variant="outlined" onChange={handleChange} value={form.nombre} required fullWidth />
          <TextField name="raza" label="Raza" variant="outlined" onChange={handleChange} value={form.raza} required fullWidth />
          <TextField name="edad" label="Edad" type="number" variant="outlined" onChange={handleChange} value={form.edad} required fullWidth />
          <TextField name='color' label="Color" variant="outlined" onChange={handleChange} value={form.color} required fullWidth />
          <TextField name='estado' label="Estado" variant="outlined" onChange={handleChange} value={form.estado} required fullWidth />
          <TextField name='ubicacion' label="Ubicacion" variant="outlined" onChange={handleChange} value={form.ubicacion} required fullWidth />
          <Button variant="contained" type="submit">Registrar</Button>
          {mensaje && <Alert severity="success">{mensaje}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </form>
    </Paper>
  );
}

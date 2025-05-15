import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Controllers } from '../controllers';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

function CrearUsuario() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ubicacion: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

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

    console.log(1)
    
    const res = await controllers.users.singup.register({...form})

    if(!res.success) {
      alert(res.message);
      return;
    }

    const reslogin = await controllers.users.login.login({ email: form.email, password: form.password })

    console.log(reslogin)

    if(!reslogin.success) {
      alert(reslogin.message);
    }

    localStorage.setItem('token', JSON.stringify(reslogin.token));
    navigate('/');

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
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <OutlinedInput
              name="password" label="Contraseña" onChange={handleChange} value={form.password} required fullWidth
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <TextField name="telefono" label="Teléfono" onChange={handleChange} value={form.telefono} required fullWidth />
          <TextField name="ubicacion" label="Ubicación" onChange={handleChange} value={form.ubicacion} required fullWidth />
          <Link to="/login">Logueate</Link>
          <Button variant="contained" type="submit">Crear Usuario</Button>
          {mensaje && <Alert severity="success">{mensaje}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </form>
    </Paper>
  );
}

export default CrearUsuario;

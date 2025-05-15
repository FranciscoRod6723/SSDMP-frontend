import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Alert
} from '@mui/material';
import { Controllers } from '../controllers';
import { Link, useNavigate} from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({
    password: '',
    email: '',
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

    const res = await controllers.users.login.login({...form})

    console.log(res)

    if(!res.success) {
      alert(res.message);
    }

    localStorage.setItem('token', JSON.stringify(res.token));
    localStorage.setItem('user_id', JSON.stringify(res.id));
    navigate('/');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField name="email" label="Correo Electrónico" type="email" onChange={handleChange} value={form.email} required fullWidth />
          <TextField name="password" label="Contraseña" onChange={handleChange} value={form.password} required fullWidth />
          <Link to="/sigup">Crea tu cuenta</Link>
          <Button variant="contained" type="submit">login</Button>
          {mensaje && <Alert severity="success">{mensaje}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </form>
    </Paper>
  );
}

export default Login;

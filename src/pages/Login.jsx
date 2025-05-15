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
import { Link, useNavigate} from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({
    password: '',
    email: '',
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

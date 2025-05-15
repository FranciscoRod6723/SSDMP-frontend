import React from 'react';
import { TextField, Button, Paper, Typography, Stack } from '@mui/material';

export default function RegistrarMascota() {
  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" mb={2}>Registrar Mascota</Typography>
      <Stack spacing={2}>
        <TextField label="Nombre de la mascota" variant="outlined" fullWidth />
        <TextField label="Raza" variant="outlined" fullWidth />
        <TextField label="Edad" type="number" variant="outlined" fullWidth />
        <Button variant="contained" color="primary" fullWidth>
          Registrar
        </Button>
      </Stack>
    </Paper>
  );
}

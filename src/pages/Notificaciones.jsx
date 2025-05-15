import React, { useEffect, useState } from 'react';
import API from '../api';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider
} from '@mui/material';

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await API.get('/consultas/notificaciones');
        setNotificaciones(response.data);
      } catch (error) {
        console.error('Error al obtener notificaciones:', error);
      }
    };

    fetchNotificaciones();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Notificaciones
      </Typography>
      {notificaciones.length === 0 ? (
        <Typography variant="body1">No hay notificaciones por el momento.</Typography>
      ) : (
        <List>
          {notificaciones.map((n, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={n.mensaje}
                  secondary={new Date(n.fecha).toLocaleString()}
                />
              </ListItem>
              {index < notificaciones.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );
}

export default Notificaciones;

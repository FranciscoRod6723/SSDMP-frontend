import React, { useState, useEffect } from 'react';
import { Controllers } from '../controllers';

const ListadoMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);

  const controllers = Controllers('dev');

  useEffect(() => {
    async function fetchMascotas() {
      const res = await controllers.mascotas.lista();
      setMascotas(res.mascotas ?? []);
      setLoading(false);
    }
  
    fetchMascotas();
  }, []);

  const tablaEstilo = {
    borderCollapse: 'collapse',
    width: '80%',
    margin: '30px auto',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const thEstilo = {
    backgroundColor: '#FFD700', // Dorado
    color: '#333',
    padding: '12px',
    textAlign: 'left',
  };

  const tdEstilo = {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    color: '#555',
  };

  const filaPar = {
    backgroundColor: '#fff8dc', // color crema claro para filas pares
  };

  const encabezado = {
    textAlign: 'center',
    marginTop: '20px',
    color: '#444',
  };

  const loaderStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: '40px',
  };

  return (
    <>
      {loading ? (
        <div style={loaderStyle}>Cargando mascotas...</div>
      ) : (
        <div>
            <h2 style={encabezado}>Listado de Mascotas</h2>
            <table style={tablaEstilo}>
                <thead>
                <tr>
                    <th style={thEstilo}>Nombre</th>
                    <th style={thEstilo}>Raza</th>
                    <th style={thEstilo}>Color</th>
                    <th style={thEstilo}>Edad</th>
                    <th style={thEstilo}>Estado</th>
                    <th style={thEstilo}>Ubicación</th>
                </tr>
                </thead>
                <tbody>
                {mascotas.map((m, i) => (
                    <tr key={m.mascota_id} style={i % 2 === 0 ? filaPar : {}}>
                    <td style={tdEstilo}>{m.nombre}</td>
                    <td style={tdEstilo}>{m.raza}</td>
                    <td style={tdEstilo}>{m.color}</td>
                    <td style={tdEstilo}>{m.edad}</td>
                    <td style={tdEstilo}>{m.estado}</td>
                    <td style={tdEstilo}>{m.ubicacion ?? 'Sin ubicación'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
      )}
    </>
  );
};

export default ListadoMascotas;

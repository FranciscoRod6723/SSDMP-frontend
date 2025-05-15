import React, { useState, useEffect } from 'react';
import { Controllers } from '../controllers';
import Swal from 'sweetalert2';

const ListadoMascotas = () => {
    const [mascotas, setMascotas] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = JSON.parse(localStorage.getItem('token') ?? null);
    const controllers = Controllers('dev', token);

    useEffect(() => {
        fetchMascotas();
    }, []);

    async function fetchMascotas() {
        const res = await controllers.mascotas.lista();
        setMascotas(res.mascotas ?? []);
        setLoading(false);
    }

    const eliminarMascota = (id) => {
        Swal.fire({
            title: "¿Seguro quieres eliminar la mascota?",
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            denyButtonText: `eliminar`,
        }).then( async (result) => {
            if(result.isDenied) {
                const res = await controllers.mascotas.eliminar(id);

                if(res.success) {
                    await fetchMascotas();
                }
    
                Swal.fire(res.mensaje);
            }
        });
    };

    const editarMascota = async (id) => {
        const mascota = mascotas.find(m => m.mascota_id === id)

        const { value: formValues } = await Swal.fire({
            title: "Editar",
            showCancelButton: true,
            html: `
              <input id="swal-nombre" class="swal2-input" placeholder="Nombre de la mascota" required value="${mascota.nombre}">
              <input id="swal-raza" class="swal2-input" placeholder="Raza" required value="${mascota.raza}">
              <input id="swal-color" class="swal2-input" placeholder="Color" required value="${mascota.color}">
              <input id="swal-estado" class="swal2-input" placeholder="Estado" required value="${mascota.estado}">
              <input id="swal-edad" class="swal2-input" type="number" placeholder="Edad" required value="${mascota.edad}">
            `,
            focusConfirm: false,
            preConfirm: () => {
              const nombre = document.getElementById("swal-nombre").value;
              const raza = document.getElementById("swal-raza").value;
              const edad = document.getElementById("swal-edad").value;
              const color = document.getElementById("swal-color").value;
              const estado = document.getElementById("swal-estado").value;
        
              if (!nombre || !raza || !edad || !color || !estado) {
                Swal.showValidationMessage("Por favor, completa todos los campos");
                return;
              }
        
              return { nombre, raza, edad, color, estado };
            },
            confirmButtonText: "Editar"
        });   
        
        if (formValues) {
            const res = await controllers.mascotas.editar(id, formValues);

            console.log(res)

            if(res.success) {
                await fetchMascotas();
            }

            Swal.fire(res.mensaje);
        }
    };

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

    const botonEstilo = {
        padding: '6px 12px',
        margin: '0 5px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
    };

    const botonEditar = {
        ...botonEstilo,
        backgroundColor: '#4CAF50',
        color: 'white',
    };

    const botonEliminar = {
        ...botonEstilo,
        backgroundColor: '#f44336',
        color: 'white',
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
                        <th style={thEstilo}>Editar</th>
                        <th style={thEstilo}>Eliminar</th>
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
                        <td style={tdEstilo}>
                            <button
                            style={botonEditar}
                            onClick={() => editarMascota(m.mascota_id)}
                            >
                            Editar
                            </button>
                        </td>
                        <td style={tdEstilo}>
                            <button
                            style={botonEliminar}
                            onClick={() => eliminarMascota(m.mascota_id)}
                            >
                            Eliminar
                            </button>
                        </td>
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

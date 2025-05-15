const API = {
  post: async (url, data) => {
    console.log(`[SIMULADO] POST a ${url}`, data);
    return Promise.resolve({ data: 'ok' });
  },
  get: async (url) => {
    console.log(`[SIMULADO] GET a ${url}`);
    return Promise.resolve({
      data: [
        { mensaje: 'Tu mascota fue vista en el parque.', fecha: new Date().toISOString() },
        { mensaje: 'Nueva mascota registrada.', fecha: new Date().toISOString() },
      ]
    });
  }
};

export default API;

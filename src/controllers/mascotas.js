import Api from '../modules/api.js';

class Mascotas {
    constructor(enviroment = 'dev', apiInstance = null) {
        this.api = apiInstance ?? new Api(enviroment);
    }
  
    async lista() {
      const res = await this.api.get(`/mascotas/data`);
  
      if (!res.ok) {
        return { success: false, message: 'Error en la conexión', error: res.error };
      }
  
      const mascotas = res.data;
  
      return { success: true, mascotas};
    }
}

export default Mascotas;
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

    async agregar(data) {
        const res = await this.api.post(`/mascotas/`, { ...data });
    
        if (!res.ok) {
          return { success: false, message: 'Error en la conexión', error: res.error };
        }
    
        const mascotas = res.data;

        console.log(mascotas)
    
        return { success: true, mascotas};
    }

    async editar(id, data) {
        const res = await this.api.put(`/mascotas/${id}`, { ...data });
    
        if (!res.ok) {
          return { success: false, message: 'Error en la conexión', error: res.error };
        }
    
        const mascotas = res.data;

        if(mascotas.mensaje !== 'Mascota actualizada correctamente'){
            return { success: false, mensaje: mascotas.mensaje};
        }
    
        return { success: true, mensaje: mascotas.mensaje};
    }

    async eliminar(id) {
        const res = await this.api.delete(`/mascotas/${id}`);
    
        if (!res.ok) {
          return { success: false, message: 'Error en la conexión', error: res.error };
        }

        if(res.data.mensaje == 'Mascota eliminada correctamente'){
            return { success: true, mensaje: res.data.mensaje};
        }
        else {
            return { success: false, mensaje: res.data.mensaje};
        }
    }
}

export default Mascotas;
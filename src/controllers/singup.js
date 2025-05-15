import Api from '../modules/api.js';

class Singup {
    constructor(enviroment = 'dev', apiInstance = null) {
      this.api = apiInstance ?? new Api(enviroment);
    }
  
    async register({ nombre, telefono, ubicacion, email, password }) {  
  
      const body = { nombre, telefono, ubicacion, email, password };
  
      const res = await this.api.post('/usuarios/', body);
  
      if (!res.ok) {
        return { success: false, message: 'Registration failed', error: res.error };
      }
  
      return { success: true, message: 'User registered successfully', data: res.data };
    }
}

export default Singup;
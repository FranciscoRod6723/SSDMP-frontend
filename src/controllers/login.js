import Api from '../modules/api.js';

class Login {
    constructor(enviroment = 'dev', apiInstance = null) {
        this.api = apiInstance ?? new Api(enviroment);
    }
  
    async login({email, password}) {
      // Por ejemplo, verificamos si el usuario existe con GET
      const res = await this.api.post(`/usuarios/login`, { email, password });
  
      if (!res.ok) {
        return { success: false, message: 'Error en la conexión', error: res.error };
      }
  
      const usuarios = res.data;
  
      if (usuarios.length === 0 || !usuarios.token) {
        return { success: false, message: 'Usuario no encontrado' };
      }
  
      return { success: true, message: usuarios.mensaje, token: usuarios.token, id: usuarios.usuario_id };
    }
}

export default Login;
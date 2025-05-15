const apiURL =  {
  dev: 'http://localhost:3001',
  prod: 'https://api.example.com',
}

class Api {
  constructor(environment = 'dev', token = '') {
    this.baseURL = apiURL[environment] || apiURL.dev;
    this.token = token;
  }

  _getHeaders(customHeaders = {}) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
      ...customHeaders,
    };
  }

  async get(endpoint) {
    try {
      const response = await fetch(this.baseURL + endpoint, {
        headers: this._getHeaders(),
      });
      if (!response.ok) throw new Error(`Error GET: ${response.status}`);
      const data = await response.json();
      return { ok: true, data };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async post(endpoint, body = {}) {
    try {
      const response = await fetch(this.baseURL + endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: this._getHeaders(),
      });
      if (!response.ok) throw new Error(`Error POST: ${response.status}`);
      const data = await response.json();
      return { ok: true, data };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async put(endpoint, body = {}) {
    try {
      const response = await fetch(this.baseURL + endpoint, {
        method: 'PUT',
        headers: this._getHeaders(),
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error(`Error PUT: ${response.status}`);
      const data = await response.json();
      return { ok: true, data };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async delete(endpoint) {
    try {
      const response = await fetch(this.baseURL + endpoint, {
        method: 'DELETE',
        headers: this._getHeaders(),
      });
      if (!response.ok) throw new Error(`DELETE error: ${response.status}`);
      // Si la respuesta no tiene body, solo retornamos ok:true
      let data = null;
      try {
        data = await response.json();
      } catch {
        // no body
      }
      return { ok: true, data };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}

export default Api;
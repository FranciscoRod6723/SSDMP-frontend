const apiURL =  {
  dev: 'http://localhost:3001',
  prod: 'https://api.example.com',
}

class Api {
  constructor(environment = 'dev') {
    this.baseURL = apiURL[environment] || apiURL.dev;
  }

  async get(endpoint) {
    try {
      const response = await fetch(this.baseURL + endpoint);
      if (!response.ok) throw new Error(`Error GET: ${response.status}`);
      const data = await response.json();
      return { ok: true, data };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async post(endpoint, body = {}, headers = { 'Content-Type': 'application/json' }) {
    try {
      const response = await fetch(this.baseURL + endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error(`Error POST: ${response.status}`);
      const data = await response.json();
      return { ok: true, data };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async put(endpoint, body = {}, headers = { 'Content-Type': 'application/json' }) {
    try {
      const response = await fetch(this.baseURL + endpoint, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error(`Error PUT: ${response.status}`);
      const data = await response.json();
      return { ok: true, data };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}

export default Api;
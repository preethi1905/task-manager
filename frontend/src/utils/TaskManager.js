
const API_BASE_URL = process.env.API_URL || '/api/tasks';

class TaskManager {
  constructor(apiBaseUrl = API_BASE_URL) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async _request(path, options = {}) {
    const response = await fetch(`${this.apiBaseUrl}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `Request failed with status ${response.status}`);
    }

    return response.json();
  }

  async fetchAll(status) {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    return this._request(query, { method: 'GET' });
  }

  async fetchOne(id) {
    return this._request(`/${id}`, { method: 'GET' });
  }

  async create(taskData) {
    return this._request('', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async update(id, updates) {
    return this._request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async setStatus(id, status) {
    const validStatuses = ['todo', 'in-progress', 'done'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status "${status}". Must be one of: ${validStatuses.join(', ')}`);
    }
    return this.update(id, { status });
  }

  async remove(id) {
    return this._request(`/${id}`, { method: 'DELETE' });
  }
}

export default TaskManager;
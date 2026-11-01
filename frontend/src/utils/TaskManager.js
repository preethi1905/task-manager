
/**
 * Determines the normalized base URL for the Task API.
 * Automatically appends '/api/tasks' if only the host URL is provided via env.
 */
const resolveBaseUrl = () => {
  const envUrl = process.env.API_URL;
  if (!envUrl) return '/api/tasks';
  return envUrl.endsWith('/api/tasks')
    ? envUrl
    : `${envUrl.replace(/\/+$/, '')}/api/tasks`;
};

const DEFAULT_API_BASE_URL = resolveBaseUrl();

/**
 * Object-Oriented TaskManager Class
 * Encapsulates all REST API interactions and task lifecycle transitions.
 */
class TaskManager {
  constructor(apiBaseUrl = DEFAULT_API_BASE_URL) {
    this.apiBaseUrl = apiBaseUrl;
  }

  /**
   * Internal HTTP request handler
   */
  async _request(path = '', options = {}) {
    const url = `${this.apiBaseUrl}${path}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `Request failed with status ${response.status}`);
    }

    return response.json();
  }

  /**
   * Fetch all tasks, optionally filtered by status ('todo', 'in-progress', 'done')
   */
  async fetchAll(status) {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    return this._request(query, { method: 'GET' });
  }

  /**
   * Fetch a single task by its ID
   */
  async fetchOne(id) {
    if (!id) throw new Error('Task ID is required');
    return this._request(`/${id}`, { method: 'GET' });
  }

  /**
   * Create a new task
   */
  async create(taskData) {
    if (!taskData || !taskData.title?.trim()) {
      throw new Error('Task title cannot be empty');
    }
    return this._request('', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  /**
   * Update task fields (title, description, priority, dueDate, status)
   */
  async update(id, updates) {
    if (!id) throw new Error('Task ID is required for update');
    return this._request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  /**
   * Update status transition specifically
   */
  async setStatus(id, status) {
    const validStatuses = ['todo', 'in-progress', 'done'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status "${status}". Must be one of: ${validStatuses.join(', ')}`);
    }
    return this.update(id, { status });
  }

  /**
   * Delete a task by its ID
   */
  async remove(id) {
    if (!id) throw new Error('Task ID is required for deletion');
    return this._request(`/${id}`, { method: 'DELETE' });
  }
}

export default TaskManager;

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import TaskManager from '../utils/TaskManager';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

// Initialize TaskManager OOP instance
const taskManager = new TaskManager();

/**
 * Stateful Container Component
 * Handles state management, data fetching, business logic, and API integration.
 */
const TaskListContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch tasks with status filter
  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await taskManager.fetchAll(statusFilter || undefined);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Create new task
  const handleCreate = async (formData) => {
    try {
      const newTask = await taskManager.create(formData);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Update existing task details
  const handleUpdate = async (id, updates) => {
    try {
      const updated = await taskManager.update(id, updates);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // Change task status (To Do, In Progress, Done)
  const handleStatusChange = async (id, status) => {
    try {
      const updated = await taskManager.setStatus(id, status);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await taskManager.remove(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Calculate task statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === 'todo').length;
    const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
    const done = tasks.filter((t) => t.status === 'done').length;
    return { total, todo, inProgress, done };
  }, [tasks]);

  return (
    <div className="task-container">
      <div className="task-container__stats">
        <button
          type="button"
          className={`task-container__stat-pill ${statusFilter === '' ? 'task-container__stat-pill--active' : ''}`}
          onClick={() => setStatusFilter('')}
        >
          All ({stats.total})
        </button>
        <button
          type="button"
          className={`task-container__stat-pill task-container__stat-pill--todo ${statusFilter === 'todo' ? 'task-container__stat-pill--active' : ''}`}
          onClick={() => setStatusFilter('todo')}
        >
          To Do ({stats.todo})
        </button>
        <button
          type="button"
          className={`task-container__stat-pill task-container__stat-pill--in-progress ${statusFilter === 'in-progress' ? 'task-container__stat-pill--active' : ''}`}
          onClick={() => setStatusFilter('in-progress')}
        >
          In Progress ({stats.inProgress})
        </button>
        <button
          type="button"
          className={`task-container__stat-pill task-container__stat-pill--done ${statusFilter === 'done' ? 'task-container__stat-pill--active' : ''}`}
          onClick={() => setStatusFilter('done')}
        >
          Done ({stats.done})
        </button>
      </div>

      <TaskForm onSubmit={handleCreate} />

      <div className="task-container__filter">
        <label htmlFor="status-filter">Status Filter: </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Tasks</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <TaskList
        tasks={tasks}
        onUpdate={handleUpdate}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default TaskListContainer;


import React, { useState, useEffect, useCallback } from 'react';
import TaskManager from '../utils/TaskManager';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const taskManager = new TaskManager();
const TaskListContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

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

  const handleCreate = async (formData) => {
    try {
      const newTask = await taskManager.create(formData);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await taskManager.setStatus(id, status);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await taskManager.remove(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="task-container">
      <TaskForm onSubmit={handleCreate} />

      <div className="task-container__filter">
        <label htmlFor="status-filter">Filter: </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <TaskList
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default TaskListContainer;

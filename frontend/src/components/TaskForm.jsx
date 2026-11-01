import React, { useState } from 'react';
import '../styles/TaskForm.css';

/**
 * Stateless Presentational Component: TaskForm
 * Renders the task creation form and submits newly created task data upward.
 */
const TaskForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      dueDate: form.dueDate || null,
      status: 'todo',
    });

    setForm({ title: '', description: '', priority: 'medium', dueDate: '' });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 className="task-form__title">Create New Task</h2>
      <input
        className="task-form__input"
        type="text"
        name="title"
        placeholder="Task title (required)"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        className="task-form__textarea"
        name="description"
        placeholder="Add task description or details (optional)"
        value={form.description}
        onChange={handleChange}
        rows="2"
      />
      <div className="task-form__row">
        <div className="task-form__field">
          <label className="task-form__label" htmlFor="form-priority">Priority</label>
          <select
            id="form-priority"
            className="task-form__select"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="task-form__field">
          <label className="task-form__label" htmlFor="form-dueDate">Due Date</label>
          <input
            id="form-dueDate"
            className="task-form__date"
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />
        </div>
        <button className="task-form__submit" type="submit">
          + Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;


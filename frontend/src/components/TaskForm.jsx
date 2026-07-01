import React, { useState } from 'react';
import '../styles/TaskForm.css';
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
    onSubmit(form);
    setForm({ title: '', description: '', priority: 'medium', dueDate: '' });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-form__input"
        type="text"
        name="title"
        placeholder="Task title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        className="task-form__textarea"
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
      />
      <div className="task-form__row">
        <select
          className="task-form__select"
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          className="task-form__date"
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
        />
        <button className="task-form__submit" type="submit">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;

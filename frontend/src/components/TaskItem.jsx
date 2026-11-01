import React, { useState } from 'react';
import '../styles/TaskItem.css';

const STATUS_LABELS = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
};

/**
 * Stateless Presentational Component: TaskItem
 * Renders task details, handles local edit mode toggling, and dispatches actions upward.
 */
const TaskItem = ({ task, onUpdate, onStatusChange, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority || 'medium',
    status: task.status || 'todo',
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editForm.title.trim()) return;

    if (onUpdate) {
      onUpdate(task._id, {
        title: editForm.title.trim(),
        description: editForm.description.trim(),
        priority: editForm.priority,
        status: editForm.status,
        dueDate: editForm.dueDate || null,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      title: task.title,
      description: task.description || '',
      priority: task.priority || 'medium',
      status: task.status || 'todo',
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    });
    setIsEditing(false);
  };

  const isOverdue =
    task.dueDate &&
    task.status !== 'done' &&
    new Date(task.dueDate).getTime() < new Date().setHours(0, 0, 0, 0);

  if (isEditing) {
    return (
      <div className={`task-item task-item--editing task-item--${editForm.priority}`}>
        <form className="task-item__edit-form" onSubmit={handleSave}>
          <input
            className="task-item__input"
            type="text"
            name="title"
            value={editForm.title}
            onChange={handleEditChange}
            placeholder="Task title"
            required
          />
          <textarea
            className="task-item__textarea"
            name="description"
            value={editForm.description}
            onChange={handleEditChange}
            placeholder="Task description"
          />
          <div className="task-item__edit-row">
            <select
              className="task-item__select"
              name="priority"
              value={editForm.priority}
              onChange={handleEditChange}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <select
              className="task-item__select"
              name="status"
              value={editForm.status}
              onChange={handleEditChange}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <input
              className="task-item__date"
              type="date"
              name="dueDate"
              value={editForm.dueDate}
              onChange={handleEditChange}
            />
          </div>
          <div className="task-item__edit-actions">
            <button className="task-item__button task-item__button--save" type="submit">
              Save
            </button>
            <button
              className="task-item__button task-item__button--cancel"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div
      className={`task-item task-item--${task.priority} ${
        isOverdue ? 'task-item--overdue' : ''
      }`}
    >
      <div className="task-item__header">
        <h3 className="task-item__title">{task.title}</h3>
        <span className={`task-item__badge task-item__badge--${task.status}`}>
          {STATUS_LABELS[task.status] || task.status}
        </span>
      </div>

      {task.description && <p className="task-item__description">{task.description}</p>}

      <div className="task-item__meta">
        <span className="task-item__priority">
          Priority: <strong>{task.priority}</strong>
        </span>
        {task.dueDate && (
          <span className={`task-item__due ${isOverdue ? 'task-item__due--overdue' : ''}`}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
            {isOverdue && ' (Overdue)'}
          </span>
        )}
      </div>

      <div className="task-item__actions">
        <label className="task-item__select-label" htmlFor={`status-select-${task._id}`}>
          Status:
        </label>
        <select
          id={`status-select-${task._id}`}
          className="task-item__select"
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button
          className="task-item__button task-item__button--edit"
          onClick={() => setIsEditing(true)}
          type="button"
        >
          Edit
        </button>
        <button
          className="task-item__button task-item__button--delete"
          onClick={() => onDelete(task._id)}
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;


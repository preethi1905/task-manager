import React from 'react';
import '../styles/TaskItem.css';

const STATUS_LABELS = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
};

const TaskItem = ({ task, onStatusChange, onDelete }) => {
  return (
    <div className={`task-item task-item--${task.priority}`}>
      <div className="task-item__header">
        <h3 className="task-item__title">{task.title}</h3>
        <span className={`task-item__badge task-item__badge--${task.status}`}>
          {STATUS_LABELS[task.status]}
        </span>
      </div>

      {task.description && <p className="task-item__description">{task.description}</p>}

      <div className="task-item__meta">
        <span className="task-item__priority">Priority: {task.priority}</span>
        {task.dueDate && (
          <span className="task-item__due">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="task-item__actions">
        <select
          className="task-item__select"
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button className="task-item__delete" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

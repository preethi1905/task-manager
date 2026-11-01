import React from 'react';
import TaskItem from './TaskItem';

/**
 * Stateless Presentational Component: TaskList
 * Purely renders the collection of tasks and forwards events upward.
 */
const TaskList = ({ tasks, onUpdate, onStatusChange, onDelete, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="task-list__status">
        <div className="task-list__spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return <p className="task-list__status task-list__status--error">{error}</p>;
  }

  if (!tasks || !tasks.length) {
    return (
      <div className="task-list__status task-list__status--empty">
        <p>No tasks found. Create a new task above to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={onUpdate}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;


import React from 'react';
import TaskItem from './TaskItem';
const TaskList = ({ tasks, onStatusChange, onDelete, isLoading, error }) => {
  if (isLoading) return <p className="task-list__status">Loading tasks...</p>;
  if (error) return <p className="task-list__status task-list__status--error">{error}</p>;
  if (!tasks.length) return <p className="task-list__status">No tasks yet. Add one above.</p>;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;

import React from 'react';
import TaskListContainer from './containers/TaskListContainer';
import './styles/App.css';

const App = () => {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Task Manager</h1>
        <p className="app__subtitle">Full-Stack Task Management System</p>
      </header>
      <main className="app__main">
        <TaskListContainer />
      </main>
    </div>
  );
};

export default App;

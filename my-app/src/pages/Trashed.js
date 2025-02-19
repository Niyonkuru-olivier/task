// src/pages/Trashed.js

import React from "react";
import { Link } from "react-router-dom";
import TaskItem from "../pages/TaskItem";
import "./Trashed.css";

const Trashed = ({ trashedTasks, restoreTask, deletePermanently }) => {
  return (
    <div className="trashed-container">
      <header className="top-navbar">
        <h2>Trashed Tasks</h2>
        <Link to="/dashboard">Back to Dashboard</Link>
      </header>
      <main className="trashed-content">
        {trashedTasks.length > 0 ? (
          trashedTasks.map((task) => (
            <div key={task.id} className="trashed-card">
              <TaskItem task={task} />
              <div className="trashed-actions">
                <button onClick={() => restoreTask(task.id)} className="restore-btn">
                  Restore
                </button>
                <button onClick={() => deletePermanently(task.id)} className="delete-permanently-btn">
                  Delete Permanently
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No trashed tasks available.</p>
        )}
      </main>
    </div>
  );
};

export default Trashed;

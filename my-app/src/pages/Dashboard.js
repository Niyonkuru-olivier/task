// src/pages/Dashboard.js

import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css"; // Import the CSS for styling
 

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="logo">Task Manager</h2>
        </div>
        <nav>
          <ul>
            <li>
            <Link to="/Dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            
            <li>
              <Link to="/trashed">Trashed</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="top-navbar">
          <div className="user-info">
            <p>Welcome, User!</p>
            <a href="/logout"><button className="logout-btn">Logout</button></a>
          </div>
        </header>
        <section className="dashboard-content">
          
          
          <div className="card">
            <h3>Task Form</h3>
            <p>The Task Form allows users to add tasks by entering a name, description, 
              and priority level. It validates inputs, submits the data, and clears the form for subsequent entries.</p>
            <Link to="/TaskForm" className="/tasks">View Tasks</Link>
          </div>
          <div className="card">
            <h3>Tasks List</h3>
            <p>The Task List displays all tasks with options to update, delete, or toggle their status. 
              It dynamically renders tasks, 
              showing details like task name, description, and priority, or a no-tasks message.</p>
            <Link to="/TaskList" className="/tasks">View Tasks</Link>
          </div>
          
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Correctly import Link from react-router-dom
import "./TaskForm.css"; // Ensure the path is correct

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent submitting if taskName or description is empty
    if (!taskName.trim() || !description.trim()) {
      alert("Please provide both task name and description.");
      return; // Do not submit if fields are empty
    }

    // Create new task object
    const newTask = { taskName, description, priority };

    // Call the addTask function passed as a prop
    addTask(newTask);

    // Clear the form fields after submission
    setTaskName("");
    setDescription("");
    setPriority("Low");
  };

  return (
    <div className="task-form-container">
      {/* Form for adding a task */}
      <form onSubmit={handleSubmit} className="task-form">
        <div className="input-container">
          <label htmlFor="taskName">Task Name</label>
          <input
            id="taskName"
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Add Task
        </button>
      </form>

      {/* Link to go back to Dashboard */}
      <header className="back-to-dashboard">
        <Link to="/dashboard">Back to Dashboard</Link>
      </header>
    </div>
  );
};

// Validate prop types
TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default TaskForm;

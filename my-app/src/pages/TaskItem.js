import React, { useState } from "react";
import PropTypes from "prop-types";
import "./TaskItem.css"; // Ensure the styles are properly imported

const TaskItem = ({ task, updateTask, deleteTask, toggleTaskStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.taskName);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);

  const handleUpdate = () => {
    // Ensure values are not empty before updating
    if (!taskName.trim() || !description.trim()) {
      alert("Please provide both task name and description.");
      return;
    }

    // Prepare the updated task
    const updatedTask = { ...task, taskName, description, priority };

    // Call updateTask function passed from the parent
    updateTask(updatedTask);
    setIsEditing(false); // Close the editing mode
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task Name"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{task.taskName}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <button onClick={() => toggleTaskStatus(task.id)}>
            {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
          </button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Update</button>
        </>
      )}
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTaskStatus: PropTypes.func.isRequired,
};

export default TaskItem;

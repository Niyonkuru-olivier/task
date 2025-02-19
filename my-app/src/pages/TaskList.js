import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import TaskItem from "./TaskItem";
import "./Tasklist.css"; // Corrected the import path (removed extra dot)

// Define TaskList component
const TaskList = ({ tasks, updateTask, deleteTask, toggleTaskStatus }) => {
  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
            toggleTaskStatus={toggleTaskStatus}
          />
        ))
      ) : (
        <>
          <p>No tasks available.</p>
          <header>
            <Link to="/dashboard">Back to Dashboard</Link>
          </header>
        </>
      )}
    </div>
  );
};

export default TaskList;

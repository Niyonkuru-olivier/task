import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

import TaskForm from "./pages/TaskForm";
import TaskList from "./pages/TaskList";
import Filter from "./pages/Filter";
import Sort from "./pages/Sort";
import Dashboard from "./pages/Dashboard";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Appreciation from "./pages/Appreciation";
import Logout from "./pages/Logout";
import Trashed from "./pages/Trashed";

function App() {
  // State for managing fetched data and tasks
  const [data, setData] = useState("");
  const [tasks, setTasks] = useState([]);
  const [trashedTasks, setTrashedTasks] = useState([]);
  const [filterOption, setFilterOption] = useState({ priority: "All", status: "All" });
  const [sortOption, setSortOption] = useState("");

  // Fetch data from backend on component mount
  const getData = useCallback(async () => {
    try {
      const response = await axios.get("https://task-zm9t.vercel.app/");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    getData(); // Fetch data once component mounts
  }, [getData]);

  // Function to add a new task
  const addTask = useCallback((task) => {
    setTasks((prevTasks) => [...prevTasks, { ...task, id: Date.now(), status: "Pending" }]);
  }, []);

  // Update an existing task
  const updateTask = useCallback((updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, []);

  // Delete a task and move to trashed tasks
  const deleteTask = useCallback((id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    setTrashedTasks((prevTrashed) => [...prevTrashed, taskToDelete]);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, [tasks]);

  // Restore a task from trash
  const restoreTask = (taskId) => {
    const taskToRestore = trashedTasks.find((task) => task.id === taskId);
    setTasks((prevTasks) => [...prevTasks, taskToRestore]);
    setTrashedTasks((prevTrashed) => prevTrashed.filter((task) => task.id !== taskId));
  };

  // Permanently delete a task from trash
  const deletePermanently = (taskId) => {
    setTrashedTasks((prevTrashed) => prevTrashed.filter((task) => task.id !== taskId));
  };

  // Toggle task completion status between 'Pending' and 'Completed'
  const toggleTaskStatus = useCallback((id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: task.status === "Pending" ? "Completed" : "Pending" } : task
      )
    );
  }, []);

  // Filter tasks based on priority and status
  const filterTasks = useCallback((option) => {
    setFilterOption(option);
  }, []);

  // Sort tasks based on option (priority or status)
  const sortTasks = useCallback((option) => {
    setSortOption(option);
  }, []);

  // Apply filtering and sorting logic
  const filteredTasks = useMemo(() => {
    let updatedTasks = [...tasks];

    // Filtering logic
    if (filterOption.priority !== "All") {
      updatedTasks = updatedTasks.filter((task) => task.priority === filterOption.priority);
    }
    if (filterOption.status !== "All") {
      updatedTasks = updatedTasks.filter((task) => task.status === filterOption.status);
    }

    // Sorting logic
    if (sortOption === "priority") {
      updatedTasks.sort((a, b) => {
        const priorityLevels = { High: 3, Medium: 2, Low: 1 };
        return priorityLevels[b.priority] - priorityLevels[a.priority];
      });
    } else if (sortOption === "status") {
      updatedTasks.sort((a, b) => (a.status > b.status ? 1 : -1));
    }

    return updatedTasks;
  }, [tasks, filterOption, sortOption]);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/appreciate" element={<Appreciation />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/taskform" element={<TaskForm addTask={addTask} />} />
          <Route
            path="/tasklist"
            element={
              <TaskList
                tasks={filteredTasks}
                updateTask={updateTask}
                deleteTask={deleteTask}
                toggleTaskStatus={toggleTaskStatus}
              />
            }
          />
          <Route path="/filter" element={<Filter filterTasks={filterTasks} />} />
          <Route path="/sort" element={<Sort sortTasks={sortTasks} />} />
          <Route
            path="/tasks"
            element={
              <div>
                <h1>Task Management</h1>
                <TaskForm addTask={addTask} />
                <Filter filterTasks={filterTasks} />
                <Sort sortTasks={sortTasks} />
                <TaskList
                  tasks={filteredTasks}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  toggleTaskStatus={toggleTaskStatus}
                />
              </div>
            }
          />
          <Route
            path="/trashed"
            element={
              <Trashed
                trashedTasks={trashedTasks}
                restoreTask={restoreTask}
                deletePermanently={deletePermanently}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

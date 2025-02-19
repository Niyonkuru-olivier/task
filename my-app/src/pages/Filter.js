import React, { useState } from "react";
import ".//Filter.css";
const Filter = ({ filterTasks }) => {
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");

  const handleFilter = () => {
    filterTasks({ priority, status });
  };

  return (
    <div className="filter-container">
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="All">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="All">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
};

export default Filter;

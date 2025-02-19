import React from "react";
import ".//Sort.css";
const Sort = ({ sortTasks }) => {
  return (
    <div className="sort-container">
      <button onClick={() => sortTasks("priority")}>Sort by Priority</button>
      <button onClick={() => sortTasks("status")}>Sort by Status</button>
    </div>
  );
};

export default Sort;

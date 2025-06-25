import React, { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("https://localhost:44332/api/Tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Router>

    <div style={{ padding: "20px" , backgroundColor:"#F8F5E8"}}>
      <h1 style={{textAlign:"center", fontFamily:"Poppins,sans-serif", color:"violet"}}>Task Management</h1>


     <nav style={{ marginBottom: "20px", textAlign: "center" }}>
        <Link to="/" style={{ marginRight: "20px" }}>Add Task</Link>
        <Link to="/tasks">All Tasks</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AddTaskForm onTaskAdded={fetchTasks} />} />
        <Route path="/tasks" element={<TaskList tasks={tasks} fetchTasks={fetchTasks} />} />

      </Routes>
    </div>

  </Router>
  );
}

export default App;

import React, { useState } from "react";
import axios from "axios";
import './AddTaskForm.css';

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://localhost:44332/api/Tasks", {
        title,
        description,
        deadline,
      });

      setTitle('');
      setDescription('');
      setDeadline('');
      onTaskAdded(); // 🔁 Refresh task list
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>

  <input className="title" type="text" value={title} placeholder="Task" onChange={(e) => setTitle(e.target.value)} />
  <textarea className="description" value={description} placeholder="Decription" onChange={(e) => setDescription(e.target.value)} />
  <input className="date" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
  <button className="add" type="submit">Add Task</button>
    </form>
     </div>
  );
};


export default AddTaskForm;

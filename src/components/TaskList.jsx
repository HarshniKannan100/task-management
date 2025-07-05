import React from "react";
import "./TaskList.css";
import axios from "axios";

const TaskList = ({tasks,fetchTasks }) =>{
    const handleToggle = async (task) => {
    try {
      await axios.put(`https://taskmanager-backend-fh46.onrender.com/tasks/${task.id}`, {
        ...task, // spread the existing task values
        completed: !task.completed, // toggle this
      });
      fetchTasks(); // Refresh the task list
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  const handleDelete = async (id) => {
    try{
        await axios.delete(`https://taskmanager-backend-fh46.onrender.com/tasks/${id}`);
        fetchTasks();
    }catch(error){
        console.log("Error deleting task ",error);
    }
  }

  return(

    <div class="container">
        <h2>All Tasks</h2>
        {tasks.length===0? (<p>No tasks found</p>):(
            <table style={styles.table}>
                <thead>
                <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Deadline</th>
              <th style={styles.th}>Completed</th>
            </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td style={styles.td}>{task.title}</td>
                <td style={styles.td}>{task.description || "—"}</td>
                <td style={styles.td}>
                  {task.deadline ? new Date(task.deadline).toLocaleDateString() : "—"}
                </td>
                <td style={styles.td}>
                  {task.completed ? "✅" : "❌"}
                <button class="mark" onClick={() => handleToggle(task)}> {task.completed ? "Undo" : "Mark Done"}</button></td>
                <td><button class="del" onClick={() => handleDelete(task.id)}>Delete</button></td>
                </tr>
                ))}
                </tbody>
            </table>
        )}
    </div>

  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    backgroundColor: "bisque",
    color: "blueviolet",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ccc",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
};


export default TaskList;
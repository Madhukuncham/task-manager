import React, { useEffect, useState } from "react";
import styles from './Tasks.module.css';
import { signOut } from "firebase/auth"; // ✅ import this
import { auth } from "../firebase/firebase";
import {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../firebase/taskService";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [isTableView, setIsTableView] = useState(false);
  const [editId, setEditId] = useState(null); // task being edited
  const [isEditing, setIsEditing] = useState(false);


  const navigate=useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  // Load tasks on mount
  useEffect(() => {
  if (currentUser) {
    fetchTasks();
  }
}, [currentUser]);

  const fetchTasks = async () => {
    const data = await getAllTasks();
    const userTasks = data.filter((task) => task.userId === currentUser?.uid);
    setTasks(userTasks);
  };

  const handleAddTask = async (e) => {
  e.preventDefault();
  if (!title.trim()) return;

  if (isEditing && editId) {
    await updateTask(editId, { title });
    setIsEditing(false);
    setEditId(null);
  } else {
    await addTask({
      title,
      completed: false,
      userId: currentUser?.uid,
      createdAt: new Date()
    });
  }

  setTitle("");
  fetchTasks();
};
const handleEdit = (task) => {
  setTitle(task.title);
  setEditId(task.id);
  setIsEditing(true);
};

  const toggleComplete = async (task) => {
    await updateTask(task.id, { completed: !task.completed });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

 return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </header>

  <div className={styles.container}>
    <h2>Task Manager</h2>

    <form onSubmit={handleAddTask}>
      <input
        type="text"
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">{isEditing ? "Update Task" : "Add"}</button>
      {/* <button type="submit">Add</button> */}
    </form>

    <button onClick={() => setIsTableView(!isTableView)} className={styles.toggleViewBtn}>
      Switch to {isTableView ? "List" : "Table"} View
    </button>

    {isTableView ? (
    <table className={styles.table}>
  <thead>
    <tr>
      <th>Task</th>
      <th>Status</th>
      <th>Edit</th>
      <th>Toggle</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {tasks.map((task) => (
      <tr key={task.id}>
        <td>{task.title}</td>
        <td>{task.completed ? "✅" : "❌"}</td>
        <td>
          <button onClick={() => handleEdit(task)}>✏️</button>
        </td>
        <td>
          <button onClick={() => toggleComplete(task)}>Toggle</button>
        </td>
        <td>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    ) : (
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <span className={task.completed ? styles.completed : ""}>{task.title}</span>
            <div>
              <button onClick={() => toggleComplete(task)}>
                {task.completed ? "Mark Incomplete" : "Mark Complete"}
              </button>
               <button onClick={() => handleEdit(task)}>✏️</button>
              <button onClick={() => handleDelete(task.id)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
  </div>
);

};

export default Tasks;


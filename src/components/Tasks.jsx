import React, { useEffect, useState } from "react";
import styles from './Tasks.module.css';
import {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../firebase/taskService";
import { useAuth } from "../AuthContext";

const Tasks = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [isTableView, setIsTableView] = useState(false);

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getAllTasks();
    const userTasks = data.filter((task) => task.userId === currentUser?.uid);
    setTasks(userTasks);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTask({
      title,
      completed: false,
      userId: currentUser?.uid,
      createdAt: new Date()
    });
    setTitle("");
    fetchTasks();
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
  <div className={styles.container}>
    <h2>Task Manager</h2>

    <form onSubmit={handleAddTask}>
      <input
        type="text"
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
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
              <button onClick={() => handleDelete(task.id)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

};

export default Tasks;

// src/components/Tasks.jsx
// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   updateDoc,
// } from "firebase/firestore";
// import { db } from "../firebase/firebase";
// import styles from "./Tasks.module.css";

// const Tasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const [input, setInput] = useState("");

//   const tasksCollection = collection(db, "tasks");

//   // Fetch tasks from Firestore
//   const fetchTasks = async () => {
//     const data = await getDocs(tasksCollection);
//     setTasks(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
//   };

//   // Create task
//   const handleAdd = async (e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       await addDoc(tasksCollection, {
//         text: input,
//         completed: false,
//       });
//       setInput("");
//       fetchTasks();
//     }
//   };

//   // Toggle complete/incomplete
//   const toggleComplete = async (task) => {
//     await updateDoc(doc(db, "tasks", task.id), {
//       completed: !task.completed,
//     });
//     fetchTasks();
//   };

//   // Delete task
//   const handleDelete = async (id) => {
//     await deleteDoc(doc(db, "tasks", id));
//     fetchTasks();
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <h2>Tasks</h2>
//       <form onSubmit={handleAdd}>
//         <input
//           className={styles.input}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter new task"
//         />
//         <button className={styles.addBtn} type="submit">Add Task</button>
//       </form>

//       <ul className={styles.taskList}>
//         {tasks.map((task) => (
//           <li key={task.id} className={styles.task}>
//             <span
//               className={task.completed ? styles.completed : ""}
//               onClick={() => toggleComplete(task)}
//             >
//               {task.text}
//             </span>
//             <button onClick={() => handleDelete(task.id)}>🗑️</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Tasks;


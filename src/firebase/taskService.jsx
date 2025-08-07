// src/firebase/taskService.js
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Reference to the "tasks" collection
const taskCollection = collection(db, "tasks");

// Create a new task
export const addTask = async (task) => {
  return await addDoc(taskCollection, task);
};

// Get all tasks
export const getAllTasks = async () => {
  const data = await getDocs(taskCollection);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Update a task
export const updateTask = async (id, updatedTask) => {
  const taskDoc = doc(db, "tasks", id);
  return await updateDoc(taskDoc, updatedTask);
};

// Delete a task
export const deleteTask = async (id) => {
  const taskDoc = doc(db, "tasks", id);
  return await deleteDoc(taskDoc);
};
